import { Link } from 'react-router-dom'
import FormHeader from '../components/FormHeader/FormHeader'

export default function Login() {
  return(
    <>
      <div className="w-full h-dvh flex flex-col items-center justify-center gap-14">
          <FormHeader
            description="Entre na sua conta para gerenciar suas tarefas."
          />
          <form className='w-[35rem] h-auto flex flex-col items-center justify-center pb-8 pt-8 p-4 border-2 rounded-md gap-6'>
            <div className='w-full h-auto flex flex-col gap-2 items-center justify-center'>
              <h1 className='text-3xl text-[#22222A] font-bold'>Entrar</h1>
              <p className='text-[#7B899D]'>Digite seu email e senha para acessar sua conta</p>
            </div>
            <div className='flex flex-col w-[95%] items-center justify-center gap-4'>
              <label htmlFor="email" className='text-black font-bold font-[Inter] place-self-start'>
                Email
              </label>
              <input 
                className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
                type="email" id='email'placeholder='seu@email.com' required/>
            </div>
            <div className='flex flex-col w-[95%] items-center justify-center gap-4'>
              <label htmlFor="password" className='text-black font-bold font-[Inter] place-self-start'>
                Senha
              </label>
              <input 
                className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
                type="password" id='password'placeholder='Sua senha' required/>
            </div>
            <Link to={'/home'} 
                  className='bg-[#344256] hover:bg-[#243042] 
                    flex items-center justify-center w-[95%] rounded-lg h-10 text-white font-bold'
            >
              Entrar
            </Link>
            <div className='flex w-full items-center justify-center gap-2'>
              <p className='text-[#7B899D]'>Não tem uma conta?</p>
              <Link to={'/cadastro'} className='text-[#344256] font-bold'>
                Cadastre-se
              </Link>
            </div>
          </form>
      </div>
    </>
  )
}