import NotAllowed from "../components/NotAllowed/NotAllowed";
import TaskList from "../components/TaskList/TaskList";
import type Tarefa from "../Interface/TarefaInterface";
import { useCallback, useEffect, useState } from "react";
import TarefaService from "../Service/TarefaService";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { RootLayoutContext } from "./RootLayout";

type AllTasksContext = RootLayoutContext

export default function TodasTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<null | String[]>(null)
  
  const {setCallbackRecarregarTarefas} = useOutletContext<AllTasksContext>();
  const navigate = useNavigate();

  const carregarTarefas = useCallback(async () => {
    const userInfos = localStorage.getItem('authData');
    const userInfosParsed = userInfos ? JSON.parse(userInfos) : null;
    const id = userInfosParsed?.userId; 
    const token = userInfosParsed?.token;
    const userRolesLS = localStorage.getItem("userRoles");
    const userRolesParsed = userRolesLS ? JSON.parse(userRolesLS) : null;
    setUserRoles(userRolesParsed)
    if (!token || !id) {
      navigate('/login');
      return;
    }
    try {
      setLoading(true);
      const data = await TarefaService.fetchTarefas();
      setTarefas(data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    carregarTarefas();

  }, [carregarTarefas])

  useEffect(() => {
    setCallbackRecarregarTarefas(carregarTarefas)

    return () => {
      setCallbackRecarregarTarefas(null)
    }
  }, [setCallbackRecarregarTarefas, carregarTarefas])


  const tarefasNaoIniciadas = tarefas.filter((t) => t.status === "NAO_INICIADA");
  const tarefasEmAndamento = tarefas.filter((t) => t.status === "EM_ANDAMENTO");
  const tarefasConcluidas = tarefas.filter((t) => t.status === "CONCLUIDA");

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-700 text-xl">Carregando tarefas...</p>
      </div>
    );
  }

  return (
    <>
      {userRoles?.includes("ROLE_ADMIN") ? (
        <>
          <div className="w-full justify-evenly pb-3 flex">
            <TaskList
              title="Não Iniciada"
              taksCount={tarefasNaoIniciadas.length}
              tarefa={tarefasNaoIniciadas}
            />
            <TaskList
              title="Em Andamento"
              taksCount={tarefasEmAndamento.length}
              tarefa={tarefasEmAndamento}
            />
            <TaskList
              title="Concluída"
              taksCount={tarefasConcluidas.length}
              tarefa={tarefasConcluidas}
            />
          </div>
        </>
      ): (
        <NotAllowed />
      )}
    </>
  );
}
