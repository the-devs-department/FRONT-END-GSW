import Trash from '../../assets/delete.png'
import Edit from '../../assets/edit.png'
import './TeamModalOpc.css'
import type  Team  from "../../Interface/TeamInterface"
import TeamService from '../../Service/TeamService'

interface TeamModalProps {
  teamModalCondition: boolean,
  team: null | Team
}

export default function TeamModalOpc(props: TeamModalProps) {
  const deleteTeam = () => {
    if (props.team && props.team.id) {
      TeamService.deleteTeam(props.team.id)
        .then(() => {
          console.log("Equipe deletada com sucesso:", props.team);
        })
        .catch((error) => {
          console.error("Erro ao deletar equipe:", error);
        });
    }
  }
  return (
    <>
    <div className={props.teamModalCondition ? 'team-opc-open':'team-opc-closed'}>
      <ul className="flex flex-col w-44 rounded-lg border border-gray-200 bg-white">
        <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
          <img src={Edit} alt="" className="h-5 w-5"/>
          <span>Editar</span>
        </li>
        <li onClick={() => deleteTeam} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
          <img src={Trash} alt="" className="h-5 w-5"/>
          <span>Excluir</span>
        </li>
      </ul>
    </div>
    </>
  )
}