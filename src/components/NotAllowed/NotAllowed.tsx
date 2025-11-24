import { Link } from 'react-router-dom'
import WarningIcon from '../../assets/Warning.png'

export default function NotAllowed() {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center">
          <img src={WarningIcon} alt="" className='h-60' />
          <p className='text-gray-700 text-2xl font-bold'>Apenas administradores podem visualizar esta página!</p>
          <Link to='/home' className='bg-gray-800 p-2 rounded text-xl hover:bg-gray-950'>
            &#8592; Voltar
          </Link>
      </div>
    </>
  )
}