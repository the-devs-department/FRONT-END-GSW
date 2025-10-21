import { useEffect, useState, useMemo, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import TaskList from "../components/TaskList/TaskList";
import Modal from "../components/Modal/Modal";
import NavbarButton from "../components/NavbarButton/NavbarButton";
import ModalDelete from "../components/ModalDelete/ModalDelete";
import FeedbackModal from "../components/FeedbackModal/FeedbackModal";
import { ScreenWidth } from "../hooks/ScreenWidth";
import { TaskModalProvider, useTaskModal } from "../context/TaskModalContext";
import { DeleteModalProvider } from "../context/DeleteModalContext";
import tarefaService from "../Service/TarefaService";
import type Tarefa from "../Interface/TarefaInterface";
import profileUser from '../assets/profile-user.png';

const AppHeader = ({ setFiltro, filtroAtual }: any) => {
  const { openTaskModal } = useTaskModal();
  return (
    <Header
      btnFunc={() => openTaskModal("Nova")}
      setFiltro={setFiltro}
      filtroAtual={filtroAtual}
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

  const pageLink = useLocation();
  const navigate = useNavigate();
  const screenWidth = ScreenWidth();

  const carregarTarefas = useCallback(async () => {
    const userInfos = localStorage.getItem('authData')
    const userInfosParsed = userInfos ? JSON.parse(userInfos) : null
    const token = userInfosParsed.token
    const identificadorUsuario = localStorage.getItem('identificadorUsuario');

    if (!token) return;
    try {
      setLoading(true);

      const data = filtro === 'minhas' && identificadorUsuario
        ? await tarefaService.fetchTarefasPorResponsavel(identificadorUsuario)
        : await tarefaService.fetchTarefas();

      setTarefas(data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  }, [filtro]);

  useEffect(() => {
    const userInfos = localStorage.getItem('authData')
    const userInfosParsed = userInfos ? JSON.parse(userInfos) : null
    const token = userInfosParsed.token
    if (!token) {
      navigate('/login');
      return;
    }
    carregarTarefas();
  }, [filtro, navigate, carregarTarefas]);

  const { tarefasNI, tarefasEA, tarefasC } = useMemo(() => {
    const ni = tarefas.filter(tarefa => tarefa.status === 'NAO_INICIADA');
    const ea = tarefas.filter(tarefa => tarefa.status === 'EM_ANDAMENTO');
    const c = tarefas.filter(tarefa => tarefa.status === 'CONCLUIDA');
    return { tarefasNI: ni, tarefasEA: ea, tarefasC: c };
  }, [tarefas]);

  const minhasTarefasCount = useMemo(() => {
    const identificadorUsuario = localStorage.getItem('identificadorUsuario');
    if (!identificadorUsuario) return 0;
    return tarefas.filter(t => t.responsavel === identificadorUsuario).length;
  }, [tarefas]);

  const openNavbarAction = () => setOpenNavbar(true);
  const closeNavbarAction = () => setOpenNavbar(false);
  return (
    <>
      <TaskModalProvider>
        <Navbar isNavbarOpen={openNavbar} closeNavbar={closeNavbarAction} setFiltro={setFiltro} filtroAtual={filtro} />
        <div className="flex flex-col items-center ml-[20%] w-[80%] h-dvh gap-2 max-[1025px]:w-full max-[1025px]:ml-[0%]">
          <DeleteModalProvider>
            {screenWidth > 1024 ? (
              <div className="flex h-auto p-4 w-full border-b-[1px] border-gray-200 items-center justify-end h-16">
                <div className="flex gap-4 text-black items-center font-bold">
                  <img src={profileUser} alt="" className="h-6" />
                  <p>Otávio Vianna Lima</p>
                </div>
              </div>
            ) : (
              <div className="flex w-full border-b-[1px] border-gray-200 p-2 items-center justify-between h-16">
                <NavbarButton openNavbar={openNavbarAction} />
                <div className="flex gap-4 text-black items-center font-bold">
                  <img src={profileUser} alt="" className="h-6" />
                  <p>Otávio Vianna Lima</p>
                </div>
              </div>
            )}
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-black text-2xl font-bold">Carregando dados...</p>
              </div>
            ): (
              <>
                {pageLink.pathname === '/home' && (
                  <AppHeader setFiltro={setFiltro} filtroAtual={filtro} minhasTarefasCount={minhasTarefasCount} />
                )}
    
                {pageLink.pathname === '/home' ? (
                  <div className="w-full justify-evenly pb-3 flex max-[1024px]:flex-col max-[1024px]:gap-4 max-[1024px]:p-4">
                    <TaskList tarefa={tarefasNI} title="Não Iniciada" taksCount={tarefasNI.length} />
                    <TaskList tarefa={tarefasEA} title="Em Andamento" taksCount={tarefasEA.length} />
                    <TaskList tarefa={tarefasC} title="Concluída" taksCount={tarefasC.length} />
                  </div>
                ) : (
                  <Outlet />
                )}
              </>
            )}

            <ModalDelete onTaskDeleted={carregarTarefas} />
            <TaskModal reloadTasks={carregarTarefas} />
          </DeleteModalProvider>
        </div>
      </TaskModalProvider>
      <FeedbackModal />
    </>
  );
}
