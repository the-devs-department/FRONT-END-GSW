import TaskList from "../components/TaskList/TaskList";
import type Tarefa from "../Interface/TarefaInterface";
import { useCallback, useEffect, useState} from "react";
import TarefaService from "../Service/TarefaService";
import { useNavigate, useOutletContext, useParams, Link } from "react-router-dom";
import type { RootLayoutContext } from "./RootLayout";

type HomeContext = RootLayoutContext

export default function Home() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [loading, setLoading] = useState(true);
    const [userRoles, setUserRoles] = useState<null | String[]>(null);
    const {teamId} = useParams();
    const {setCallbackRecarregarTarefas} = useOutletContext<HomeContext>();
    const navigate = useNavigate();

    if (!teamId) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="text-gray-700 text-xl mb-4">Você não selecionou nenhuma equipe!</p>
                <Link to="/home" className="bg-gray-800 p-2 rounded text-xl hover:bg-gray-950">Voltar</Link>
            </div>
        );
    }

    
    const carregarTarefas = useCallback(async () => {
        const userInfos = localStorage.getItem('authData');
        const userInfosParsed = userInfos ? JSON.parse(userInfos) : null;
        const id = userInfosParsed?.userId; 
        const token = userInfosParsed?.token;
        const userRolesLS = localStorage.getItem("userRoles");
        const userRolesParsed = userRolesLS ? JSON.parse(userRolesLS) : null;
        setUserRoles(userRolesParsed);
        if (!token || !id) {
            navigate('/login');
            return;
        }
        try {
            setLoading(true);
            const data = await TarefaService.fetchTarefasPorResponsavel(id);
            setTarefas(data);
        } catch (err) {
            console.error("Erro ao carregar tarefas:", err);
        } finally {
            setLoading(false);
        }
    }, [navigate]); 

    useEffect(() => {
        carregarTarefas();
    }, [carregarTarefas]); 
    
    useEffect(() => {
        setCallbackRecarregarTarefas(carregarTarefas);
        
        return () => {
            setCallbackRecarregarTarefas(null);
        };
    }, [setCallbackRecarregarTarefas, carregarTarefas]); 
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
    );
}