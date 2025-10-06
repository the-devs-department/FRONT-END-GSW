import type Anexo from '../Interface/AnexoInterface';
import type { AnexoDto } from '../Interface/dto/AnexoDtoInterface';

class AnexoService {
    private getAuthToken(): string {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }
        return token;
    }

    private getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.getAuthToken()}`,
        };
    }

    async listarAnexosDaTarefa(tarefaId: string): Promise<Anexo[]> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeaders(),
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar anexos da tarefa');
        }

        return await response.json();
    }

    async buscarAnexoPorId(tarefaId: string, anexoId: string): Promise<Anexo> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/${anexoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeaders(),
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar anexo');
        }

        return await response.json();
    }

    async adicionarAnexoComUpload(tarefaId: string, arquivo: File): Promise<Anexo> {
        const formData = new FormData();
        formData.append('arquivo', arquivo);

        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/upload`, {
            method: 'POST',
            headers: {
                ...this.getAuthHeaders(),
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer upload do anexo');
        }

        return await response.json();
    }

    async adicionarAnexo(tarefaId: string, anexoDto: AnexoDto): Promise<Anexo> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeaders(),
            },
            body: JSON.stringify(anexoDto),
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar anexo');
        }

        return await response.json();
    }

    async atualizarAnexo(tarefaId: string, anexoId: string, anexoDto: AnexoDto): Promise<Anexo> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/${anexoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeaders(),
            },
            body: JSON.stringify(anexoDto),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar anexo');
        }

        return await response.json();
    }

    async removerAnexo(tarefaId: string, anexoId: string): Promise<void> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/${anexoId}`, {
            method: 'DELETE',
            headers: {
                ...this.getAuthHeaders(),
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao remover anexo');
        }
    }

    async obterUrlDownload(tarefaId: string, anexoId: string): Promise<string> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/${anexoId}/download`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeaders(),
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao obter URL de download');
        }

        return await response.text();
    }

    async baixarArquivoAnexo(tarefaId: string, anexoId: string): Promise<Blob> {
        const response = await fetch(`http://localhost:8080/tarefas/${tarefaId}/anexos/${anexoId}/arquivo/download`, {
            method: 'GET',
            headers: {
                ...this.getAuthHeaders(),
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