import type AuditoriaResponse from "../Interface/AuditoriaInsterface";
import UserService from "./UserService";

const API_BASE_URL = "http://localhost:8080";



const fetchLogsPorTarefaId = async (
  tarefaId: string
): Promise<AuditoriaResponse[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/logs/${tarefaId}`, {
      method: "GET",
      headers: UserService.getAuthHeaders(),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Erro ao buscar logs por tarefa:", text);
      throw new Error(`Erro na chamada à API: Status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em fetchLogsPorTarefaId:", error);
    throw error;
  }
};

const fetchTodosLogs = async (): Promise<AuditoriaResponse[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/logs`, {
      method: "GET",
      headers: UserService.getAuthHeaders(),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Erro da API ao buscar todos os logs:", text);
      throw new Error(`Erro na chamada à API: Status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em fetchTodosLogs:", error);
    throw error;
  }
};

const auditoriaService = {
  fetchLogsPorTarefaId,
  fetchTodosLogs,
};

export default auditoriaService;
  