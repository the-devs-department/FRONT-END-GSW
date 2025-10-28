import { Link } from "react-router-dom";
import FormHeader from "../../components/FormHeader/FormHeader";
import { useEffect, useState } from "react";


export default function SolicitarEmailRecuperacaoPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null> (null);
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    
    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      if (cooldown > 0) return;
      setMessage(null);
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/auth/recuperar-senha", {
          method:"POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({email}),
        });
        if (response.ok) {
          setMessage("E-mail de recuperação enviado com sucesso!");
          setCooldown(60);
        } else {
          setMessage("Não foi possível enviar");
        }
      } catch (err) {
        console.log(err);
        setMessage("Erro de conexão com o servidor");
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      if (cooldown <= 0) return;
      const interval = setInterval(() => {
        setCooldown((prev) => prev-1);
      }, 1000)
      return () => clearInterval(interval);
    }, [cooldown]);

    const buttonText = loading ? "Enviando..." : cooldown > 0 ? `Enviar novamente (${cooldown}s)` : "Enviar e-mail";

    return (
        <>
        <div className="w-full h-dvh flex flex-col items-center justify-center gap-14">
          <FormHeader/>
          <form
            onSubmit={handleSubmit}
            className='w-[35rem] h-auto flex bg-gray-50 flex-col items-center justify-center pb-8 pt-8 p-4 border-2 rounded-md gap-6 max-sm:w-[95%]'>
            <div className='w-full h-auto flex flex-col gap-2 items-center justify-center'>
              <h1 className='text-3xl text-[#22222A] font-bold'>Recuperar Senha</h1>
              <p className='text-[#7B899D]'>Digite seu email e receba um e-mail de recuperação</p>
            </div>
            <div className='flex flex-col w-[95%] items-center justify-center gap-4'>
              <label htmlFor="email" className='text-black font-bold font-[Inter] place-self-start'>
                Email
              </label>
              <input
                className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
                type="email" 
                id='email' 
                placeholder='seu@email.com' 
                required 
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
            </div>
            <div className="flex w-[95%] space-x-4">
          
                <Link to={'/login'} className='bg-[#8F8F8F] hover:bg-[#243042] flex items-center justify-center w-[95%] rounded-lg h-10 text-white font-bold'>
                    Cancelar
                </Link>
                <button
                    type='submit'
                    className='bg-[#344256] hover:bg-[#243042] flex items-center justify-center w-[95%] rounded-lg h-10 text-white font-bold'>
                    {buttonText}
                </button>
            </div>

            {message && (
              <p className="text-center text-sm text-[#344256] font-semibold mt-2">{message}</p>
            )}
            
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