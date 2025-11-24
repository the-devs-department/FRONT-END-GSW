import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Log from "./pages/Log";
import TodasTarefas from "./pages/TodasTarefas";
import CalendarioPage from "./pages/CalendarioPage";
import SolicitarEmailRecuperacao from "./pages/recuperacao-senha/SolicitarEmailRecuperacaoPage";
import ResetarSenhaPage from "./pages/recuperacao-senha/ResetarSenha";
import Teams from "./pages/Teams";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/cadastro',
    element: <Cadastro />
  },
  {
    path: 'recuperacao-senha',
    element: <SolicitarEmailRecuperacao />
  },
  {
    path: 'auth/resetar-senha/:token',
    element: <ResetarSenhaPage />
  }
  ,
  {
    path: '/tarefas/:teamId',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: "todas",
        element: <TodasTarefas />
      }, {
        path: "log-auditoria",

        element: <Log />
      }
    ]
  }, {
    path: '/home',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Teams />
      }, {
        path: "calendario",
        element: <CalendarioPage />
      }
    ]
  }
])

export default router