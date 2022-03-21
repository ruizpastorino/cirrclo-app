import React, { useState } from 'react'
import { StyledInput } from '../shared/inputs/styled-inputs'
import { Link } from 'react-router-dom'
import { userLogin } from '../../redux/actions/user.actions'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('circclotest@gmail.com')
  const [password, setPassword] = useState('demo')
  const [keepUser, setKeepUser] = useState(true)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(userLogin({ email, password })).then((err) => {
      if (err) setError(err)
    })
  }

  return (
    <form style={{ width: '350px' }} onSubmit={handleSubmit}>
      <h2 className="strong-text display-6 text-success">INICIAR SESION</h2>
      <StyledInput
        icon="fas fa-envelope"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setError(false)}
      />
      <StyledInput
        icon="fas fa-key"
        label="Contraseña"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setError(false)}
      />
      {error && (
        <div className="d-flex align-items-center justify-content-center">
          <i className="fas fa-times-circle text-danger display-7 mr-2" />
          <p className="m-0  font-weight-bold text-center display-8">
            Password o Email incorrectos
          </p>
        </div>
      )}
      <div className="p-2 text-center my-4">
        <Link to="/" className="display-8 text-warning">
          ¿ Olvidó su contraseña ?
        </Link>
      </div>
      <div className="text-center">
        <button className="btn btn-success rounded-pill">INGRESAR</button>
      </div>
      <div className="d-flex justify-content-center my-4 align-items-center">
        <p className="mr-3 font-weight-bold">Mantener Sesin Iniciada</p>
        <input
          type="checkbox"
          value={keepUser}
          onChange={() => setKeepUser(!keepUser)}
        />
      </div>
    </form>
  )
}

export default LoginForm
