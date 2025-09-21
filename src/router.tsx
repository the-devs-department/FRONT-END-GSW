import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace/>
  }, 
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/cadastro',
    element: <Cadastro/>
  },
  {
    path: '/home',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      }
    ]
  }
])

export default router