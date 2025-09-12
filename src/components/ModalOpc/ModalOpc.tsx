import { useState } from 'react';
import Trash from '../../assets/delete.png'
import Edit from '../../assets/edit.png'
import ModalDelete from '../ModalDelete/ModalDelete';
import './ModalOpc.css'

interface ModalOpcProps {
  condicaoModal: boolean;
  openModal: (tipo: 'Atualizar') => void;
};

export default function ModalOpc(props: ModalOpcProps) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  const openModal = () => {
    setIsModalDeleteOpen(true)
  }

  return (
    <>
      <div className={props.condicaoModal ? 'modal-opc-opened' : 'modal-opc-closed'}>
        <ul className="flex flex-col w-44 rounded-lg border border-gray-200 bg-white">
          <li onClick={() => props.openModal("Atualizar")} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
            <img src={Edit} alt="" className="h-4 w-4" />
            <span>Editar</span>
          </li>
          <li onClick={openModal} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-600">
            <img src={Trash} alt="" className="h-5 w-5" />
            <span>Excluir</span>
          </li>
        </ul>
      </div>
      <ModalDelete 
        condicaoModal={isModalDeleteOpen} 
      />
    </>
  )
}