import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Home from './pages/Home/Home'
import { Routes, Route} from 'react-router-dom'
import StoreDetails from './pages/StoreDetails/StoreDetails'
import Changepassword from './components/Changepassword/Changepassword'


const App = () => {
  const [loginPopup, setLoginPopup] = useState(false)
  const [passwordPopup, setPasswordPopup] = useState(false)
  return (
    <>
     {loginPopup && <LoginPopup setLoginPopUp={setLoginPopup}  /> }
     {passwordPopup && <Changepassword setPasswordPopup={setPasswordPopup} />}
    <div className='app'>
      <Navbar setLoginPopUp={setLoginPopup} setPasswordPopup={setPasswordPopup} /> 
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/store/:id" element={<StoreDetails />} />
      </Routes>
       
    </div>
    </>
  )
}

export default App