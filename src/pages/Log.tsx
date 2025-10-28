import { useCallback, useEffect, useState } from "react";
import auditoriaService from "../Service/AuditoriaService";
import type AuditoriaResponse from "../Interface/AuditoriaInsterface";
import NotAllowed from "../components/NotAllowed/NotAllowed";
import { useNavigate } from "react-router-dom";


export default function Log() {
  const [logs, setLogs] = useState<AuditoriaResponse[]>([]);
  const [logSelecionado, setLogSelecionado] = useState<AuditoriaResponse | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState<null | String[]>(null)

  const formatarTexto = (valor?: string): string => {
    if (!valor) return "-";
    const mapa: Record<string, string> = {
      CRIACAO: "Criação",
      EDICAO: "Edição",
      EXCLUSAO: "Exclusão",
      NAO_INICIADA: "Não Iniciada",
      EM_ANDAMENTO: "Em Andamento",
      CONCLUIDA: "Concluída",
    };
    return mapa[valor.toUpperCase()] || valor;
  };

  const formatarData = (dataISO?: string): string => {
    if (!dataISO) return "-";
    const data = new Date(dataISO);
    if (isNaN(data.getTime())) return dataISO;
    return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  const fetchLogs = useCallback(async () =>{
  const userInfos = localStorage.getItem('authData')
  const userInfosParsed = userInfos ? JSON.parse(userInfos) : null
  const token = userInfosParsed.token
  const userRolesLS = localStorage.getItem("userRoles");
  const userRolesParsed = userRolesLS ? JSON.parse(userRolesLS) : null
  setUserRoles(userRolesParsed)
  if(!token) return;
  try{
    setLoading(true);
    const data = await auditoriaService.fetchTodosLogs();
    setLogs(data);
  } catch (err){
    console.error("Erro ao carregar log:", err);
  } finally {
    setLoading(false);
  }
  },[] );

  useEffect(() => {
    const userInfos = localStorage.getItem('authData')
    const userInfosParsed = userInfos ? JSON.parse(userInfos) : null
    const token = userInfosParsed.token
    if (!token){
      navigate('/login');
      return;
    }
    fetchLogs();
  }, [navigate, fetchLogs])

  if (loading) {
    return(
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-700 text-xl">Carregando tarefas...</p>
      </div>
    )
  }

  return (
    <>
      {userRoles?.includes("ROLE_ADMIN") ? (
        <div className="relative w-full flex flex-col transition-all duration-500 no-scrollbar">
          {/* Área da tabela */}
          <div className="w-full">
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
                        Carregando logs...
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
                        <td className="text-[15px] text-[#22222A] border border-black px-2 md:px-4 py-2">
                          {formatarData(log.dataAlteracao)}
                        </td>
                        <td className="text-[15px] text-[#22222A] border border-black px-2 md:px-4 py-2">
                          {log.horaAlteracao}
                        </td>
                        <td className="text-[15px] text-[#22222A] border border-black px-2 md:px-4 py-2">
                          {formatarTexto(log.modificacao.categoria)}
                        </td>
                        <td className="text-[15px] text-[#22222A] border border-black px-2 md:px-4 py-2">
                          {log.responsavel.emailResponsavel}
                        </td>
                        <td className="text-[15px] text-[#22222A] border border-black px-2 md:px-4 py-2">
                          {log.tarefa?.id || "-"} 
                        </td>
                        <td className="text-[15px] text-[#22222A] border border-black px-2 md:px-4 py-2">
                          {log.modificacao.modificacao}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Painel lateral fixo */}
          <div
            className={`fixed top-[10.65rem] right-0 
        w-full sm:w-[70%] md:w-[50%] lg:w-[28%] 
        bg-white border-l border border-black shadow-lg
        transition-all duration-700 ease-in-out z-[9999] overflow-y-auto
        h-[80.5vh] pb-6 no-scrollbar
        ${showDetails ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          >
            {/* Cabeçalho */}
            <div className="border-b border-black flex items-center justify-center p-3">
              <h3 className="text-[14px] md:text-[15px] font-bold text-[#22222A] text-center">
                Log - {}
              </h3>
            </div>

            {logSelecionado && (
              <div className="p-3 space-y-3 text-sm md:text-base text-[#22222A]">
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 border-b pb-2 border-gray-300">
                  <div>
                    <p className="font-semibold">Data:</p>
                    <p className="text-[15px]">{formatarData(logSelecionado.dataAlteracao)}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Hora:</p>
                    <p className="text-[15px]">{logSelecionado.horaAlteracao}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p className="text-[15px]">{logSelecionado.responsavel.emailResponsavel}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Categoria:</p>
                    <p className="text-[15px]">{formatarTexto(logSelecionado.modificacao.categoria)}</p>
                  </div>
                  <div>
                    <p className="font-semibold">ID da Tarefa:</p>
                    <p className="text-[15px]">{logSelecionado.tarefa?.id||"-"}</p>
                  </div>
                </div>

                <div className="border border-gray-300 rounded p-3 mt-2">
                  <h2 className="text-[15px] font-bold mb-2 text-center">
                    Detalhes da Tarefa
                  </h2>

                  <div className="mb-[5px]">
                    <p className="font-semibold">Título:</p>
                    <p>{logSelecionado.tarefa?.titulo}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Descrição:</p>
                    <p className="text-sm text-[15px]">
                      {logSelecionado.tarefa?.descricao}
                    </p>
                  </div>

                  <div className="mt-[5px] space-y-1">
                    <p>
                      <strong>Tema:</strong> {logSelecionado.tarefa?.tema} </p>
                    <p>
                      <strong>Status:</strong> {formatarTexto(logSelecionado.tarefa?.status)}
                    </p>
                    <p>
                      <strong>Responsável:</strong>{" "}
                      {logSelecionado.responsavel.emailResponsavel}
                    </p>
                    <p>
                      <strong>Data de Entrega:</strong>{" "}
                      {formatarData(logSelecionado.tarefa?.dataEntrega)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowDetails(false)}
                  className="mt-3 bg-[#344256] px-4 py-2 rounded text-white w-full md:w-auto"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NotAllowed />
      )}

    </>
  );
}
