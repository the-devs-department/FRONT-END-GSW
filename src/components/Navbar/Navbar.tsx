import checkIcon from '../../assets/check.png'
import listItems from '../../assets/task-list.png'
import myTasks from '../../assets/myTasks.png'
import calendarIcon from '../../assets/calendar.png'
import logoutIcon from '../../assets/logout.png'
import openFolder from '../../assets/openFolder.png'
import teamIcon from '../../assets/team.png'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ScreenWidth } from '../../hooks/ScreenWidth'
import './Navbar.css'

interface NavbarProps {
    isNavbarOpen: boolean;
    closeNavbar: () => void;
    setFiltro: (filtro: 'todas' | 'minhas') => void;
    filtroAtual: 'todas' | 'minhas';
    userInfos: [nome: String | null, email: String | null]
}

export default function Navbar({ isNavbarOpen, closeNavbar, userInfos }: NavbarProps) {
    const screenWidth = ScreenWidth();
    const { teamId } = useParams<{ teamId: string }>();
    const pagelink = useLocation();

    const baseTeamRoute = teamId ? `/tarefas/${teamId}` : '';
    const isTeamContext = !!teamId;

    const logout = () => {
        localStorage.removeItem('authToken');
    }

    const userInitials: string[] = []
    const doesntCount = ["dos", "de"]
    const listNames = userInfos[0]?.split(' ') || [];
    for (let i = 0; i < listNames.length; i++) {
        if (userInitials.length === 2) {
            break
        } else {
            if (!doesntCount.includes(listNames[i].toLowerCase())) {
                userInitials.push(listNames[i][0].toUpperCase())
            }
        }
    }

    const mainClass = screenWidth > 1024 ? 'side-nav' : `hidden-side-nav ${isNavbarOpen && 'open-side-nav'}`;

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
                    <div className="bg-gray-200 h-[28px] w-[28px] rounded-full flex items-center justify-center text-black">
                        {userInitials.join('')}
                    </div>
                    <div className='user-infos'>
                        <p className='user-name'>{userInfos[0]}</p>
                        <p className='user-email'>{userInfos[1]}</p>
                    </div>
                </div>
                <hr />
                <div className='nav-buttons'>
                    <ul>
                        {isTeamContext && (
                            <Link 
                                to={`${baseTeamRoute}/todas`} 
                                className={pagelink.pathname === `${baseTeamRoute}/todas` ? 'active' : 'todas'}
                            >
                                <img src={listItems} alt="" className='h-6' />
                                <p>
                                    Todas as tarefas
                                </p>
                            </Link>
                        )}
                        
                        <Link 
                            to={baseTeamRoute || '/tarefas'}
                            className={pagelink.pathname === baseTeamRoute || pagelink.pathname === '/tarefas' ? 'active' : 'minhas'}
                        >
                            <img src={myTasks} alt="" className='h-6' />
                            <p>
                                Minhas tarefas
                            </p>
                        </Link>

                        <Link to='/home' className={pagelink.pathname === '/home' ? 'active' : 'todas'}>
                            <img src={teamIcon} alt="" className='h-6' />
                            <p>
                                Equipes
                            </p>
                        </Link>

                        <Link to='/home/calendario' className={pagelink.pathname === '/home/calendario' ? 'active' : 'calendario'}>
                            <img src={calendarIcon} alt="" className='h-6' />
                            <p>
                                Calendário
                            </p>
                        </Link>

                        {isTeamContext && (
                            <Link 
                                to={`${baseTeamRoute}/log-auditoria`} 
                                className={pagelink.pathname === `${baseTeamRoute}/log-auditoria` ? 'active' : 'todas'}
                            >
                                <img src={openFolder} alt="" className='h-6' />
                                <p>
                                    Log de Auditoria
                                </p>
                            </Link>
                        )}
                        
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
    );
}