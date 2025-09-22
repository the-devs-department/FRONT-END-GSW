import profileUser from '../../assets/profile-user.png'
import checkIcon from '../../assets/check.png'
import listItems from '../../assets/task-list.png'
import logoutIcon from '../../assets/logout.png'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
  }

  return(
    <>
      <nav className='side-nav'>
        <div className='nav-header'>
          <img src={checkIcon} alt="" className='h-10'/>
          <h1 className=''>TaskManager</h1>
        </div>
        <hr />
        <div className='nav-user-infos'>
          <img src={profileUser} alt="" className='h-10'/>
          <div className='user-infos'>
            <p className='user-name'>Otávio Vianna Lima</p>
            <p className='user-email'>dev@gmail.com</p>
          </div>
        </div>
        <hr />
        <div className='nav-buttons'>
          <ul>
            <li className='active'>
              <img src={listItems} alt="" className='h-6'/>
              <p>
                Todas as tarefas
              </p>
            </li>
            <li className='delete' onClick={logout}>
              <img src={logoutIcon} alt="" className='h-6'/>
              <p>
                Logout
              </p>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}