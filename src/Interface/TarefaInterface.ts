import type Anexo from './AnexoInterface';

export default interface Tarefa {
    id?: string;
    titulo: string;
    descricao: string
    tema: string
    status?: string
    file: File | null
    responsavel?: string
    dataCriacao?: string
    dataEntrega: string
    ativo?: boolean
    anexos?: Anexo[]
} 