import TaskList from "../components/TaskList/TaskList";

export default function Home() {
  return (
    <>
        <div className="w-full justify-evenly pb-3 flex">
          <TaskList
            title="Não Iniciada"
            taksCount={2}
          />
          <TaskList
            title="Em Andamento"
            taksCount={10}
          />
          <TaskList
            title="Concluída"
            taksCount={1}
          />
        </div>
    </>
  )
}