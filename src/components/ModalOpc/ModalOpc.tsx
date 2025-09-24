import Trash from '../../assets/delete.png'
import Edit from '../../assets/edit.png'
import './ModalOpc.css'
import { useTaskModal } from '../../context/TaskModalContext';
import { useDeleteModal } from '../../context/DeleteModalContext';

interface Task {
  id: string,
  title: string,
  description: string,
  tema: string,
  dataEntrega: string,
  responsavel: string,
  file: File | null
}

interface ModalOpcProps {
  condicaoModal: boolean;
  task: Task
};

export default function ModalOpc(props: ModalOpcProps) {
  const {openTaskModal} = useTaskModal()
  const {openDeleteModal} = useDeleteModal()

  return (
    <>
      <div className={props.condicaoModal ? 'modal-opc-opened' : 'modal-opc-closed'}>
        <ul className="flex flex-col w-44 rounded-lg border border-gray-200 bg-white">
          <li onClick={() => openTaskModal("Atualizar", props.task)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
            <img src={Edit} alt="" className="h-4 w-4" />
            <span>Editar</span>
          </li>
          <li onClick={() => openDeleteModal(props.task.id)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-600">
            <img src={Trash} alt="" className="h-5 w-5" />
            <span>Excluir</span>
          </li>
        </ul>
      </div>
    </>
  )
}