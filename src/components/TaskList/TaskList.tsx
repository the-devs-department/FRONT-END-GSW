import Cards from '../Cards/Cards'
import './TaskList.css'
import type Tarefa from '../../Interface/TarefaInterface'; 

interface TaskListProps {
  title: string,
  taksCount: number,
  tarefa: Tarefa[];

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
          {props.tarefa && props.tarefa.map((tarefa) => (
          <Cards
          key={tarefa.id}
          task={tarefa}
          />
        ))}
        </div>
      </div>
    </>
  )}
