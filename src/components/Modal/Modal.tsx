import { useState, type ChangeEvent } from 'react';
import cloudIcon from '../../assets/cloud.png'
import './Modal.css'
import CalendarIcon from '../../assets/calendar.png'

interface ModalProps {
    tipoModal: 'Nova' | 'Atualizar';
    condicaoModal: boolean;
    closeModal: () => void;
}

export default function Modal(props: ModalProps) {
    const [option, setOption] = useState<string>("Não Iniciada") 

    const handleOptionChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        setOption(ev.target.value)
    }

    const title = props.tipoModal === 'Nova' ? 'Nova Tarefa' : 'Atualizar Tarefa';
    const buttonText = props.tipoModal === 'Nova' ? 'Criar Tarefa' : 'Salvar';

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
                                <input
                                    className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-2"
                                    type="text" placeholder="Nome do responsável"
                                />
                            </div>
                            <div className='form-inputs w-1/2'>
                                <label>Data de Entrega *</label>
                                <input
                                    className="rounded-md border-2 border-gray-100 bg-white w-full h-10 p-2"
                                    type="date"
                                />
                                <img src={CalendarIcon} alt="" />
                            </div>
                        </div>
                        <div className='flex gap-6 w-full items-center justify-between'>
                            <label htmlFor="file-upload" className='flex gap-2 items-center justify-center cursor-pointer 
                            border-[3px] border-gray-200 p-2 rounded-full'>
                                <div className=''>
                                    <img src={cloudIcon} alt="" className='h-6'/>
                                </div>
                                Anexar arquivo
                            </label>
                            <input type="file" id='file-upload' className='hidden'/>
                            <div className='flex gap-4'>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                                <p>Minha Tarefa</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 w-full mt-4">
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

