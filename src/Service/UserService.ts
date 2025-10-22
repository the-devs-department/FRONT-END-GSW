const getAuthHeaders = () => {
    const userInfos = localStorage.getItem('authData')
    const userInfosParsed = userInfos ? JSON.parse(userInfos) : null
    const token = userInfosParsed.token
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

const UserService = {
  getUserInfos,
  getAuthHeaders
}


export default UserService