import inviteIcon from '../../assets/invite.png'
import { useLocation } from 'react-router-dom';
import { NotificationBell } from '../NotificationBell/NotificationBell';

interface HeaderProps {
  btnFunc: (tipo: "Nova" | "Atualizar") => void;
  teamFunc: (tipo: "New Team" | "Edit Team") => void;
}

export default function Header({ btnFunc, teamFunc }: HeaderProps) {
  const location = useLocation();

  const headerTitle: Record<string, string> = {
    '/home/todas-tarefas': 'Todas as tarefas',
    '/home': 'Minhas tarefas',
    '/home/log-auditoria': 'Log de auditoria',
    '/home/equipes': 'Equipes'
  }

  const descriptionPaths = ['/home', '/home/todas-tarefas', '/home/log-auditoria']

  const titulo = headerTitle[location.pathname as keyof typeof headerTitle]
  const description = descriptionPaths.includes(location.pathname) ? 'Gerencie e acompanhe o progresso de suas atividades' : 'Gerencie e visualize suas equipes'
  const titleAppearsAt = ['/home', '/home/todas-tarefas', '/home/equipes', '/home/log-auditoria']
  const buttonAppearsAt = ['/home', '/home/todas-tarefas']
  const showNotifications = location.pathname !== '/home/calendario'



  return (
    <>
      <div className="w-full h-auto flex items-center justify-center">
        <div className="w-full flex items-center justify-between p-2 max-[800px]:flex-col max-[800px]:gap-2">
          {titleAppearsAt.includes(location.pathname) && (
            <div className="flex flex-col items-start justify-center max-[800px]:w-full max-[800px]:justify-start">
              <h1 className="text-gray-800 text-4xl font-bold max-[800px]:text-2xl">{titulo}</h1>
              <p className="text-gray-500 text-lg pl-1 max-[800px]:text-sm">{description}</p>
            </div>
          )}

          <div className="flex gap-2 items-center max-[800px]:w-full max-[800px]:justify-end">
            {showNotifications && <NotificationBell />}
            {buttonAppearsAt.includes(location.pathname) ? (
              <button onClick={() => btnFunc("Nova")} className="bg-slate-800 text-white p-2 px-4 rounded font-bold hover:bg-gray-900 transition-colors">
                + Nova tarefa
              </button>
            ) : (
              <>
                {location.pathname === '/home/equipes' ? (
                  <>
                    <button onClick={() => console.log("Nova equipe")} className="flex gap-4 items-center justify-center bg-gray-400 text-white text-sm p-2 px-4 rounded font-bold hover:bg-gray-500 transition-colors">
                      <img src={inviteIcon} alt="" className='h-6' />
                      Convites
                    </button>
                    <button onClick={() => teamFunc("New Team")} className="bg-slate-800 text-white text-sm p-2 px-4 rounded font-bold hover:bg-gray-900 transition-colors">
                      + Nova equipe
                    </button>
                  </>
                ): (
                  null
                )}
              </>
            )}

            {/* <NotificationBell /> */}

          </div>
        </div>
      </div>
    </>
  )
}