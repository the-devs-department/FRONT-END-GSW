import type Anexo from './AnexoInterface';

export default interface UsuarioResponsavel {
    id?: string,
    nome: string,
    email: string
}

interface Tarefa {
  id?: string;
  titulo: string;
  descricao: string;
  tema: string;
  status?: string;
  file: File | null;
  responsavel: UsuarioResponsavel | undefined;
  dataCriacao?: string;
  dataEntrega: string;
  ativo?: boolean;
  anexo?: Anexo[];
}