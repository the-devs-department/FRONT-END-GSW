import profileUser from '../../assets/profile-user.png'
import checkIcon from '../../assets/check.png'
import listItems from '../../assets/task-list.png'
import logoutIcon from '../../assets/logout.png'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { ScreenWidth } from '../../hooks/ScreenWidth'

interface NavbarProps {
  isNavbarOpen: boolean
  closeNavbar: () => void;
}

export default function Navbar(props: NavbarProps) {
  const screenWidth = ScreenWidth()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
  }

  const mainClass = screenWidth > 1024 ? 'side-nav':`hidden-side-nav ${props.isNavbarOpen && 'open-side-nav'}`

  return(
    <>
      <nav className={mainClass}>
        <div className='nav-header'>
          {screenWidth < 1024 && (
            <span className='close-navbar-button' onClick={props.closeNavbar}>
              X
            </span>
          )}
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