import { useDeleteModal } from '../../context/DeleteModalContext';
import TarefaService from '../../Service/TarefaService';
import './ModalDelete.css'


export default function ModalDelete() {
  const {isDeleteModalOpen, closeDeleteModal,taskIdToDelete} = useDeleteModal()

  const deleteTask = async () => {
    if (!taskIdToDelete) {
      console.error("Não há nenhum id de tarefa para deletar!")
      return
    } else {
      try{
       await TarefaService.deleteTarefa(taskIdToDelete)
       closeDeleteModal()
      } catch(err){
        console.log(err);
      }
    }
  }

  return (
    <div className={isDeleteModalOpen ? 'modal-delete-opened' : 'modal-delete-closed'}>
      <div className="modal-delete-content">
        <div className='modal-delete-texts'>
          <h2>
            Excluir Tarefa
          </h2>
          <p>
            Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
          </p>
        </div>
        <div className="modal-delete-buttons">
          <button 
            onClick={closeDeleteModal}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button 
          onClick={deleteTask}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
