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
import { DeleteModalProvider, useDeleteModal } from "../context/DeleteModalContext";

const AppHeader = () => {
  const {openTaskModal}  = useTaskModal()
  return <Header btnFunc={() => openTaskModal("Nova")}/>
}

const TaskModal = () => {
  const {isTaskModalOpen, modalType, closeTaskModal} = useTaskModal();
  return <Modal condicaoModal={isTaskModalOpen} tipoModal={modalType} closeModal={closeTaskModal}/>
}

const tasksNaoIniciadas = [{ id: "1", title: "Suporte cliente premium", description: "Implementar chat em tempo real", tema: "Desenvolvimento",  dataEntrega: "30/10/2024", responsavel: "Pedro Henrique Martins", file: null }];
const tasksEmAndamento = [{ id: "2", title: "Refatorar login", description: "Mudar a lógica de autenticação para Firebase", tema: "Desenvolvimento",  dataEntrega: "01/11/2024", responsavel: "Issami", file: null }];
const tasksConcluidas = [{ id: "3", title: "Corrigir bug", description: "Erro de digitação no campo de email", tema: "Desenvolvimento",  dataEntrega: "25/10/2024", responsavel: "Otávio", file: null }];


export default function RootLayout() {
  const pageLink = useLocation();
  const navigate = useNavigate()
  const [openNavbar, setOpenNavbar] = useState(false)


  useEffect(() => {
    const userLoged = localStorage.getItem('authToken');
    if (!userLoged) {
      navigate('/login')
    }

  }, [navigate])

  const screenWidth = ScreenWidth()

  const openNavbarAction = () => {
    setOpenNavbar(true)
  }

  const closeNavbarAction = () => {
    setOpenNavbar(false)
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
                  task={tasksNaoIniciadas}
                  title="Não Iniciada"
                  taksCount={2}
                />
                <TaskList
                  task={tasksEmAndamento}
                  title="Em Andamento"
                  taksCount={10}
                />
                <TaskList
                  task={tasksConcluidas}
                  title="Concluída"
                  taksCount={1}
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