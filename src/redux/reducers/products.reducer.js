const defaultState = {
  loading: false,
  list: [],
}

const productsReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'PRODUCTS_REQUEST_START':
      return { ...state, loading: true, error: false }
    case 'PRODUCTS_REQUEST_END':
      return { ...state, loading: false }
    case 'UPDATE_PRODUCTS':
      return { ...state, list: [...payload] }
    case 'PRODUCTS_REQUEST_ERROR':
      return { ...state, error: payload, loading: false }
    default:
      return state
  }
}

export default productsReducer
