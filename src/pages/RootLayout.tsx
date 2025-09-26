import Navbar from "../components/Navbar/Navbar";
import profileUser from '../assets/profile-user.png';
import TaskList from "../components/TaskList/TaskList";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";  
import NavbarButton from "../components/NavbarButton/NavbarButton";
import ModalDelete from "../components/ModalDelete/ModalDelete";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScreenWidth } from "../hooks/ScreenWidth";
import { TaskModalProvider, useTaskModal } from "../context/TaskModalContext";
import { DeleteModalProvider } from "../context/DeleteModalContext";
import tarefaService from "../Service/TarefaService";
import type Tarefa from "../Interface/TarefaInterface";

const AppHeader = () => {
  const {openTaskModal}  = useTaskModal()
  return <Header btnFunc={() => openTaskModal("Nova")}/>
}

const TaskModal = () => {
  const {isTaskModalOpen, modalType, closeTaskModal, taskToUpdate} = useTaskModal();
  return <Modal condicaoModal={isTaskModalOpen} tipoModal={modalType} closeModal={closeTaskModal} tarefaSelecionada={taskToUpdate}/>
}


export default function RootLayout() {
  const [openNavbar, setOpenNavbar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const pageLink = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const userLoged = localStorage.getItem('authToken')
    if (!userLoged) {
      navigate('/login')
    } else {
      const carregarTarefas = async () => {
        try {
          setLoading(true);
          const data = await tarefaService.fetchTarefas();
          console.log(data)
          setTarefas(data)
        } catch (err) {
          console.error("Erro ao buscar tarefas: ", err);
        } finally {
          setLoading(false)
        }
      }
      carregarTarefas()
    }
  }, [navigate])

  const tarefasNI = tarefas.filter(tarefa => tarefa.status === 'nao_iniciada')
  const tarefasEA = tarefas.filter(tarefa => tarefa.status === 'em_andamento')
  const tarefasC = tarefas.filter(tarefa => tarefa.status === 'concluida')

  const screenWidth = ScreenWidth()

  const openNavbarAction = () => {
    setOpenNavbar(true)
  }

  const closeNavbarAction = () => {
    setOpenNavbar(false)
  }

  if (loading) {
    return (
      <div className="h-dvh w-full flex items-center justify-center">
        <p className="text-black text-2xl font-bold">Carregando dados...</p>
      </div>
    )
  }

  return (
    <>
      <TaskModalProvider>
        <Navbar isNavbarOpen={openNavbar} closeNavbar={closeNavbarAction}/>
        <div className="flex flex-col items-center ml-[20%] w-[80%] h-dvh gap-2 max-lg:w-full max-lg:ml-[0%]">
          <DeleteModalProvider>
          {screenWidth > 1024 ? (
            <div className="flex w-full border-b-[1px] border-gray-200 p-2 items-center justify-end h-16">
              <div className="flex gap-4 text-black items-center font-bold">
                <img src={profileUser} alt="" className="h-6" />
                <p>Otávio Vianna Lima</p>
              </div>
            </div>
          ) : (
            <div className="flex w-full border-b-[1px] border-gray-200 p-2 items-center justify-between h-16">
              <NavbarButton openNavbar={openNavbarAction}/>
              <div className="flex gap-4 text-black items-center font-bold">
                <img src={profileUser} alt="" className="h-6" />
                <p>Otávio Vianna Lima</p>
              </div>
            </div>
          )}
          <AppHeader/>
          {pageLink.pathname === '/home' ? (
            <div className="w-full justify-evenly pb-3 flex max-[1024px]:flex-col max-[1024px]:gap-4 max-[1024px]:p-4">
                <TaskList
                  tarefa={tarefasNI}
                  title="Não Iniciada"
                  taksCount={tarefasNI.length}
                />
                <TaskList
                  tarefa={tarefasEA}
                  title="Em Andamento"
                  taksCount={tarefasEA.length}
                />
                <TaskList
                  tarefa={tarefasC}
                  title="Concluída"
                  taksCount={tarefasC.length}
                />
            </div>
          ) : (
            <Outlet />
          )}
          <ModalDelete/>
          <TaskModal/>
        </DeleteModalProvider>
        </div>
      </TaskModalProvider>
    </>
  );
}