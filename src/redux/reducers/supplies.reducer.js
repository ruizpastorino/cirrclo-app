const defaultState = {
  loading: false,
  list: [],
}

const clientsReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'SUPPLIES_REQUEST_START':
      return { ...state, loading: true, error: false }
    case 'SUPPLIES_REQUEST_END':
      return { ...state, loading: false }
    case 'UPDATE_SUPPLIES':
      return { ...state, list: [...payload] }
    case 'SUPPLIES_REQUEST_ERROR':
      return { ...state, error: payload, loading: false }
    default:
      return state
  }
}

export default clientsReducer
