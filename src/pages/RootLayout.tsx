import Navbar from "../components/Navbar/Navbar";
import profileUser from '../assets/profile-user.png'
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import TaskList from "../components/TaskList/TaskList";


export default function RootLayout() {
  const pageLink = useLocation();

  const [isOpen, setIsOpen] = useState(false)

  const buttonFunction = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
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
        {pageLink.pathname === '/' ? (
          <div className="w-full justify-evenly pb-3 flex">
            <TaskList
              title="Não Iniciada"
              taksCount={2}
            />
            <TaskList
              title="Em Andamento"
              taksCount={10}
            />
            <TaskList
              title="Concluída"
              taksCount={1}
            />
          </div>
        ):(
          <Outlet/>
        )}
        <Modal
          tipoModal="Nova"
          condicaoModal={isOpen}
          closeModal={closeModal}
        />
      </div>
    </>
  )
}