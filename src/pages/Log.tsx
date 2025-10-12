import { useState } from "react";

export default function Log() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative w-full flex flex-col lg:flex-row transition-all duration-500">
      {/* Área da tabela */}
      <div
        className={`transition-all duration-700 ${showDetails ? "lg:w-[72.5%] w-full" : "w-full"
          }`}
      >
        <div className="h-20 pl-4">
          <h2 className="text-[#22222A] text-[28px] md:text-[36px] font-bold">
            Auditoria
          </h2>
          <p className="text-[18px] md:text-[24px] text-[#7B899D]">
            Gerencie as alterações dos usuários
          </p>
        </div>

        <div className="w-full relative overflow-x-auto">
          <table className="min-w-[700px] md:min-w-full mt-6 border-collapse border border-black text-center">
            <thead className="border border-black bg-gray-100">
              <tr className="h-12">
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">Data</th>
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">Hora</th>
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">Categoria</th>
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">Usuário</th>
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">ID da Tarefa</th>
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">Alteração</th>
              </tr>
            </thead>

            <tbody>
              <tr
                className="cursor-pointer hover:bg-blue-100 h-10"
                onClick={() => setShowDetails(true)}
              >
                <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">07/10/2025</td>
                <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">17:51</td>
                <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">Edição</td>
                <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">Otávio Vianna Lima</td>
                <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">1637854835</td>
                <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">Título, Descrição, Status</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Painel lateral */}
      <div
        className={`fixed top-[8rem] lg:top-[11rem] right-0 
        w-full sm:w-[70%] md:w-[50%] lg:w-[22%] bg-white border-l border border-black shadow-md
        transition-all duration-700 ease-in-out z-50 overflow-y-auto max-h-[80vh]
        ${showDetails ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        {/* Cabeçalho */}
        <div className="border-b border-black flex items-center justify-center p-3">
          <h3 className="text-[14px] md:text-[15px] font-bold text-[#22222A] text-center">
            Log - 287b357h1356a1245@5ft6568
          </h3>
        </div>

        {/* Conteúdo */}
        <div className="p-4 space-y-3 text-sm md:text-base text-[#22222A]">
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 border-b pb-2 border-gray-300">
            <div>
              <p className="font-semibold">Data:</p>
              <p>05/10/2025</p>
            </div>
            <div>
              <p className="font-semibold">Hora:</p>
              <p>23:37</p>
            </div>

            <div>
              <p className="font-semibold">Usuário:</p>
              <p>Daniel Maceda</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>daniel@gsw.com</p>
            </div>

            <div>
              <p className="font-semibold">Categoria:</p>
              <p>Exclusão</p>
            </div>
            <div>
              <p className="font-semibold">ID da Tarefa:</p>
              <p>1637854835</p>
            </div>
          </div>

          <div className="border border-gray-300 rounded p-3 mt-2">
            <h2 className="text-[15px] font-bold mb-2 text-center">Tarefa Excluída</h2>
            <div className="mb-3">
              <p className="font-semibold">Título:</p>
              <p>Desenvolver Lógica back-end</p>
            </div>
            <div>
              <p className="font-semibold">Descrição:</p>
              <p className="whitespace-pre-line text-sm">
                Criar Lógica back-end utilizando Java para o projeto de Calendário
              </p>
            </div>
            <div className="mt-3 space-y-1">
              <p><strong>Tema:</strong> Desenvolvimento</p>
              <p><strong>Status:</strong> Não Iniciada</p>
              <p><strong>Responsável:</strong> Otávio Vianna Lima</p>
              <p><strong>Data de Entrega:</strong> 21/10/2025</p>
            </div>
          </div>

          <button
            onClick={() => setShowDetails(false)}
            className="mt-4 bg-[#344256] px-4 py-2 rounded text-white w-full md:w-auto"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
