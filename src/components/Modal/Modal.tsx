import { useState, type ChangeEvent } from 'react';
import cloudIcon from '../../assets/cloud.png';
import './Modal.css';
import CalendarIcon from '../../assets/calendar.png'

const responsaveis = [
  { id: '', nome: 'Não atribuído' },
  { id: 'usr_1a2b3c', nome: 'Otávio' },
  { id: 'usr_4d5e6f', nome: 'Pedro Henrique Martins' },
  { id: 'usr_7g8h9i', nome: 'Tiago' },
  { id: 'usr_j1k2l3', nome: 'Issami' },
  { id: 'usr_m4n5o6', nome: 'Robert' }
];

interface ModalProps {
    tipoModal: 'Nova' | 'Atualizar' | null;
    condicaoModal: boolean;
    closeModal: () => void;
}

export default function Modal(props: ModalProps) {

    const [option, setOption] = useState<string>("Não Iniciada");
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>("");

    const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "video/mp4",
        "image/jpeg",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];

    const handleOptionChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        setOption(ev.target.value);
    }

    const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files && ev.target.files[0]) {
            const selectedFile = ev.target.files[0];
            if (allowedTypes.includes(selectedFile.type)) {
                setFile(selectedFile);
                setFileError("");
            } else {
                setFile(null);
                setFileError("Arquivo nao suportado");
            }
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFileError("");
    };

    const title =
        props.tipoModal === 'Nova'
            ? 'Nova Tarefa'
            : props.tipoModal === 'Atualizar'
                ? 'Atualizar Tarefa'
                : '';

    const buttonText =
        props.tipoModal === 'Nova'
            ? 'Criar Tarefa'
            : props.tipoModal === 'Atualizar'
                ? 'Salvar'
                : '';

    return (
        <div id="IdForms" className={props.condicaoModal ? 'modal-opened' : 'modal-closed'}>
            <div className='modal-header'>
                <span onClick={props.closeModal}>&times;</span>
            </div>
            <div className="modal-content">
                <h2>{title}</h2>
                <form className="form-task">
                    <div className="form-infos">
                        <div className='form-inputs'>
                            <label>Título *</label>
                            <input
                                className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-3"
                                type="text" placeholder="Digite o título da tarefa" />
                        </div>
                        <div className='form-inputs'>
                            <label>Descrição *</label>
                            <textarea
                                className='rounded-md border-2 border-gray-100 bg-white w-full 
                       min-h-24 max-h-30 p-3 overflow-hidden resize-none'
                                placeholder="Descreva os detalhes da tarefa">
                            </textarea>
                        </div>
                        <div className="flex gap-4 w-full">
                            <div className='form-inputs w-1/2'>
                                <label>Tema *</label>
                                <select className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-2">
                                    <option>Desenvolvimento</option>
                                    <option>Design</option>
                                    <option>Teste</option>
                                </select>
                            </div>
                            <div className='form-inputs w-1/2'>
                                <label>Status *</label>
                                <select className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-2"
                                    value={option}
                                    onChange={handleOptionChange}
                                >
                                    <option>Não iniciada</option>
                                    <option>Em andamento</option>
                                    <option>Concluída</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className='form-inputs w-1/2'>
                                <label>Responsável *</label>
                                <select
                                    className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-2"
                                >
                                    {responsaveis.map(membro => (
                                        <option key={membro.id} value={membro.id}>
                                            {membro.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-inputs w-1/2'>
                                <label>Data de Entrega *</label>
                                <input
                                    className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-2"
                                    type="date"
                                />
                            </div>
                        </div>

                        <div className='flex gap-6 w-full items-center justify-between'>
                            <label htmlFor="file-upload" className='flex gap-2 items-center justify-center cursor-pointer 
                            border-[3px] border-gray-200 p-2 rounded-full'>
                                <div>
                                    <img src={cloudIcon} alt="Anexar arquivo" className='h-6' />
                                </div>
                                Anexar arquivo
                            </label>
                            <input
                                type="file"
                                id='file-upload'
                                className='hidden'
                                accept=".pdf,.jpg,.png,.xlsx,.mp4,.docx"
                                onChange={handleFileChange}
                            />
                            <div className="flex items-center gap-2">
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
                        {file && !fileError && (
                            <div className="mt-4 p-2 border border-gray-200 rounded-md flex justify-between items-center text-sm">
                                <span className="text-gray-600 truncate pr-2">
                                    {file.name}
                                </span>
                                <div>
                                    <a
                                        href={URL.createObjectURL(file)}
                                        download={file.name}
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
    );
}