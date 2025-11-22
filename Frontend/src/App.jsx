import React  from "react"
import { Route, Routes } from "react-router-dom"
import HomPage from "./pages/HomPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { Toaster } from "react-hot-toast"
import EntreprisePage from "./pages/EntreprisePage"
import RegisterEnt from "./pages/RegisterEnt"

function App() {


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
        <Route>

        </Route>



      </Routes>


      <Toaster />


    </div>


    
  )
}

export default App
