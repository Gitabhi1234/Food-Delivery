import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import PartnerLogin from './pages/PartnerLogin'
import PartnerSignup from './pages/PartnerSignup'

import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import PartnerHome from './pages/PartnerHome'
import PartnerHome1 from './pages/PartnerHome1' // new welcome interface for partners
import PartnerProtectWrapper from './pages/PartnerProtectWrapper'
import Home from './pages/home'
import UserHome from './pages/UserHome'
import UserProfille from './pages/UserProfile'

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
          path="/user-home"
          element={
            <UserProtectWrapper>
              <UserHome/>
            </UserProtectWrapper>
          }
        />
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
          path="/partner-home1"
          element={
            <PartnerProtectWrapper>
              <PartnerHome1 />
            </PartnerProtectWrapper>
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
        <Route
            path= "/user-home/user-profile"
          element={
            <UserProtectWrapper>
              <UserProfille />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
