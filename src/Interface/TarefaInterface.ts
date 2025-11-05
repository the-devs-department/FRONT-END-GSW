import type Anexo from './AnexoInterface';

export default interface UsuarioResponsavel {
    id?: string,
    nome: string,
    email: string
}

export default interface Tarefa {
  id?: string;
  titulo: string;
  descricao: string;
  tema: string;
  status?: string;
  responsavel: UsuarioResponsavel | undefined;
  dataCriacao?: string;
  dataEntrega: string;
  ativo?: boolean;
  anexo?: Anexo[];
}