import profileUser from '../../assets/profile-user.png'
import checkIcon from '../../assets/check.png'
import listItems from '../../assets/task-list.png'
import logoutIcon from '../../assets/logout.png'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { ScreenWidth } from '../../hooks/ScreenWidth'

interface NavbarProps {
  isNavbarOpen: boolean;
  closeNavbar: () => void;
  setFiltro: (filtro: 'todas' | 'minhas') => void;
  filtroAtual: 'todas' | 'minhas';
}

export default function Navbar({ isNavbarOpen, closeNavbar, setFiltro, filtroAtual }: NavbarProps) {
  const screenWidth = ScreenWidth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  }

  const mainClass = screenWidth > 1024 ? 'side-nav' : `hidden-side-nav ${isNavbarOpen && 'open-side-nav'}`;

  const estiloBotaoTodas = filtroAtual === 'todas' ? 'active' : ''; // 'active' é a classe que você já usava

  return (
    <>
      <nav className={mainClass}>
        <div className='nav-header'>
          {screenWidth < 1024 && (
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
            {/* PASSO 4: Adicionar o onClick e a classe dinâmica */}
            <li className={estiloBotaoTodas} onClick={() => setFiltro('todas')}>
              <img src={listItems} alt="" className='h-6' />
              <p>
                Todas as tarefas
              </p>
            </li>
            <li className='delete' onClick={logout}>
              <img src={logoutIcon} alt="" className='h-6' />
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