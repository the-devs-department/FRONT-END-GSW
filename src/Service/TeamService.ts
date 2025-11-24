import UserService from "./UserService"
import type Team  from "../Interface/TeamInterface"

const baseUrl = "http://localhost:8086/equipes"

const createTeam = async (team: Team) => {
  if (!team) {
    throw new Error("Dados da equipe não fornecidos!")
  }
  const response = await fetch(`${baseUrl}/criar`, {
    method: "POST",
    headers: UserService.getAuthHeaders(),
    body: JSON.stringify(team)
  })
  if (!response.ok) throw new Error("Erro ao criar equipe")
  return response.json()
}

const getUserTeams = async (email: string) => {
  if (!email) {
    throw new Error("Email do usuário não fornecido!")
  }
  const response = await fetch(`${baseUrl}/minhas-equipes?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: UserService.getAuthHeaders()
  })
  if (!response.ok) throw new Error("Erro ao buscar equipes do usuário")
  return response.json()

}

const deleteTeam = async (teamId: string) => {
  if (!teamId) {
    throw new Error("ID da equipe não fornecido!")
  }
  const response = await fetch(`${baseUrl}/${teamId}`, {
    method: "DELETE",
    headers: UserService.getAuthHeaders()
  })
  if (!response.ok) throw new Error("Erro ao deletar equipe")
  return response.json()
}
const TeamService = {
  createTeam, 
  getUserTeams,
  deleteTeam
}

export default TeamService