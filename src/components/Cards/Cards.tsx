import { useState } from 'react';
import CalendarIcon from '../../assets/calendar.png'
import Points from '../../assets/three.png'
import ModalOpc from '../ModalOpc/ModalOpc';
import User from '../../assets/user.png'


interface CardProps {
openModal: (tipo: 'Atualizar') => void;

}

export default function Cards(props: CardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const modalAction = () => {
    setIsOpen(state => !state)
  }


  return (
    <>
      <div className="relative max-w-md rounded-xl border bg-white p-4 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-start">
          <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
            Suporte
          </span>

          {/* Botão 3 bolinhas */}
          <button onClick={modalAction} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
            <img src={Points} alt="" className='h-6 w-6' />
          </button>
          <ModalOpc 
            openModal={props.openModal}
            condicaoModal={isOpen}
          />
        </div>

        {/* Conteúdo */}
        <h2 className="mt-3 text-lg font-semibold text-gray-900">
          Suporte cliente premium
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Implementar chat em tempo real para clientes premium
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            {/* Ícone calendário */}
            <img src={CalendarIcon} alt="" className='h-4 w-4' />

            <span>30/10/2024</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Minha</span>
            <img src={User} alt="" className="h-5 w-5" />
          </div>

        </div>
      </div>
    </>
  );
}
