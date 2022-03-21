import React from 'react'
import LoginForm from './login.form'
import spot from '../../assets/login-spot.jpg'

const LoginScreen = () => {
  return (
    <div className="vw-100 vh-100 d-flex">
      <div className="col-12 col-md-6 center-all">
        <LoginForm />
      </div>

      <div className="col-12 col-md-6 h-100">
        <div className="h-100">
          <img src={spot} alt="" className="h-100 big-shadow" />
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
