const defaultUser = {
  profile: null,
  cred: null,
}

const userReducer = (state = defaultUser, { type, payload }) => {
  switch (type) {
    case 'USER_LOGGED_IN':
      return { ...payload }
    case 'USER_LOGGED_OUT':
      return { cred: null, profile: null }
    case 'USER_LOGGED_ERROR':
      return { cred: null, profile: null, error: payload }
    default:
      return state
  }
}

export default userReducer
