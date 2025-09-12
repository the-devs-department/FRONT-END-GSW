import Cards from '../Cards/Cards'
import './TaskList.css'

interface TaskListProps {
  title: string,
  taksCount: number,
  openModal: (tipo: 'Atualizar' | 'Nova') => void;
  
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
          <Cards
            openModal={props.openModal}
          />
          <Cards
            openModal={props.openModal}
          />
          <Cards
            openModal={props.openModal}
          />
        </div>
      </div>
    </>
  )}
