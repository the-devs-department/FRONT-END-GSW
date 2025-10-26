import { Link, useNavigate, useParams } from "react-router-dom";
import FormHeader from "../../components/FormHeader/FormHeader";
import { useEffect, useState } from "react";


export default function ResetarSenhaPage() {
  const {token} = useParams<{token:string}>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);

  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!token) {
      setValid(false);
      setLoading(false);
      return;
    }

  let mounted = true;
  setLoading(true);
  setValid(null);

  fetch(`http://localhost:8080/auth/resetar-senha/validar/${token}`, {
    method:"GET"
  })
  .then ((res) => {
    console.log(res);
    if(!mounted) return;
    if (res.ok) {
      setValid(true);
    } else {
      setValid(false);
    }
  })
  .catch(() => {
    if (!mounted) return;
    setValid(false);
  })
  .finally(() => {
    if (!mounted) return;
    setLoading(false);
  });
  return () => {
    mounted = false;
  };
}, [token]);

  useEffect(() => {
    if (valid === false) {
      const t = setTimeout(() => navigate("/login"), 2500);
      return () => clearTimeout(t);
    }
  }, [valid, navigate]);


  // Tela enquanto valida o token
  if (loading) {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <p className="text-lg text-[#344256]">Carregando...</p>
      </div>
    );
  }

  // Tela se token invalido
  if (valid === false) {
    return (
      <div className="w-full h-dvh flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold text-[#D9534F]">Link inválido</h1>
        <p className="text-[#7B899D]">Redirecionando para a página inicial...</p>
        <p className="text-sm text-[#7B899D]">Se não for redirecionado, clique <Link to="/login" className="text-[#344256] font-bold">aqui</Link>.</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Solicitando");

    if (senha !== senhaConfirmada) {
        setMensagem("As senhas não coincidem!");
        return;
    }
    
    try {
      setLoading(true);
      setMensagem("");

      const response = await fetch (`http://localhost:8080/auth/resetar-senha/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ novaSenha: senha }),
      });

      if (response.ok) {
        setMensagem("Senha alterada com sucesso!");
        setTimeout(() => navigate("/login"), 2500);
      } else {
        setMensagem("Erro ao redefinir senha. Link inválido ou expirado");
      }
    } catch (error) {
      console.error("Erro", error);
      setMensagem("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
      <>
      <div className="w-full h-dvh flex flex-col items-center justify-center gap-14">
        <FormHeader

        />
        <form
          onSubmit={handleSubmit}
          className='w-[35rem] h-auto flex bg-gray-50 flex-col items-center justify-center pb-8 pt-8 p-4 border-2 rounded-md gap-6 max-sm:w-[95%]'>
          <div className='w-full h-auto flex flex-col gap-2 items-center justify-center'>
            <h1 className='text-3xl text-[#22222A] font-bold'>Recuperar Senha</h1>
            <p className='text-[#7B899D]'>Digite seu email e receba um e-mail de recuperação</p>
          </div>
          <div className='flex flex-col w-[95%] items-center justify-center gap-4'>
            <label htmlFor="senha" className='text-black font-bold font-[Inter] place-self-start'>
              Nova Senha
            </label>
            <input
              className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
              type="password" 
              id='senha' 
              value={senha}
              onChange={(e)=> setSenha(e.target.value)}
              placeholder='Digite sua senha' 
              required 
              />
          </div>
          <div className='flex flex-col w-[95%] items-center justify-center gap-4'>
            <label htmlFor="senhaConfirmada" className='text-black font-bold font-[Inter] place-self-start'>
              Confirme sua senha
            </label>
            <input
              className='bg-white border-2 h-10 rounded-xl w-full p-2 text-black'
              type="password" 
              id='senhaConfirmada' 
              value={senhaConfirmada}
              onChange={(e)=> setSenhaConfirmada(e.target.value)}
              placeholder='Digite novamente sua senha' 
              required 
              />
          </div>

          {mensagem && (
          <p className="text-center text-sm text-[#344256] font-bold">
            {mensagem}
          </p>
        )}
          <div className="flex w-[95%] space-x-4">
              <button
                  type='submit'
                  disabled={loading}
                  className={`${
                  loading ? "bg-gray-400" : "bg-[#344256] hover:bg-[#243042]"
                } flex items-center justify-center w-[95%] rounded-lg h-10 text-white font-bold transition-colors`}>
              {loading ? "Enviando..." : "Redefinir senha"}
          </button>
          </div>
          
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