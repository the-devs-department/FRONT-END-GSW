import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import NavbarButton from "../components/NavbarButton/NavbarButton";
import ModalDelete from "../components/ModalDelete/ModalDelete";
import FeedbackModal from "../components/FeedbackModal/FeedbackModal";
import { ScreenWidth } from "../hooks/ScreenWidth";
import { TaskModalProvider, useTaskModal } from "../context/TaskModalContext";
import { DeleteModalProvider } from "../context/DeleteModalContext";
import type Tarefa from "../Interface/TarefaInterface";
import profileUser from '../assets/profile-user.png';
import UserService from "../Service/UserService";

export type RootLayoutContext = {
    setCallbackRecarregarTarefas: (callback: (() => void) | null) => void; 
}
const AppHeader = () => {
  const { openTaskModal } = useTaskModal();
  return (
    <Header
      btnFunc={() => openTaskModal("Nova")}
    />
  );
};

const TaskModal = ({ reloadTasks }: { reloadTasks: () => void }) => {
  const { isTaskModalOpen, modalType, closeTaskModal, taskToUpdate } = useTaskModal();
  return (
    <Modal
      condicaoModal={isTaskModalOpen}
      tipoModal={modalType}
      closeModal={closeTaskModal}
      tarefaSelecionada={taskToUpdate}
      onTaskSuccess={reloadTasks}
    />
  );
};

export default function RootLayout() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'minhas'>('todas');
  const [userName, setUserName] = useState<null | String>(null);
  const [userEmail, setUserEmail] = useState<null | String>(null);

  const pageLink = useLocation();
  const navigate = useNavigate();
  const screenWidth = ScreenWidth();
  const rotasHeader = ["/home", "/home/todas-tarefas", "/home/calendario", '/home/log-auditoria']

  const callbackRecarregarTarefas = useRef<(() => void) | null>(null)

  const setCallbackRecarregarTarefas = useCallback((callback: (() => void) | null) => {
    callbackRecarregarTarefas.current = callback
  }, [])

  const loadTaskByRoute = useCallback(() => {
    if (callbackRecarregarTarefas.current){
      callbackRecarregarTarefas.current()
    }
  }, [])

  const outletContextValue: RootLayoutContext = useMemo(() => {
        return {
            setCallbackRecarregarTarefas 
        }
    }, [setCallbackRecarregarTarefas])

  const getUserRoles = async (id: string) => {
    const userInfos = await UserService.getUserInfos(id)
    console.log(userInfos)
    setUserName(userInfos.nome)
    setUserEmail(userInfos.email)
    localStorage.setItem("userRoles", JSON.stringify(userInfos.roles))
  }

  useEffect(() => {
    const data = UserService.getUserTokenAndId()
    const token = data.token
    if(!token) {
      navigate('/login')
      return
    }
    getUserRoles(data.id)
  }, [navigate])

  const openNavbarAction = () => setOpenNavbar(true);
  const closeNavbarAction = () => setOpenNavbar(false);
  return (
    <>
      <TaskModalProvider>
        <Navbar isNavbarOpen={openNavbar} closeNavbar={closeNavbarAction} setFiltro={setFiltro} filtroAtual={filtro} userInfos={[userName, userEmail]}/>
        <div className="flex flex-col items-center ml-[20%] w-[80%] h-dvh gap-2 max-[1025px]:w-full max-[1025px]:ml-[0%]">
          <DeleteModalProvider>
            {screenWidth > 1024 ? (
              <div className="flex h-auto p-4 w-full border-b-[1px] border-gray-200 items-center justify-end h-16">
                <div className="flex gap-4 text-black items-center font-bold">
                  <img src={profileUser} alt="" className="h-6" />
                  <p>{userName}</p>
                </div>
              </div>
            ) : (
              <div className="flex w-full border-b-[1px] border-gray-200 p-2 items-center justify-between h-16">
                <NavbarButton openNavbar={openNavbarAction} />
                <div className="flex gap-4 text-black items-center font-bold">
                  <img src={profileUser} alt="" className="h-6" />
                  <p>{userName}</p>
                </div>
              </div>
            )}
              <>
                {rotasHeader.includes(pageLink.pathname) && (
                  <AppHeader/>
                )}
                  <Outlet context={outletContextValue}/>
              </>
            <ModalDelete onTaskDeleted={loadTaskByRoute} />
            <TaskModal reloadTasks={loadTaskByRoute} />
          </DeleteModalProvider>
        </div>
      </TaskModalProvider>
      <FeedbackModal />
    </>
  );
}
