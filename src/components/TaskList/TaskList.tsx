import './TaskList.css'

interface TaskListProps {
  title: String,
  taksCount: number
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

        </div>
      </div>
    </>
  )}
