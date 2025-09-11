import CalendarIcon from '../../assets/calendar.png'
export default function Cards() {
  return (
    <div className="relative max-w-md rounded-xl border bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start">
        <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
          Suporte
        </span>

        {/* Botão 3 bolinhas */}
        <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6-2a2 2 0 100 4 2 2 0 000-4zm4 2a2 2 0 114 0 2 2 0 01-4 0z" />
          </svg>
        </button>

        {/* Menu fixo (aparece sempre) */}
        <div className="absolute right-4 top-10 w-32 rounded-md border bg-white shadow-md">
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
            Editar
          </button>
          <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
            Excluir
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <h2 className="mt-3 text-lg font-semibold text-gray-900">
        Suporte cliente premium
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Implementar chat em tempo real para clientes premium
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          {/* Ícone calendário */}
          <img src=C alt="" />
          
          <span>30/10/2024</span>
        </div>

        <span>Minha</span>
      </div>
    </div>
  );
}
