import { useEffect, useState } from "react";
import auditoriaService from "../Service/AuditoriaService";
import type AuditoriaResponse from "../Interface/AuditoriaInsterface";

export default function Log() {
  const [logs, setLogs] = useState<AuditoriaResponse[]>([]);
  const [logSelecionado, setLogSelecionado] = useState<AuditoriaResponse | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  // Buscar todos os logs quando o componente montar
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await auditoriaService.fetchTodosLogs();
        setLogs(response);
      } catch (error) {
        console.error("Erro ao carregar logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Se ainda estiver carregando
  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Carregando logs...</p>;
  }

  return (
    <div className="relative w-full flex flex-col lg:flex-row transition-all duration-500">
      {/* Área da tabela */}
      <div
        className={`transition-all duration-700 ${
          showDetails ? "lg:w-[72.5%] w-full" : "w-full"
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
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">
                  Data
                </th>
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">
                  Hora
                </th>
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">
                  Categoria
                </th>
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">
                  Usuário
                </th>
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">
                  ID da Tarefa
                </th>
                <th className="text-[#22222A] text-[16px] md:text-[18px] border border-black px-2 md:px-4 py-2">
                  Alteração
                </th>
              </tr>
            </thead>

            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-gray-500 py-4 border border-black">
                    Nenhum log encontrado.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer hover:bg-blue-100 h-10"
                    onClick={() => {
                      setLogSelecionado(log);
                      setShowDetails(true);
                    }}
                  >
                    <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">
                      {log.dataAlteracao}
                    </td>
                    <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">
                      {log.horaAlteracao}
                    </td>
                    <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">
                      {log.modificacao.categoria}
                    </td>
                    <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">
                      {log.responsavel.emailResponsavel}
                    </td>
                    <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">
                      {log.tarefa.id ||
                        "-"}
                    </td>
                    <td className="text-[#22222A] border border-black px-2 md:px-4 py-2">
                      {log.modificacao.modificacao || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Painel lateral */}
      <div
        className={`fixed top-[8rem] lg:top-[11rem] right-0 
          w-full sm:w-[70%] md:w-[50%] lg:w-[22%] bg-white border-l border border-black shadow-md
          transition-all duration-700 ease-in-out z-50 overflow-y-auto max-h-[80vh] pb-10 no-scrollbar
          ${showDetails ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        {/* Cabeçalho */}
        <div className="border-b border-black flex items-center justify-center p-3">
          <h3 className="text-[14px] md:text-[15px] font-bold text-[#22222A] text-center">
            Log - {logSelecionado?.responsavel.id}
          </h3>
        </div>

        {logSelecionado && (
          /* Conteúdo */
          <div className="p-4 space-y-3 text-sm md:text-base text-[#22222A]">
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 border-b pb-2 border-gray-300">
              <div>
                <p className="font-semibold">Data:</p>
                <p>{logSelecionado.dataAlteracao}</p>
              </div>
              <div>
                <p className="font-semibold">Hora:</p>
                <p>{logSelecionado.horaAlteracao}</p>
              </div>
              <div>
                <p className="font-semibold">Usuário:</p>
                <p>{logSelecionado.responsavel.nome}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{logSelecionado.responsavel.emailResponsavel}</p>
              </div>
              <div>
                <p className="font-semibold">Categoria:</p>
                <p>{logSelecionado.modificacao.categoria}</p>
              </div>
              <div>
                <p className="font-semibold">ID da Tarefa:</p>
                <p>
                  {logSelecionado.tarefa.id || "-"}
                </p>
              </div>
            </div>

            <div className="border border-gray-300 rounded p-3 mt-2">
              <h2 className="text-[15px] font-bold mb-2 text-center">
                Detalhes da Tarefa
              </h2>

              <div className="mb-3">
                <p className="font-semibold">Título:</p>
                <p>
                  {logSelecionado.tarefa.titulo || "-"}
                </p>
              </div>

              <div>
                <p className="font-semibold">Descrição:</p>
                <p className="whitespace-pre-line text-sm">
                  {logSelecionado.modificacao.modificacao}
                </p>
              </div>

              <div className="mt-3 space-y-1">
                <p>
                  <strong>Tema:</strong>{" "}
                  {logSelecionado.tarefa.tema }
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {logSelecionado.tarefa.status || "-"}
                </p>
                <p>
                  <strong>Responsável:</strong>{" "}
                  {logSelecionado.tarefa.responsavel || "-"}
                </p>
                <p>
                  <strong>Data de Entrega:</strong>{" "}
                  {logSelecionado.tarefa.dataEntrega || "-"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="mt-4 bg-[#344256] px-4 py-2 rounded text-white w-full md:w-auto"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
