import React from 'react'
import { AuthProvider } from './context/AuthContext'

import { Navbar } from './components/marginals/Navbar'
import SignUp from './components/SignUp'

function Homepage() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <SignUp />
      </AuthProvider>
    </>
  )
}

export default Homepage
