import TaskList from "../components/TaskList/TaskList";

export default function TodasTarefas() {
  return (
    <>
        <div className="w-full justify-evenly pb-3 flex">
          <TaskList
          title="Não Iniciada"
          taksCount={2} tarefa={[]}          />
          <TaskList
          title="Em Andamento"
          taksCount={10} tarefa={[]}          />
          <TaskList
          title="Concluída"
          taksCount={1} tarefa={[]}          />
        </div>
    </>
  )
}
