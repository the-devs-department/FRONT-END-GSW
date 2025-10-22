import TaskList from "../components/TaskList/TaskList";
import Header from "../components/Header/Header";
import type Tarefa from "../Interface/TarefaInterface";
import { useTaskModal } from "../context/TaskModalContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<'todas' | 'minhas'>('minhas');
  const { openTaskModal } = useTaskModal();

  useEffect(() => {
    setLoading(true);
    
    // TODO: Implementar busca de tarefas da API do usuario especifico
    const tarefasDoUsuario: Tarefa[] = [];
    
    setTarefas(tarefasDoUsuario);
    setLoading(false);
  }, []);
  

  const tarefasNaoIniciadas = tarefas.filter(t => t.status === "NAO_INICIADA");
  const tarefasEmAndamento = tarefas.filter(t => t.status === "EM_ANDAMENTO");
  const tarefasConcluidas = tarefas.filter(t => t.status === "CONCLUIDA");

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-700 text-xl">Carregando tarefas...</p>
      </div>
    );
  }

  return (
    <>
      <Header 
        btnFunc={openTaskModal}
        setFiltro={setFiltro}
        filtroAtual={filtro}
      />
      
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