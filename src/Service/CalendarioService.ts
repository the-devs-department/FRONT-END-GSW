import UserService from "./UserService";
import type Tarefa from "../Interface/TarefaInterface";

const safeResponseHandler = async (response: Response) => {
    if (!response.ok) {
        throw new Error(`Erro na chamada à API: Status ${response.status}`);
    }
    const responseBodyText = await response.text();

    return responseBodyText ? JSON.parse(responseBodyText) : [];
};

const listarPorUsuario = async (usuarioId: string): Promise<Tarefa[]> => {
    const response = await fetch(`http://localhost:8087/calendario/usuario/${usuarioId}`, {
        method: 'GET',
        headers: UserService.getAuthHeaders()
    });
    return safeResponseHandler(response);
};

const tarefasDoDia = async (usuarioId: string, dia: string): Promise<Tarefa[]> => {
    const response = await fetch(`http://localhost:8087/calendario/usuario/${usuarioId}/data/${dia}`, {
        method: 'GET',
        headers: UserService.getAuthHeaders()
    });
    return safeResponseHandler(response);
};

const CalendarioService = {
    listarPorUsuario,
    tarefasDoDia
};

export default CalendarioService;