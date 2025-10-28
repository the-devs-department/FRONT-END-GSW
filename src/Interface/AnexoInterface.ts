import type { DataHoraDto } from './dto/DataHoraDtoInterface';

export default interface Anexo {
    id: string;
    nome: string;
    tamanho: number;
    tipo: string;
    url: string;
    dataUpload: string | DataHoraDto;
    usuarioId: string;
}