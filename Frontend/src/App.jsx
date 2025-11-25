import React  from "react"
import { Route, Routes } from "react-router-dom"
import HomPage from "./pages/HomPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { Toaster } from "react-hot-toast"
import EntreprisePage from "./pages/EntreprisePage"
import RegisterEnt from "./pages/RegisterEnt"
import Hom from "./pages/Clients/Hom"
import { useEffect } from "react"
import { UseAuthStore } from "./Store/AuthStore"
import LayoutClient from "./Components/ClientsComponent/LayoutClient"
import { useNavigate } from "react-router-dom"
import DashbordLayout from "./Components/ClientsComponent/DashbordLayout"
import DashbordPage from "./pages/Clients/DashbordPage"
import ReservationClient from "./pages/Clients/ReservationClient"
import Layout from "./Components/GestionaireComponents/Layout"
import Dashbord from "./pages/Gestionaire/Dashbord"

function App() {

  const Navigate = useNavigate() ; 
  // verification authentification pour acces a une service 
  const {chekAUthentication , isAuth , loading} = UseAuthStore() ; 

  useEffect(()=>{
    chekAUthentication() ; 
  },[])
  console.log(isAuth); 

  


    if(loading && !isAuth){
        return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="flex space-x-2 text-9xl text-blue-900">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-150">.</span>
            <span className="animate-bounce delay-300">.</span>
          </div>
        </div>
      );
    }
    
  return (
    <div data-theme="light">


      <Routes>
        {/** creation Routes Pour application  */}
        <Route path="/" element={<HomPage />} />
        <Route path="/login/page" element={<LoginPage />} /> 
        <Route path="/Register/page" element={<RegisterPage />} /> 
        <Route path="/espace/entreprise" element ={<EntreprisePage />} /> 
        <Route path="/register/entreprise" element={<RegisterEnt />} />

        {/** Routes Pour manager  */}
        <Route>
        </Route>

        {/** pour client  */}
        <Route  element={isAuth ?<LayoutClient /> : <LoginPage /> } >
          <Route path="/clien/hom" element = {<Hom />} />
        </Route>

        {/** Dashbord pour client  */}
        <Route element={isAuth ? <DashbordLayout /> : <LoginPage /> }>
          <Route path="/dashbord/client" element={<DashbordPage /> } /> 
          <Route path="/reservation" element={<ReservationClient />} /> 
        </Route>


        {/**Dashbord Pour Gestioneur  */} 
        <Route element={<Layout />} >
          <Route path="/entreprise/dashbord" element = {<Dashbord />} />

        </Route>


      </Routes>


      <Toaster />


    </div>


    
  )
}

export default App
