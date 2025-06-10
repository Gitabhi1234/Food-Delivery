import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import PartnerLogin from './pages/PartnerLogin'
import PartnerSignup from './pages/PartnerSignup'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import PartnerHome from './pages/PartnerHome'
import PartnerProtectWrapper from './pages/PartnerProtectWrapper'


const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route path="/partner-signup" element={<PartnerSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home/>
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
          <Route
            path="/partner-home"
            element={
             <PartnerProtectWrapper>
                <PartnerHome />
             </PartnerProtectWrapper>
            }
          />
      </Routes>
    </div>
  );
}

export default App
