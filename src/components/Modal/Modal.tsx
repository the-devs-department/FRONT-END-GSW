
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import cloudIcon from '../../assets/cloud.png'
import './Modal.css'
import CalendarIcon from '../../assets/calendar.png'
import type Tarefa from '../../Interface/TarefaInterface';
import type Anexo from '../../Interface/AnexoInterface';
import TarefaService from '../../Service/TarefaService';
import AnexoService from '../../Service/AnexoService';
import { useFeedback } from '../../context/FeedbackModalContext';

interface Usuario {
    id: string;
    nome: string;
}

interface ModalProps {
    tipoModal: 'Nova' | 'Atualizar' | null;
    condicaoModal: boolean;
    tarefaSelecionada: null | Tarefa;
    onTaskSuccess: () => void;
    closeModal: () => void;
}

export default function Modal(props: ModalProps) {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskTema, setTaskTema] = useState<string>("Desenvolvimento");
    const [taskFile, setTaskFile] = useState<File | null>(null);
    const [taskStatus, setTaskStatus] = useState("Não Iniciada");
    const [taskDataEntrega, setTaskDataEntrega] = useState("");
    const [membroSelecionado, setMembroSelecionado] = useState<string>("");
    const [fileError, setFileError] = useState<string>("");
    const [anexos, setAnexos] = useState<Anexo[]>([]);
    const [uploadingFile, setUploadingFile] = useState<boolean>(false);

    const [membrosEquipe, setMembrosEquipe] = useState<Usuario[]>([]);
    const condicao = taskStatus !== 'Não Iniciada' && props.tipoModal !== 'Nova';
    const { showFeedback } = useFeedback()

    useEffect(() => {
        if (props.condicaoModal) {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error("Token de autenticação não encontrado.");
                return;
            }
            fetch('http://localhost:8080/usuarios', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setMembrosEquipe(data);
                })
                .catch(error => {
                    console.error('Erro ao buscar membros da equipe:', error);
                });
        }
    }, [props.condicaoModal]);

    useEffect(() => {
        if (props.tarefaSelecionada?.id && props.tipoModal === 'Atualizar') {
            AnexoService.listarAnexosDaTarefa(props.tarefaSelecionada.id)
                .then(anexosList => {
                    console.log('Anexos recebidos:', anexosList);
                    setAnexos(anexosList);
                })
                .catch(error => {
                    console.error('Erro ao carregar anexos:', error);
                });
        } else {
            setAnexos([]);
        }
    }, [props.tarefaSelecionada]);

    const statusMap: Record<string, string> = {
        'Não Iniciada': 'nao_iniciada',
        'Em Andamento': 'em_andamento',
        'Concluída': 'concluida'
    };

    const montarTarefa = (): Tarefa => {
        return {
            id: props.tarefaSelecionada?.id,
            titulo: taskName,
            descricao: taskDescription,
            tema: taskTema,
            status: statusMap[taskStatus],
            dataEntrega: taskDataEntrega,
            responsavel: membroSelecionado,
            file: taskFile
        };
    };

    const resetForm = () => {
        setTaskName('');
        setTaskDescription('');
        setTaskTema('Desenvolvimento');
        setTaskStatus('Não Iniciada');
        setTaskDataEntrega('');
        setMembroSelecionado('');
        setTaskFile(null);
        setFileError('');
        setAnexos([]);
    };

    useEffect(() => {
        if (props.tarefaSelecionada) {
            setTaskName(props.tarefaSelecionada.titulo ?? "");
            setTaskDescription(props.tarefaSelecionada.descricao ?? "");
            setTaskTema(props.tarefaSelecionada.tema ?? "Desenvolvimento");
            setTaskFile(props.tarefaSelecionada.file ?? null);
            setTaskStatus(
                Object.keys(statusMap).find(
                    key => statusMap[key] === props.tarefaSelecionada?.status
                ) || "Não Iniciada"
            );
            setTaskDataEntrega(props.tarefaSelecionada.dataEntrega ?? "");
            setMembroSelecionado(props.tarefaSelecionada?.responsavel || "");

        } else {
            resetForm();
        }
    }, [props.tarefaSelecionada, membrosEquipe]);

    const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "video/mp4",
        "image/jpeg",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];

    const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files && ev.target.files[0]) {
            const selectedFile = ev.target.files[0];
            if (allowedTypes.includes(selectedFile.type)) {
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

    const handleUploadAnexo = async (file: File) => {
        if (!props.tarefaSelecionada?.id) {
            setFileError("Não é possível adicionar anexo sem uma tarefa salva");
            return;
        }

        setUploadingFile(true);
        setFileError("");

        try {
            const novoAnexo = await AnexoService.adicionarAnexoComUpload(props.tarefaSelecionada.id, file);
            console.log('Novo anexo criado:', novoAnexo);
            setAnexos(prev => [...prev, novoAnexo]);
            showFeedback('Sucesso', 'Anexo adicionado!', 'O arquivo foi anexado à tarefa com sucesso.');
        } catch (error) {
            console.error('Erro ao fazer upload do anexo:', error);
            setFileError("Erro ao fazer upload do arquivo");
            showFeedback('Erro', 'Erro ao adicionar anexo!', 'Houve um problema ao anexar o arquivo.');
        } finally {
            setUploadingFile(false);
        }
    };

    const handleRemoveAnexo = async (anexoId: string) => {
        if (!props.tarefaSelecionada?.id) return;

        try {
            await AnexoService.removerAnexo(props.tarefaSelecionada.id, anexoId);
            setAnexos(prev => prev.filter(anexo => anexo.id !== anexoId));
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


    const getTodayDateWithoutTime = (): Date => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    };

    const isDeliveryDateInPast = (deliveryDateString: string): boolean => {
        if (!deliveryDateString) return false;

        const deliveryDate = new Date(deliveryDateString);
        const today = getTodayDateWithoutTime();

        return deliveryDate.getTime() < today.getTime();
    };

    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (isDeliveryDateInPast(taskDataEntrega)) {
            let errorMainText = "Data de entrega inválida!";
            let errorSecondaryText = 'A data de entrega não pode ser anterior à data de hoje.';

            showFeedback('Erro', errorMainText, errorSecondaryText);
            return; // Interrompe o envio do formulário
        }
        const tarefa = montarTarefa();
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
            resetForm();
            showFeedback('Sucesso', successMainText, successSecondaryText)
            setTimeout(() => {
                props.onTaskSuccess();
            }, 5000);
        } catch (err) {
            console.error(err);
            let errorMainText = "Erro ao criar/modificar tarefa!"
            let errorSecondaryText = 'Houve um problema ao criar/modificar tarefa...'
            showFeedback('Erro', errorMainText, errorSecondaryText)
        }
    };

    const title = props.tipoModal === 'Nova' ? 'Nova Tarefa' : props.tipoModal === 'Atualizar' ? 'Atualizar Tarefa' : '';
    const buttonText = props.tipoModal === 'Nova' ? 'Criar Tarefa' : props.tipoModal === 'Atualizar' ? 'Atualizar Tarefa' : '';

    return (
        <div id="IdForms" className={props.condicaoModal ? 'modal-opened' : 'modal-closed'}>
            <div className='modal-header'>
                <span onClick={props.closeModal}>&times;</span>
            </div>
            <div className="modal-content">
                <h2>{title}</h2>
                <form className="form-task" onSubmit={handleSubmit}>
                    <div className="form-infos">
                        <div className='form-inputs'>
                            <label>Título *</label>
                            <input
                                className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-3"
                                type="text"
                                placeholder="Digite o título da tarefa"
                                required
                                value={taskName}
                                onChange={(ev) => setTaskName(ev.target.value)}
                            />
                        </div>
                        <div className='form-inputs'>
                            <label>Descrição *</label>
                            <textarea
                                className='rounded-md border-2 border-gray-100 bg-white w-full 
                                min-h-24 max-h-30 p-3 overflow-hidden resize-none'
                                placeholder="Descreva os detalhes da tarefa"
                                value={taskDescription}
                                required
                                onChange={(ev) => setTaskDescription(ev.target.value)}
                            >
                            </textarea>
                        </div>
                        <div className="flex gap-4 w-full max-[420px]:flex-col">
                            <div className='form-inputs w-1/2'>
                                <label>Tema *</label>
                                <select className="rounded-md border-2 border-gray-100 bg-white w-full h-10"
                                    value={taskTema}
                                    onChange={(ev) => setTaskTema(ev.target.value)}
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
                                    value={membroSelecionado}
                                    onChange={(ev) => setMembroSelecionado(ev.target.value)}
                                    required
                                    title="Selecione o membro responsável"
                                >
                                    <option value="" disabled>
                                        Selecione o membro
                                    </option>
                                    {membrosEquipe.map((membro, index) => (
                                        <option key={membro.id ?? index} value={membro.nome}>
                                            {membro.nome}
                                        </option>
                                    ))}
                                </select>
                                {membroSelecionado && (
                                    <div className="mt-2 text-sm text-gray-700">
                                        Membro selecionado: <b>{membroSelecionado}</b>
                                    </div>
                                )}
                            </div>
                            <div className='form-inputs'>
                                <label>Data de Entrega *</label>
                                <input
                                    className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-1"
                                    type="date"
                                    value={taskDataEntrega}
                                    onChange={(ev) => setTaskDataEntrega(ev.target.value)}
                                    src={CalendarIcon} alt=""
                                />
                            </div>
                        </div>

                        <div className={condicao ? 'flex gap-6 w-full items-center justify-between max-[420px]:flex-col' : 'flex gap-6 w-full items-center justify-end'}>
                            {condicao && (
                                <>
                                    <label htmlFor="file-upload" className={`flex gap-2 items-center justify-center cursor-pointer 
                                    border-[3px] border-gray-200 p-2 rounded-full max-[420px]:place-self-start ${uploadingFile ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
                                        disabled={uploadingFile}
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
                                    {taskFile.name}
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

                        {props.tipoModal === 'Atualizar' && anexos.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Anexos da Tarefa:</h4>
                                <div className="space-y-2">
                                    {anexos.map((anexo) => (
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

                        {uploadingFile && (
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
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
