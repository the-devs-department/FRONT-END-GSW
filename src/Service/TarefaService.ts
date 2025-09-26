import type Tarefa from "../Interface/TarefaInterface";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyN2UyYmRjMi1iNDE5LTQ1MDgtOTliMC1jMjBlZGUwYjA3MWMiLCJzdWIiOiI2OGM5N2MyOWJmN2FjZjZlMTY0MzVhMzYiLCJpYXQiOjE3NTg4ODMyMTEsImV4cCI6MTc1ODkxOTIxMSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwicm9sZXMiOltdfQ.JbUZp9N_a642bU_8hW2eGoIMZYleMEi5P6ce39eRK9k";

const deleteTarefa = async (id: string) => {
    const response = await fetch(`http://localhost:8080/tarefas/excluir/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`)
    }
    if (response.status === 204) {
        return
    }
    
    try {
        const data = await response.json();
        return data;
    }  catch (e) {
        console.warn("Successful response but failed to parse JSON body:", e);
        return; 
    }

}

const criarTarefa = async (tarefa: Tarefa) => {
    const response = await fetch('http://localhost:8080/tarefas/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(tarefa),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar tarefa');
    }

    const data = await response.json();
    return data;

};

const atualizarTarefa = async (tarefa: Tarefa) => {
    if (!tarefa.id) {
        throw new Error('ID da tarefa é obrigatório para atualização');
    }

    const response = await fetch(`http://localhost:8080/tarefas/editar/${tarefa.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(tarefa),
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar tarefa');
    }

    const data = await response.json();
    return data;
};

const fetchTarefas = async () => {
    const response = await fetch('http://localhost:8080/tarefas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
    }
    const data = await response.json();
    return data;
}

export default {
    criarTarefa,
    atualizarTarefa,
    fetchTarefas,
    deleteTarefa
};

