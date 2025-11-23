import { Link, useNavigate } from 'react-router-dom'
import FormHeader from '../components/FormHeader/FormHeader'
import { useState } from 'react'
import FeedbackModal from '../components/FeedbackModal/FeedbackModal'
import { useFeedback } from '../context/FeedbackModalContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigate()
  const { showFeedback } = useFeedback()

  const loginHandler = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    try {
      const response = await fetch("http://localhost:8086/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          senha: password
        })
      })

      if (!response.ok) {
        const dataError = await response.json()
        throw new Error(dataError.message || "E-mail ou senha incorretos")
      }

      const data = await response.json()
      const token = data.token
      const userId = data.idUsuario
      const authData = {
        token: token,
        userId: userId
      }
      localStorage.setItem("authData", JSON.stringify(authData))

      showFeedback(
        'Sucesso',
        'Login realizado com sucesso!',
        'Aguarde, você está sendo redirecionado.'
      )

      setTimeout(() => {
        navigation('/home')
      }, 2500)

    } catch (error) {
      showFeedback(
        'Erro',
        'Erro ao realizar login!',
        'Verifique os dados inseridos, ou a conta não existe.'
      )
    }
  }

  return (
    <>
        <FeedbackModal/>
        <div className="w-full h-dvh flex flex-col items-center justify-center gap-14">
          <FormHeader
            description="Entre na sua conta para gerenciar suas tarefas."
          />
          <form
            onSubmit={loginHandler}
            className='w-[35rem] h-auto flex flex-col items-center justify-center pb-8 pt-8 p-4 border-2 rounded-md gap-6 max-sm:w-[95%]'>
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
                onChange={(ev) => setEmail(ev.target.value)}
                type="email" id='email' placeholder='seu@email.com' value={email} required />
            </div>
            <div className='flex flex-col w-[95%] items-center justify-center gap-4'>
              <label htmlFor="password" className='text-black font-bold font-[Inter] place-self-start'>
                Senha
              </label>
              <input
                className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
                onChange={(ev) => setPassword(ev.target.value)}
                type="password" id='password' placeholder='Sua senha' value={password} required />
            </div>
            <button
              type='submit'
              className='bg-[#344256] hover:bg-[#243042] 
                flex items-center justify-center w-[95%] rounded-lg h-10 text-white font-bold'
            >
              Entrar
            </button>
            <div className='flex w-full items-center justify-center gap-2'>
              <p className='text-[#7B899D]'>Não tem uma conta?</p>
              <Link to={'/cadastro'} className='text-[#344256] font-bold'>
                Cadastre-se
              </Link>
            </div>
            <div className='flex w-full items-center justify-center gap-2'>
              <Link to={'/recuperacao-senha'} className='text-[#344256] font-bold'>
                Esqueci minha senha
              </Link>
            </div>
          </form>
        </div>
    </>
  )
}