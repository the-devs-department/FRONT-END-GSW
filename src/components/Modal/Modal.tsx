import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import cloudIcon from '../../assets/cloud.png'
import './Modal.css'
import type UsuarioResponsavel from '../../Interface/TarefaInterface';
import type Anexo from '../../Interface/AnexoInterface';
import UserService from '../../Service/UserService';
import { useFeedback } from '../../context/FeedbackModalContext';
import AnexoService from '../../Service/AnexoService';
import TarefaService from '../../Service/TarefaService';

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

interface Usuario {
  id?: string,
  nome: string,
  email: string,
  dataCadastro: string;
  isAtivo: boolean;
  tarefas: Tarefa[]
}

interface ModalProps {
  tipoModal: 'Nova' | 'Atualizar' | null;
  condicaoModal: boolean;
  tarefaSelecionada: null | Tarefa;
  onTaskSuccess: () => void;
  closeModal: () => void;
}

export default function Modal(props: ModalProps) {
  // Usuário
  const [team, setTeam] = useState<Usuario[]>([])
  const [emailMembroResponsavel, setEmailMembroResponsavel] = useState<string>('')
  const [nomeMembroResponsavel, setNomeMembroResponsavel] = useState<string>('')
  const [membroResponsavel, setMembroResponsavel] = useState<UsuarioResponsavel | null>(null)
  // Tarefa
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskTheme, setTaskTheme] = useState<string>("Desenvoldimento")
  const [taskStatus, setTaskStatus] = useState("Não iniciada")
  const [taskDueDate, setTaskDueDate] = useState("")
  const [taskAnexos, setTaskAnexos] = useState<Anexo[]>([])
  // Tratamento de erros e condições
  const [taskFile, setTaskFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>("")
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false)

  const modalCondition = taskStatus !== 'Não Iniciada' && props.tipoModal !== 'Nova'

  const { showFeedback } = useFeedback()

  const formatedTaskStatus: Record<string, string> = {
    'Não Iniciada': 'NAO_INICIADA',
    'Em Andamento': 'EM_ANDAMENTO',
    'Concluída': 'CONCLUIDA'
  }

  // Buscar usuários
  useEffect(() => {
    if (props.condicaoModal) {
      const userTokenAndId = UserService.getUserTokenAndId()
      const token = userTokenAndId.token
      if (!token) {
        console.error("Token de autenticação não encontado");
        return;
      }
      const fetchUsers = async () => {
        try {
          const DBUsers = await UserService.getUsers();
          setTeam(DBUsers)
        } catch (error) {
          console.error("Erro ao buscar usuários do banco de dados: ", error)
        }
      }
      fetchUsers();
    }
  }, [props.condicaoModal])

  // Montando a tarefa caso seja para atualizar
  useEffect(() => {
    if (props.tarefaSelecionada) {
      setTaskTitle(props.tarefaSelecionada.titulo ?? "");
      setTaskDesc(props.tarefaSelecionada.descricao ?? "");
      setTaskTheme(props.tarefaSelecionada.tema ?? "Desenvolvimento");
      setTaskFile(props.tarefaSelecionada.file ?? null);
      setTaskStatus(
        Object.keys(formatedTaskStatus).find(
          key => formatedTaskStatus[key] === props.tarefaSelecionada?.status
        ) || "Não Iniciada"
      );
      setTaskDueDate(props.tarefaSelecionada.dataEntrega ?? "");
      setNomeMembroResponsavel(props.tarefaSelecionada.responsavel?.nome ?? 'Não atribuida')
      setMembroResponsavel(props.tarefaSelecionada.responsavel ?? null)

    } else {
      resetForm();
    }
  }, [props.tarefaSelecionada, team]);

  // Tarefa - Resetar Formulário
  const resetForm = () => {
    setTaskTitle('');
    setTaskDesc('');
    setTaskTheme('Desenvolvimento');
    setTaskStatus('Não Iniciada');
    setTaskDueDate('');
    setEmailMembroResponsavel('')
    setNomeMembroResponsavel('')
    setTaskFile(null)
    setFileError('')
    setTaskAnexos([])
  }

  // Anexos
  const AllowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "video/mp4",
    "image/jpeg",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ]

  useEffect(() => {
    if (props.tarefaSelecionada?.id && props.tipoModal === 'Atualizar') {
      AnexoService.listarAnexosDaTarefa(props.tarefaSelecionada.id)
        .then(listaAnexos => {
          setTaskAnexos(listaAnexos)
        }).catch(error => {
          console.error("Erro ao carregar anexos da tarefa: ", error)
        })
    }
  })

  const handleUploadAnexo = async (file: File) => {
    if (!props.tarefaSelecionada?.id) {
      setFileError("Não é possível adicionar anexo sem uma tarefa salva");
      return;
    }
    setIsUploadingFile(true);
    setFileError("");

    try {
      const novoAnexo = await AnexoService.adicionarAnexoComUpload(props.tarefaSelecionada.id, file);
      console.log('Novo anexo criado:', novoAnexo);
      setTaskAnexos(prev => [...prev, novoAnexo]);
      showFeedback('Sucesso', 'Anexo adicionado!', 'O arquivo foi anexado à tarefa com sucesso.');
    } catch (error) {
      console.error('Erro ao fazer upload do anexo:', error);
      setFileError("Erro ao fazer upload do arquivo");
      showFeedback('Erro', 'Erro ao adicionar anexo!', 'Houve um problema ao anexar o arquivo.');
    } finally {
      setIsUploadingFile(false);
    }
  };
  
  const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      const selectedFile = ev.target.files[0];
      if (AllowedTypes.includes(selectedFile.type)) {
        if (props.tarefaSelecionada?.id && props.tipoModal === 'Atualizar') {
          handleUploadAnexo(selectedFile);
        } else {
          setTaskFile(selectedFile);
        }
        setFileError("");
      } else {
        setTaskFile(null);
        setFileError("Arquivo não suportado");
      }
    }
    ev.target.value = '';
  };

  const handleRemoveFile = () => {
    setTaskFile(null);
    setFileError("");
  };

  const handleRemoveAnexo = async (anexoId: string) => {
    if (!props.tarefaSelecionada?.id) return;
    try {
      await AnexoService.removerAnexo(props.tarefaSelecionada.id, anexoId);
      setTaskAnexos(prev => prev.filter(anexo => anexo.id !== anexoId));
      showFeedback('Sucesso', 'Anexo removido!', 'O arquivo foi removido da tarefa.');
    } catch (error) {
      console.error('Erro ao remover anexo:', error);
      showFeedback('Erro', 'Erro ao remover anexo!', 'Houve um problema ao remover o arquivo.');
    }
  };

  const handleDownloadAnexo = async (anexo: Anexo) => {
    if (!props.tarefaSelecionada?.id) return;
    try {
      const blob = await AnexoService.baixarArquivoAnexo(props.tarefaSelecionada.id, anexo.id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = anexo.nome;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar anexo:', error);
      showFeedback('Erro', 'Erro ao baixar anexo!', 'Houve um problema ao baixar o arquivo.');
    }
  };
  
  const fetchMembroResponsavel = async (email: string) => {
    try {
      const taskResponsible = await UserService.assignedUser(email);
      return taskResponsible
    } catch (error) {
      console.error("Erro ao buscar usuário do banco de dados: ", error)
    }
  }

  const defineResponsibleMember = (ev: ChangeEvent<HTMLSelectElement>) => {
    const memberData = ev.target.value
    setNomeMembroResponsavel(memberData.split(',')[0])
    setEmailMembroResponsavel(memberData.split(',')[1])  
  }

  const buildTask = (membroResponsavel: UsuarioResponsavel | undefined): Tarefa => {
    return {
      id: props.tarefaSelecionada?.id,
      titulo: taskTitle,
      descricao: taskDesc,
      tema: taskTheme,
      status: formatedTaskStatus[taskStatus],
      dataEntrega: taskDueDate,
      responsavel: membroResponsavel,
      file: taskFile
    }
  }

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (TarefaService.verifyDate(taskDueDate)) {
      let errorMainText = "Data de entrega inválida!";
      let errorSecondaryText = 'A data de entrega não pode ser anterior à data de hoje.';

      showFeedback('Erro', errorMainText, errorSecondaryText);
      return;
    }

    let memberToSend: UsuarioResponsavel | undefined = undefined;
    if (emailMembroResponsavel) {
        try {
          memberToSend = await fetchMembroResponsavel(emailMembroResponsavel)
        } catch(error){
          console.error(`Erro ao buscar usuário: ${error}`)
        }
    } else {
        if (membroResponsavel) {
            memberToSend = membroResponsavel
            console.log(memberToSend)
        }  
    }
    const tarefa = buildTask(memberToSend)
    let successMainText: string;
    let successSecondaryText: string

    try {
      if (props.tipoModal === 'Nova') {
        const novaTarefa = await TarefaService.criarTarefa(tarefa);
        if (taskFile && novaTarefa.id) {
          try {
            await AnexoService.adicionarAnexoComUpload(novaTarefa.id, taskFile);
          } catch (anexoError) {
            console.error('Erro ao fazer upload do anexo:', anexoError);
            showFeedback('Erro', 'Tarefa criada, mas erro no anexo', 'A tarefa foi criada mas houve problema ao anexar o arquivo.');
          }
        }

        successMainText = "Tarefa criada com sucesso!"
        successSecondaryText = "Atualizando lista de tarefas"
      } else {
        await TarefaService.atualizarTarefa(tarefa);
        successMainText = "Tarefa atualizada com sucesso!"
        successSecondaryText = "Atualizando lista de tarefas"
      }
      props.closeModal();
      showFeedback('Sucesso', successMainText, successSecondaryText)
      setTimeout(() => {
        props.onTaskSuccess();
      }, 2500);
    } catch (err) {
      console.error(err);
      let errorMainText = "Erro ao criar/modificar tarefa!"
      let errorSecondaryText = 'Houve um problema ao criar/modificar tarefa...'
      showFeedback('Erro', errorMainText, errorSecondaryText)
    }
  };

  const modalTitle = props.tipoModal === 'Nova' ? 'Nova Tarefa' : 'Atualizar Tarefa';
  const modalButtonText = props.tipoModal === 'Nova' ? 'Criar Tarefa' : props.tipoModal === 'Atualizar' ? 'Atualizar Tarefa' : '';
  return (
    <div id="IdForms" className={props.condicaoModal ? 'modal-opened' : 'modal-closed'}>
      <div className='modal-header'>
        <span onClick={props.closeModal}>&times;</span>
      </div>
      <div className="modal-content">
        <h2>{modalTitle}</h2>
        <form className="form-task" onSubmit={handleSubmit}>
          <div className="form-infos">
            <div className='form-inputs'>
              <label>Título *</label>
              <input
                className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-3"
                type="text"
                placeholder="Digite o título da tarefa"
                required
                value={taskTitle}
                onChange={(ev) => setTaskTitle(ev.target.value)}
              />
            </div>
            <div className='form-inputs'>
              <label>Descrição *</label>
              <textarea
                className='rounded-md border-2 border-gray-100 bg-white w-full 
                                min-h-24 max-h-30 p-3 overflow-hidden resize-none'
                placeholder="Descreva os detalhes da tarefa"
                value={taskDesc}
                required
                onChange={(ev) => setTaskDesc(ev.target.value)}
              >
              </textarea>
            </div>
            <div className="flex gap-4 w-full max-[420px]:flex-col">
              <div className='form-inputs w-1/2'>
                <label>Tema *</label>
                <select className="rounded-md border-2 border-gray-100 bg-white w-full h-10"
                  value={taskTheme}
                  onChange={(ev) => setTaskTheme(ev.target.value)}
                >
                  <option>Desenvolvimento</option>
                  <option>Design</option>
                  <option>Teste</option>
                </select>
              </div>
              <div className='form-inputs w-1/2'>
                <label>Status *</label>
                <select className="rounded-md border-2 border-gray-100 bg-white w-full h-10"
                  value={taskStatus}
                  onChange={(ev) => setTaskStatus(ev.target.value)}
                >
                  <option value="Não Iniciada">Não Iniciada</option>
                  <option value="Em Andamento">Em andamento</option>
                  <option value="Concluída">Concluída</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 w-full max-[420px]:flex-col">
              <div className='form-inputs'>
                <label htmlFor="membro-select">Responsável *</label>
                <select
                  id="membro-select"
                  className="rounded-md border-2 border-gray-100 bg-white w-full h-10"
                  value={nomeMembroResponsavel}
                  onChange={(ev) => defineResponsibleMember(ev)}
                  required
                  title="Selecione o membro responsável"
                >
                  <option value="" disabled>
                    Selecione o membro
                  </option>
                  {team.map((membro, index) => (
                    <option key={membro.id ?? index} value={[membro.nome, membro.email]}>
                      {membro.nome}
                    </option>
                  ))}
                </select>
                {nomeMembroResponsavel && (
                    <div className="mt-2 text-sm text-gray-700">
                        Membro selecionado: <b>{nomeMembroResponsavel}</b>
                    </div>
                )}
              </div>
              <div className='form-inputs'>
                <label>Data de Entrega *</label>
                <input
                  className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-1"
                  type="date"
                  value={taskDueDate}
                  onChange={(ev) => setTaskDueDate(ev.target.value)}
                />
              </div>
            </div>

            <div className={modalCondition ? 'flex gap-6 w-full items-center justify-between max-[420px]:flex-col' : 'flex gap-6 w-full items-center justify-end'}>
              {modalCondition && (
                <>
                  <label htmlFor="file-upload" className='flex gap-2 items-center justify-center cursor-pointer 
                                    border-[3px] border-gray-200 p-2 rounded-full max-[420px]:place-self-start'>
                    <div>
                      <img src={cloudIcon} alt="" className='h-6' />
                    </div>
                    {props.tipoModal === 'Atualizar' ? 'Adicionar anexo' : 'Anexar arquivo'}
                  </label>
                  <input
                    type="file"
                    id='file-upload'
                    className='hidden'
                    accept=".pdf,.jpg,.png,.xlsx,.mp4,.docx"
                    onChange={handleFileChange}
                    disabled={isUploadingFile}
                  />
                </>
              )}
              <div className="flex items-center gap-2 max-[420px]:place-self-end">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
                <p>Minha Tarefa</p>
              </div>
            </div>

            {fileError && (
              <div className="mt-4 p-2 border border-red-200 rounded-md text-red-600 text-sm">
                {fileError}
              </div>
            )}
            {taskFile && !fileError && (
              <div className="mt-4 p-2 border border-gray-200 rounded-md flex justify-between items-center text-sm">
                <span className="text-gray-600 truncate pr-2">
                  {0}
                </span>
                <div>
                  <a
                    href={URL.createObjectURL(taskFile)}
                    download={taskFile.name}
                    className="text-blue-600 hover:underline mr-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visualizar
                  </a>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-500 font-bold"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
            {props.tipoModal === 'Atualizar' && taskAnexos.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Anexos da Tarefa:</h4>
                    <div className="space-y-2">
                        {taskAnexos.map((anexo) => (
                            <div key={anexo.id} className="p-2 border border-gray-200 rounded-md flex justify-between items-center text-sm">
                                <div className="flex flex-col">
                                    <span className="text-gray-600 truncate pr-2">
                                        {anexo.nome}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {(anexo.tamanho / 1024 / 1024).toFixed(2)} MB - {
                                            typeof anexo.dataUpload === 'string'
                                                ? new Date(anexo.dataUpload).toLocaleDateString()
                                                : (anexo.dataUpload as any)?.data
                                                    ? new Date((anexo.dataUpload as any).data).toLocaleDateString()
                                                    : 'Data não disponível'
                                        }
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleDownloadAnexo(anexo)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Baixar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveAnexo(anexo.id)}
                                        className="text-red-500 font-bold"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isUploadingFile && (
                <div className="mt-4 p-2 border border-blue-200 rounded-md text-blue-600 text-sm">
                    Fazendo upload do arquivo...
                </div>
            )}

            <div className="flex justify-end gap-4 w-full mt-6 mb-4">
              <button
                type="button"
                onClick={props.closeModal}
                className="px-4 py-2 border rounded-md">
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 text-white rounded-md">
                {modalButtonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}