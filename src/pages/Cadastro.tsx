import { Link, useNavigate } from "react-router-dom"
import FormHeader from "../components/FormHeader/FormHeader"
import successIcon from '../assets/Success.png'
import errorIcon from '../assets/Error.png'
import FeedbackModal from '../components/FeedbackModal/FeedbackModal'
import React, { useState } from "react"

export default function Cadastro() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [feedback, setFeedback] = useState({ shown: false, type: '', mainMessage: '', secondMessage: '', icon: '' })
  const [err, setErr] = useState('')
  const navigation = useNavigate()

  const createUser = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (password !== confirmPassword) {
      setErr("As senhas não se conferem")
      return
    } else {
      setErr('')
      try {
        const response = await fetch('http://localhost:8080/usuarios/criar', {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            nome,
            email,
            senha: password
          })
        })

        if (!response.ok) {
          const dataError = await response.json()
          throw new Error(dataError.message || 'Erro ao realizar o cadastro de um novo usuário')
        }

        const data = await response.json()
        console.log("Usuário cadastrado com sucesso", data)
        setFeedback({
          shown: true,
          type: 'Sucesso',
          mainMessage: 'Cadastro realizado com sucesso!',
          secondMessage: 'Redirecionando para o Login',
          icon: successIcon
        })

        setTimeout(() => {
          setFeedback({
            shown: false,
            type: '',
            mainMessage: '',
            secondMessage: '',
            icon: ''
          })
          navigation('/login')
        }, 5000)


      } catch (error: any) {
        console.error('Falha no cadastro', error)
        setErr(error.message || "Ocorreu um erro. Tente novamente")
        setFeedback({
          shown: true,
          type: 'Erro',
          mainMessage: 'Erro ao realizar cadastro!',
          secondMessage: err,
          icon: errorIcon
        })
        setTimeout(() => {
          setFeedback({
            shown: false,
            type: '',
            mainMessage: '',
            secondMessage: '',
            icon: ''
          })
        }, 5000)
        console.log(err)
      }

    }

  }

  return (
    <>
      <FeedbackModal
        isModalShown={feedback.shown}
        FeedbackKind={feedback.type}
        FeedbackImage={feedback.icon}
        FeedbackMainText={feedback.mainMessage}
        FeedbackSecondText={feedback.secondMessage}
      />
      <div className="w-full min-h-dvh flex flex-col items-center justify-center gap-4 max-sm:gap-2">
        <FormHeader
          description="Crie sua conta para começar a gerenciar suas tarefas"
        />
        <form
          onSubmit={createUser}
          className='w-[35rem] h-auto flex flex-col items-center justify-center pb-8 pt-8 p-4 border-2 rounded-md gap-4 max-sm:w-[95%] max-sm:pb-4 max-sm:pt-4 max-sm:gap-2'
        >
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
              onChange={(ev) => setNome(ev.target.value)}
              type="text" id='name' placeholder='Seu nome completo' value={nome} required />
          </div>
          <div className='flex flex-col w-[95%] items-center justify-center gap-2'>
            <label htmlFor="email" className='text-black font-bold font-[Inter] place-self-start'>
              Email
            </label>
            <input
              className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
              onChange={(ev) => setEmail(ev.target.value)}
              type="email" id='email' placeholder='seu@email.com' value={email} required />
          </div>
          <div className='flex flex-col w-[95%] items-center justify-center gap-2'>
            <label htmlFor="password" className='text-black font-bold font-[Inter] place-self-start'>
              Senha
            </label>
            <input
              className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
              onChange={(ev) => setPassword(ev.target.value)}
              type="password" id='password' placeholder='Sua senha' value={password} required />
          </div>
          <div className='flex flex-col w-[95%] items-center justify-center gap-2'>
            <label htmlFor="confirmPassword" className='text-black font-bold font-[Inter] place-self-start'>
              Confirmar senha
            </label>
            <input
              className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              type="password" id='confirmPassword' placeholder='Confirme sua senha' value={confirmPassword} required />
          </div>
          <button
            type="submit"
            className='bg-[#344256] hover:bg-[#243042]
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