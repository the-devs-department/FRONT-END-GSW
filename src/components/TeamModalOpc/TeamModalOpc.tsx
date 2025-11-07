import Trash from '../../assets/delete.png'
import Edit from '../../assets/edit.png'
import './TeamModalOpc.css'

interface Team {
  nome: string,
  membros: string[],
  admins: string[]
}

interface TeamModalProps {
  teamModalCondition: boolean,
  tarefa: null | Team
}

export default function TeamModalOpc(props: TeamModalProps) {
  return (
    <>
    <div className={props.teamModalCondition ? 'team-opc-open':'team-opc-closed'}>
      <ul className="flex flex-col w-44 rounded-lg border border-gray-200 bg-white">
        <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
          <img src={Edit} alt="" className="h-5 w-5"/>
          <span>Editar</span>
        </li>
        <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
          <img src={Trash} alt="" className="h-5 w-5"/>
          <span>Excluir</span>
        </li>
      </ul>
    </div>
    </>
  )
}