import Navbar from "../components/Navbar/Navbar";
import profileUser from '../assets/profile-user.png'
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function RootLayout() {
  return (
    <>
      <Navbar/>
      <div className="flex flex-col ml-[20%] w-[80%] h-dvh gap-2">
        <div className="flex border-b-[1px] border-gray-200 p-2 items-center justify-end h-16">
            <div className="flex gap-4 text-black items-center font-bold">
              <img src={profileUser} alt="" className="h-6"/>
              <p>Otávio Vianna Lima</p>
            </div>
        </div>
        <Outlet/>
      </div>
    </>
  )
}