import Navbar from "../components/Navbar/Navbar";
import profileUser from '../assets/profile-user.png';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";
import TaskList from "../components/TaskList/TaskList";

export default function RootLayout() {
  
  const pageLink = useLocation();
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"Nova" | "Atualizar" | null>(null);


  useEffect(() => {
    const userLoged = localStorage.getItem('authToken');
    if (!userLoged) {
      navigate('/login')
    }

  }, [navigate])

  const buttonFunction = (tipo: "Nova" | "Atualizar") => {
    setModalType(tipo);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    navigate('/login')
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col ml-[20%] w-[80%] h-dvh gap-2">
        <div className="flex border-b-[1px] border-gray-200 p-2 items-center justify-end h-16">
          <div className="flex gap-4 text-black items-center font-bold">
            <img src={profileUser} alt="" className="h-6" />
            <p>Otávio Vianna Lima</p>
          </div>
        </div>
        <Header btnFunc={buttonFunction} />
        {pageLink.pathname === '/home' ? (
          <div className="w-full justify-evenly pb-3 flex">
            <TaskList
              title="Não Iniciada"
              taksCount={2}
              openModal={buttonFunction}
            />
            <TaskList
              title="Em Andamento"
              taksCount={10}
              openModal={buttonFunction}
            />
            <TaskList
              title="Concluída"
              taksCount={1}
              openModal={buttonFunction}
            />
          </div>
        ) : (
          <Outlet />
        )}
        <Modal
          tipoModal={modalType}
          condicaoModal={isOpen}
          closeModal={closeModal}
        />
      </div>
    </>
  );
}