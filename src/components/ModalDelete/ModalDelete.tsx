import './ModalDelete.css'

interface ModalDProps {
  condicaoModal: boolean;
};

export default function ModalDelete(props: ModalDProps) {
  return (
    <div className={props.condicaoModal ? 'modal-delete-opened' : 'modal-delete-closed'}>
      <div className="w-[400px] rounded-lg border border-gray-200 bg-white p-6">
        {/* Título */}
        <h2 className="text-lg font-semibold text-gray-900">
          Excluir Tarefa
        </h2>

        {/* Descrição */}
        <p className="mt-2 text-sm text-gray-500">
          Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
        </p>

        {/* Botões */}
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
