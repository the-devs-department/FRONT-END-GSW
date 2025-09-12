interface HeaderProps {
  btnFunc: (tipo: "Nova" | "Atualizar") => void;
}

export default function Header(props : HeaderProps) {
  return (
    <>
      <div className="w-full h-auto flex flex-col">
        <div className="flex items-center justify-between p-2">
          <div className="flex flex-col items-startjutify-center">
            <h1 className="text-gray-800 text-4xl font-bold">Todas as tarefas</h1>
            <p className="text-gray-500 text-lg pl-1">Gerencie e acompanhe o progresso de suas atividades</p>
          </div>
          <div className="flex gap-2">
            <button className="w-fit flex gap-2 border-[1px] border-gray-400 
              rounded-md p-2 text-black hover:bg-gray-300">
              Minhas tarefas
              <span className="flex items-center justify-center h-auto w-[1.5rem] bg-gray-300 rounded-full">
                0
              </span>
            </button>
            <button onClick={() => props.btnFunc("Nova")} className="bg-slate-800 p-2 rounded font-bold hover:bg-gray-900">
              + Criar nova tarefa
            </button>
          </div>
        </div>
      </div>
    </>
  )
}