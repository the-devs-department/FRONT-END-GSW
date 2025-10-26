import { useLocation } from 'react-router-dom';

interface HeaderProps {
  btnFunc: (tipo: "Nova" | "Atualizar") => void;
}

export default function Header({ btnFunc }: HeaderProps) {
  const location = useLocation();

  const headerTitle: Record<string, string> ={
    '/home/todas-tarefas': 'Todas as tarefas',
    '/home': 'Minhas tarefas',
    '/home/log-auditoria': 'Log de auditoria'
  }

  const titulo = headerTitle[location.pathname as keyof typeof headerTitle]
  const buttonAppearsAt = ['/home', '/home/todas-tarefas']

  return (
    <>
      <div className="w-full h-auto flex items-center justify-center">
        <div className="w-full flex items-center justify-between p-2 max-[800px]:flex-col max-[800px]:gap-2">
          <div className="flex flex-col items-start jutify-center max-[800px]:w-full max-[800px]:justify-start">
            <h1 className="text-gray-800 text-4xl font-bold max-[800px]:text-2xl">{titulo}</h1>
            <p className="text-gray-500 text-lg pl-1 max-[800px]:text-sm">Gerencie e acompanhe o progresso de suas atividades</p>
          </div>
          <div className="flex gap-2 max-[800px]:w-full max-[800px]:justify-end">
          {buttonAppearsAt.includes(location.pathname) && (
            <button onClick={() => btnFunc("Nova")} className="bg-slate-800 text-white p-2 px-4 rounded font-bold hover:bg-gray-900 transition-colors">
              + Nova tarefa
            </button>
          )}
          </div>
        </div>
      </div>
    </>
  )
}