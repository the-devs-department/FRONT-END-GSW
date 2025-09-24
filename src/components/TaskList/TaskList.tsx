import Cards from '../Cards/Cards'
import './TaskList.css'

interface Task {
  id: string,
  title: string,
  description: string,
  tema: string,
  dataEntrega: string,
  responsavel: string,
  file: File | null
}


interface TaskListProps {
  title: string,
  taksCount: number,
  task: Task
}

export default function TaskList(props: TaskListProps){
  return(
    <>
      <div className='task-list'>
        <div className='tasks-infos'>
          <h2 className='text-black font-bold'>{props.title}</h2>
          <span className='task-count'>
            {props.taksCount}
          </span>
        </div>
        <div className='tasks'> 
          <Cards task={props.task}/>
          <Cards task={props.task}/>
          <Cards task={props.task}/>
          <Cards task={props.task}/>
          <Cards task={props.task}/>
        </div>
      </div>
    </>
  )}
