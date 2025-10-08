import checkedIcon from '../../assets/check.png'
import './FormHeader.css'

interface FormHeaderProps {
  description: String
}

export default function FormHeader(props: FormHeaderProps) {
  return(
    <div className='form-header'>
      <div className='form-project-title'>
          <span className='checked-box'>
            <img src={checkedIcon} alt=""/>
          </span>
          <h2>TaskManager</h2>
      </div>
      <p>{props.description}</p>
    </div>
  )
}
