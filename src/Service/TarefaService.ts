import type Tarefa from "../Interface/TarefaInterface";
import UserService from "./UserService";

const safeResponseHandler = async (response: Response) => {
    if (!response.ok) {
        throw new Error(`Erro na chamada à API: Status ${response.status}`);
    }
    const responseBodyText = await response.text();

    return responseBodyText ? JSON.parse(responseBodyText) : [];
};

const deleteTarefa = async (id: string) => {
    const response = await fetch(`http://localhost:8080/tarefas/excluir/${id}`, {
        method: "DELETE",
        headers: UserService.getAuthHeaders()
    });
    if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
};

const criarTarefa = async (tarefa: Tarefa) => {
    const response = await fetch('http://localhost:8080/tarefas/criar', {
        method: 'POST',
        headers: UserService.getAuthHeaders(),
        body: JSON.stringify(tarefa),
    });
    if (!response.ok) throw new Error('Erro ao criar tarefa');
    return response.json();
};

const atualizarTarefa = async (tarefa: Tarefa) => {
    if (!tarefa.id) throw new Error('ID da tarefa é obrigatório para atualização');
    const response = await fetch(`http://localhost:8080/tarefas/editar/${tarefa.id}`, {
        method: 'PUT',
        headers: UserService.getAuthHeaders(),
        body: JSON.stringify(tarefa),
    });
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
    return response.json();
};

const fetchTarefas = async () => {
    const response = await fetch('http://localhost:8080/tarefas', {
        method: 'GET',
        headers: UserService.getAuthHeaders()
    });
    return safeResponseHandler(response);
};

    const fetchTarefasPorResponsavel = async (responsavelId: string) => {
    const url = `http://localhost:8080/tarefas?responsavel=${encodeURIComponent(responsavelId)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: UserService.getAuthHeaders()
    });
    return safeResponseHandler(response);
};

const TarefaService = {
    criarTarefa,
    atualizarTarefa,
    fetchTarefas,
    deleteTarefa,
    fetchTarefasPorResponsavel,
};

export default TarefaService;