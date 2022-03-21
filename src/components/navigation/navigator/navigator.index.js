import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../../assets/logo.png'
import { userLogout } from '../../../redux/actions/user.actions'
import NavGroup from './nav-group'
import menu from './routes.json'

const Navigator = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  return (
    <div className="col-2 column align-items-center h-100">
      <div style={{ height: '20px' }} className="bg-success w-100" />
      <div
        style={{ height: '75px', width: '75px' }}
        className="bg-white rounded-circle my-3 center-all"
      >
        <i className="fas fa-user text-warning display-4" />
      </div>
      <p className="strong-text">{user.profile.fullname}</p>
      <div className="bg-light my-3 py-3 px-2 w-100 text-center">
        <img style={{ opacity: 0.7 }} src={logo} alt="" className="w-75" />
      </div>
      <div className="w-100 flex-1 column scroll-area p-3">
        <NavGroup title="Navegación" routes={menu.navigation} />
        <NavGroup title="Aplicación" routes={menu.config} />
      </div>
      <div className="p-3 d-flex justify-content-center w-100 touchable">
        <i className="fas fa-sign-out text-success mr-2" />
        <p
          className="text-success strong-text"
          onClick={() => dispatch(userLogout())}
        >
          Cerrar Sesión
        </p>
      </div>
    </div>
  )
}

export default Navigator
