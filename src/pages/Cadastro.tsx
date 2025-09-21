import { Link } from "react-router-dom"
import FormHeader from "../components/FormHeader/FormHeader"

export default function Cadastro() {
  return  (
    <>
      <div className="w-full h-dvh flex flex-col items-center justify-center gap-4">
          <FormHeader
            description="Crie sua conta para começar a gerenciar suas tarefas"
          />
          <form className='w-[35rem] h-auto flex flex-col items-center justify-center pb-8 pt-8 p-4 border-2 rounded-md gap-4'>
            <div className='w-full h-auto flex flex-col gap-2 items-center justify-center'>
              <h1 className='text-3xl text-[#22222A] font-bold'>Cadastrar-se</h1>
              <p className='text-[#7B899D]'>Crie sua conta para acessar o TaskManager</p>
            </div>
            <div className='flex flex-col w-[95%] items-center justify-center gap-2'>
              <label htmlFor="name" className='text-black font-bold font-[Inter] place-self-start'>
                Nome completo
              </label>
              <input 
                className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
                type="text" id='name'placeholder='Seu nome completo' required/>
            </div>
            <div className='flex flex-col w-[95%] items-center justify-center gap-2'>
              <label htmlFor="email" className='text-black font-bold font-[Inter] place-self-start'>
                Email
              </label>
              <input 
                className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
                type="email" id='email'placeholder='seu@email.com' required/>
            </div>
            <div className='flex flex-col w-[95%] items-center justify-center gap-2'>
              <label htmlFor="password" className='text-black font-bold font-[Inter] place-self-start'>
                Senha
              </label>
              <input 
                className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
                type="password" id='password'placeholder='Sua senha' required/>
            </div>
            <div className='flex flex-col w-[95%] items-center justify-center gap-2'>
              <label htmlFor="confirmPassword" className='text-black font-bold font-[Inter] place-self-start'>
                Confirmar senha
              </label>
              <input 
                className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
                type="password" id='confirmPassword'placeholder='Confirme sua senha' required/>
            </div>
            <button className='bg-[#344256] hover:bg-[#243042]
              w-[95%] rounded-lg h-10 text-white font-bold p'>
              Cadastrar-se
            </button>
            <div className='flex w-full items-center justify-center gap-2'>
              <p className='text-[#7B899D]'>Já tem uma conta?</p>
              <Link to={'/login'} className='text-[#344256] font-bold'>
                Entrar
              </Link>
            </div>
          </form>
      </div>
    </>
  )
}