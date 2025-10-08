import { useState } from 'react';
import CalendarIcon from '../../assets/calendar.png'
import Points from '../../assets/three.png'
import ModalOpc from '../ModalOpc/ModalOpc';
import User from '../../assets/user.png'
import type Tarefa from '../../Interface/TarefaInterface';


interface CardProps {
  responsavel?: {
    id: string;
    nome: string;
  };
  task: Tarefa
}


export default function Cards(props: CardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const modalAction = () => {
    setIsOpen(state => !state)
  }
  

  const [ano, mes, dia] = props.task.dataEntrega.split('-').map(Number);
  const dataEntrega = new Date(ano, mes - 1, dia);
  const dataEntregaFormatada = dataEntrega.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });


  return (
    <div className="relative w-full rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
          {props.task.tema}
        </span>
        <button onClick={modalAction} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
          <img src={Points} alt="" className='h-6 w-6' />
        </button>
      </div>
      <h2 className="mt-3 text-lg font-semibold text-gray-900">
        {props.task.titulo}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        {props.task.descricao}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <img src={CalendarIcon} alt="" className='h-4 w-4' />
          <span>{dataEntregaFormatada}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{props.task.responsavel}</span>
          <img src={User} alt="" className="h-5 w-5" />
        </div>
      </div>
      <ModalOpc
        condicaoModal={isOpen}
        tarefa={props.task}
      />
    </div>
  )
}