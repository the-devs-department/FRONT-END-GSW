import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Log from "./pages/Log";
import NotAllowed from "./pages/NotAllowed";

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
    path: '/home',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: "log-auditoria",
        element: <Log/>
      }
      , {
        path: "minhas-tarefas",
        element: <NotAllowed/> // <----- Mudar o elemento renderizado aqui
      }
      ]
  }
])

export default router