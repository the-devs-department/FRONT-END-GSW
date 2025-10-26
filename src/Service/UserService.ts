const getUserTokenAndId = () => {
  const userInfos = localStorage.getItem('authData')
  const userInfosParsed = userInfos ? JSON.parse(userInfos) : null
  const token = userInfosParsed.token
  const id = userInfosParsed.userId

  return {token, id}
}

const getAuthHeaders = () => {
    const userData = getUserTokenAndId()
    const token = userData.token
    if (!token) {
        throw new Error("Token de autenticação não encontrado.");
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

const getUserInfos = async (id: string) => {
  if (!id) {
    throw new Error("ID de usuário não encontrado!")
  }
  const response = await fetch(`http://localhost:8080/usuarios/getOnLogin/${id}`,{
    method: "GET",
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Erro ao buscar informações do usuário');
  return response.json();
}

const getUsers = async () => {
  const response = await fetch("http://localhost:8080/usuarios", {
    method: "GET",
    headers: getAuthHeaders()
  })

  if (!response.ok) throw new Error("Erro ao buscar usuários")
  return response.json()
}

const assignedUser = async (email: string) => {
  const response = await fetch(`http://localhost:8080/usuarios/assignedUser/${email}`, {
    method: "GET",
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error("Erro ao buscar usuário responsável")
  return response.json()

}

const UserService = {
  getUserTokenAndId,
  getUserInfos,
  getAuthHeaders,
  getUsers,
  assignedUser
}

export default UserService