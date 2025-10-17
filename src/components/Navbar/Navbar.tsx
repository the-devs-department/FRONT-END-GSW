import profileUser from '../../assets/profile-user.png'
import checkIcon from '../../assets/check.png'
import listItems from '../../assets/task-list.png'
import myTasks from '../../assets/myTasks.png'
import logoutIcon from '../../assets/logout.png'
import openFolder from '../../assets/openFolder.png'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { ScreenWidth } from '../../hooks/ScreenWidth'

interface NavbarProps {
  isNavbarOpen: boolean;
  closeNavbar: () => void;
  setFiltro: (filtro: 'todas' | 'minhas') => void;
  filtroAtual: 'todas' | 'minhas';
}

export default function Navbar({ isNavbarOpen, closeNavbar, setFiltro, filtroAtual }: NavbarProps) {
  const screenWidth = ScreenWidth();
  const logout = () => {
    localStorage.removeItem('authToken');
  }

  const mainClass = screenWidth > 1024 ? 'side-nav' : `hidden-side-nav ${isNavbarOpen && 'open-side-nav'}`;

  const pagelink = useLocation()

  return (
    <>
      <nav className={mainClass}>
        <div className='nav-header'>
          {screenWidth <= 1024 && (
            <span className='close-navbar-button' onClick={closeNavbar}>
              X
            </span>
          )}
          <img src={checkIcon} alt="" className='h-10' />
          <h1>TaskManager</h1>
        </div>
        <hr />
        <div className='nav-user-infos'>
          <img src={profileUser} alt="" className='h-10' />
          <div className='user-infos'>
            <p className='user-name'>Otávio Vianna Lima</p>
            <p className='user-email'>dev@gmail.com</p>
          </div>
        </div>
        <hr />
        <div className='nav-buttons'>
          <ul>
            <Link to='/home' className={pagelink.pathname === '/home' ? 'active': 'todas'}>
              <img src={listItems} alt="" className='h-6' />
              <p>
                Todas as tarefas
              </p>
            </Link>
            <Link to='/home/minhas-tarefas' className={pagelink.pathname === '/home/minhas-tarefas' ? 'active': 'todas'}>
              <img src={myTasks} alt="" className='h-6' />
              <p>
                Minhas tarefas
              </p>
            </Link>
            <Link to= '/home/log-auditoria'  className={pagelink.pathname === '/home/log-auditoria' ? 'active': 'todas'}>
              <img src={openFolder} alt="" className='h-6' />
                <p>
                  Log de Auditoria
                </p> 
            </Link>
            <Link to='/login' className='delete' onClick={logout}>
              <img src={logoutIcon} alt="" className='h-6' />
              <p>
                Logout
              </p>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  )
}