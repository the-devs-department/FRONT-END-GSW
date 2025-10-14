import type Tarefa from "./TarefaInterface";

export default interface AuditoriaResponse {
  responsavel: ResponsavelAlteracaoDto;
  modificacao: ModificacaoLogDto;
  dataAlteracao: string;
  horaAlteracao: string;
}

export interface ResponsavelAlteracaoDto {
  id: string;
  email: string;
  nome?: string; 
}

export interface ModificacaoLogDto {
  categoria?: string; 
  descricao: string;  
  tarefaAntes?: Tarefa; 
  tarefaDepois?: Tarefa;
}