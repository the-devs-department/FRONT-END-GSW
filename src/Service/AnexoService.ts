import type Anexo from '../Interface/AnexoInterface';
import type { AnexoDto } from '../Interface/dto/AnexoDtoInterface';
import UserService from './UserService';

class AnexoService {

    async listarAnexosDaTarefa(tarefaId: string): Promise<Anexo[]> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos`, {
            method: 'GET',
            headers: UserService.getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar anexos da tarefa');
        }

        return await response.json();
    }

    async buscarAnexoPorId(tarefaId: string, anexoId: string): Promise<Anexo> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/${anexoId}`, {
            method: 'GET',
            headers: UserService.getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar anexo');
        }

        return await response.json();
    }

    async adicionarAnexoComUpload(tarefaId: string, arquivo: File): Promise<Anexo> {
        const formData = new FormData();
        formData.append('arquivo', arquivo);

        const userData = UserService.getUserTokenAndId();
        const token = userData.token;
        if (!token) {
            throw new Error("Token de autenticação não encontrado.");
        }

        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer upload do anexo');
        }

        return await response.json();
    }

    async atualizarAnexo(tarefaId: string, anexoId: string, anexoDto: AnexoDto): Promise<Anexo> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/${anexoId}`, {
            method: 'PUT',
            headers: UserService.getAuthHeaders(),
            body: JSON.stringify(anexoDto),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar anexo');
        }

        return await response.json();
    }

    async removerAnexo(tarefaId: string, anexoId: string): Promise<void> {
        const userData = UserService.getUserTokenAndId();
        const token = userData.token;
        if (!token) {
            throw new Error("Token de autenticação não encontrado.");
        }

        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/${anexoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao remover anexo');
        }
    }

    async obterUrlDownload(tarefaId: string, anexoId: string): Promise<string> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/${anexoId}/download`, {
            method: 'GET',
            headers: UserService.getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Erro ao obter URL de download');
        }

        return await response.text();
    }

    async baixarArquivoAnexo(tarefaId: string, anexoId: string): Promise<Blob> {
        const userData = UserService.getUserTokenAndId();
        const token = userData.token;
        if (!token) {
            throw new Error("Token de autenticação não encontrado.");
        }

        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/${anexoId}/arquivo/download`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao baixar arquivo do anexo');
        }

        return await response.blob();
    }

    async podeExcluirAnexo(tarefaId: string, anexoId: string, usuarioAtualId: string, criadorTarefaId: string): Promise<boolean> {
        try {
            const anexo = await this.buscarAnexoPorId(tarefaId, anexoId);
    
            return anexo.usuarioId === usuarioAtualId || criadorTarefaId === usuarioAtualId;
        } catch (error) {
            console.error('Erro ao verificar permissões:', error);
            return false;
        }
    }
}

export default new AnexoService();