import { useState } from "react";
import './TeamModal.css'
import UserService from "../../Service/UserService";
import type Team  from "../../Interface/TeamInterface";
import TeamService from "../../Service/TeamService";
import { useFeedback } from "../../context/FeedbackModalContext";

interface TeamModalProps {
  typeModal: 'New Team' | 'Edit Team' | null;
  condicaoTeamModal: boolean,
  teamToUpdade: null | Team,
  onTaskSuccess: () => void,
  closeTeamModal: () => void
}

export default function TeamModal(props: TeamModalProps) {
  const [teamName, setTeamName] = useState<string>('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [teamAdmins, setTeamAdmins] = useState<string[]>([]);
  const [memberInput, setMemberInput] = useState<string>('');
  const [adminInput, setAdminInput] = useState<string>('');
  const { showFeedback } = useFeedback()

  const closeTeamModalAction = () => {
    resetForm()
    props.closeTeamModal()
  }

  const teamModalTitle = props.typeModal === "New Team" ? 'Nova Equipe' : 'Editar Equipe'
  const teamModalButton = props.typeModal === "New Team" ? 'Criar' : 'Salvar'

  const resetForm = () => {
    setTeamName("")
    setTeamMembers([])
    setTeamAdmins([])
    setMemberInput("")
    setAdminInput("")
  }

  const addMember = () => {
    if (memberInput.trim() && !teamMembers.includes(memberInput)) {
      setTeamMembers([...teamMembers, memberInput])
      setMemberInput("")
    }
  }

  const removeMember = (email: string) => {
    setTeamMembers(teamMembers.filter(m => m !== email))
  }

  const addAdmin = () => {
    if (adminInput.trim() && !teamAdmins.includes(adminInput)) {
      setTeamAdmins([...teamAdmins, adminInput])
      setAdminInput("")
    }
  }

  const removeAdmin = (email: string) => {
    setTeamAdmins(teamAdmins.filter(a => a !== email))
  }

  const buildTeam = (email: string): Team => {
    return {
      nome: teamName,
      emailCriador: email,
      membros: teamMembers,
      admins: teamAdmins
    }
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    try {
      const userId = UserService.getUserId();
      const userData = await UserService.getUserInfos(userId);
      const userEmail = userData.email
      const buildedTeam = buildTeam(userEmail)
      if (props.typeModal === "New Team") {
        await TeamService.createTeam(buildedTeam)
        showFeedback('Sucesso', "Equipe criada com sucesso!", "A equipe foi criada com sucesso")
        setTimeout(() => {
        props.onTaskSuccess();
      }, 2500);
        resetForm()
        props.closeTeamModal()
      } else {
        showFeedback('Erro', "Em desenvolvimento", "A edição de equipes ainda está sendo desenvolvida")
      }
    } catch (err) {
      console.error('Erro ao criar/editar equipe', err)
      showFeedback('Erro', "Erro ao criar equipe", "Algo deu errado ao criar equipe!")
    }
  }

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
          <form action="" className="team-forms" onSubmit={handleSubmit}>
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
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="E-mail do usuário"
                    className="w-[15rem]"
                    value={memberInput}
                    onChange={(ev) => setMemberInput(ev.target.value)}
                    onKeyPress={(ev) => ev.key === 'Enter' && (ev.preventDefault(), addMember())}
                  />
                  <button 
                    type="button"
                    onClick={addMember}
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded"
                  >
                    Adicionar
                  </button>
                </div>
                <div className="members-list mt-2">
                  {teamMembers.map((email) => (
                    <div key={email} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                      <span className="text-sm">{email}</span>
                      <button 
                        type="button"
                        onClick={() => removeMember(email)}
                        className="text-red-600 text-sm font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="team-inputs">
                <label>Administradores da Equipe *</label>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="E-mail do usuário"
                    className="w-[15rem]"
                    value={adminInput}
                    onChange={(ev) => setAdminInput(ev.target.value)}
                    onKeyPress={(ev) => ev.key === 'Enter' && (ev.preventDefault(), addAdmin())}
                  />
                  <button 
                    type="button"
                    onClick={addAdmin}
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded"
                  >
                    Adicionar
                  </button>
                </div>
                <div className="members-list mt-2">
                  {teamAdmins.map((email) => (
                    <div key={email} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                      <span className="text-sm">{email}</span>
                      <button 
                        type="button"
                        onClick={() => removeAdmin(email)}
                        className="text-red-600 text-sm font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
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