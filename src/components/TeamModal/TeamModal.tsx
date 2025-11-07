import { useState } from "react";
import './TeamModal.css'
import UserCard from "../UserCard/UserCard";

interface Team {
  nome: string,
  membros: string[],
  admins: string[]
}


interface TeamModalProps {
  typeModal: 'New Team' | 'Edit Team' | null;
  condicaoTeamModal: boolean,
  teamToUpdade: null | Team,
  closeTeamModal: () => void
}

export default function TeamModal(props: TeamModalProps) {
  const [team, setTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState<string>('');
  const [teamMembers, setTeamMembers] = useState<string[] | null> (null);
  const [teamAdmins, setTeamAdmins] = useState<string[] | null> (null);

  const closeTeamModalAction = () => {
    setTeamName("")
    setTeamMembers(null)
    setTeamAdmins(null)
    props.closeTeamModal()
  }

  const teamModalTitle = props.typeModal === "New Team" ? 'Nova Equipe' : 'Editar Equipe'
  const teamModalButton = props.typeModal === "New Team" ? 'Criar' : 'Salvar'
  return(
    <>
      <div id="teamsForms" className={props.condicaoTeamModal ? 'team-modal-open' : 'team-modal-closed'}>
        <div className="team-modal-header">
          <span onClick={closeTeamModalAction}>
            &times;
          </span>
        </div>
        <div className="team-modal-content">
          <h2>{teamModalTitle}</h2>
          <form action="" className="team-forms">
            <div className="team-infos">
              <div className="team-inputs">
                <label>Nome *</label>
                <input 
                  type="text" placeholder="Digite o nome da equipe"
                  required value={teamName}
                  onChange={(ev) => setTeamName(ev.target.value)}
                  />
              </div>
              <div className="team-inputs">
                <label>Membros da Equipe *</label>
                <input 
                  type="text" placeholder="E-mail do usuário"
                  className="w-[15rem]"
                />
                <div className="members-list">

                </div>
              </div>
              <div className="team-inputs">
                <label>Administradores da Equipe *</label>
                <input 
                  type="text" placeholder="E-mail do usuário"
                  className="w-[15rem]"
                />
                <div className="members-list">
                  <UserCard username="Otávio Vianna Lima"/>
                  <UserCard username="Tiago Freitas"/>
                </div>
              </div>
              <div className="flex justify-end gap-4 w-full mt-6 mb-4">
                <button
                  type="button"
                  onClick={closeTeamModalAction}
                  className="px-4 py-2 text-sm font-bold border rounded-md"
                >
                  Cancelar
                </button>
                <button
                type="submit"
                className="px-7 py-3 bg-gray-700 font-bold text-sm text-white rounded-lg"
                >
                  {teamModalButton}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}