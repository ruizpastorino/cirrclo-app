import users from '../fake/@users.json'

export const userLogin = ({ email, password }) => async (dispatch) => {
  try {
    const finded = await users.find(
      (user) => user.email === email && user.password === password,
    )
    if (finded) {
      dispatch({
        type: 'USER_LOGGED_IN',
        payload: {
          profile: finded.profile,
          cred: 'eyJhbGciOiJIUzI1NiJ9',
        },
      })
    } else {
      throw new Error('Usuario o contraseña no validos')
    }
  } catch (error) {
    dispatch({ type: 'USER_LOGGED_ERROR', payload: error.message })
    return error.message
  }
}

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGGED_OUT' })
    dispatch({
      type: 'SET_POPUP',
      payload: {
        message: 'Sesion Cerrada',
        icon: 'fas fa-user',
        iconColor: 'danger',
      },
    })
  } catch (error) {
    dispatch({ type: 'USER_LOGGED_ERROR', payload: error.message })
    return error.message
  }
}
