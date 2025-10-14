import type AuditoriaResponse from "../Interface/AuditoriaInsterface";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Token de autenticação não encontrado.");
  }
  return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
  };
};

const fetchLogsPorTarefaId = async (tarefaId: string): Promise<AuditoriaResponse[]> => {
  const response = await fetch(`http://localhost:8080/logs/${tarefaId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Erro na chamada à API: Status ${response.status}`);
  }

  return response.json();
};

const fetchTodosLogs = async (): Promise<AuditoriaResponse[]> => {
  const response = await fetch(`http://localhost:8080/logs`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Erro na chamada à API: Status ${response.status}`


        

    );
  }

  return response.json();
};

const auditoriaService = {
  fetchLogsPorTarefaId,
  fetchTodosLogs,
};

export default auditoriaService;