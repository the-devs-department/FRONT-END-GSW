import type Tarefa from "./TarefaInterface";

export default interface AuditoriaResponse {
  tarefa : Tarefa;
  responsavel: ResponsavelAlteracaoDto;
  modificacao: ModificacaoLogDto;
  dataAlteracao: string;
  horaAlteracao: string;
}

export interface ResponsavelAlteracaoDto {
  id: string;
  emailResponsavel: string;
  nome?: string; 
}

export interface ModificacaoLogDto {
  categoria?: string; 
  modificacao: string;
}