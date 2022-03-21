import fakeData from '../fake/@products.json'

export const getProducts = () => async (dispatch) => {
  dispatch({ type: 'PRODUTCS_REQUEST_START' })
  setTimeout(() => {
    dispatch({ type: 'UPDATE_PRODUTCS', payload: fakeData })
    dispatch({ type: 'PRODUTCS_REQUEST_END' })
  }, 600)
}

export const savePRoduct= (data) => async (dispatch, getState) => {
  try {
    const list = getState().products.list
    const edit = data.id !== undefined
    if (edit) {
      const index = list.findIndex((doc) => doc.id === data.id)
      list[index] = data
    } else {
      data.id = Math.random()
      list.push(data)
    }
    dispatch({
      type: 'SET_POPUP',
      payload: {
        message: edit ? 'Guardado Cambios' : 'Ingresado nuevo Producto',
        icon: 'fas fa-edit',
        iconColor: 'warning',
      },
    })
    dispatch({ type: 'UPDATE_PRODUTCS', payload: list })
  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = (data) => async (dispatch, getState) => {
  const list = getState().products.list
  const index = list.findIndex((doc) => doc.id === data.id)
  list.splice(index, 1)
  dispatch({ type: 'UPDATE_PRODUTCS', payload: list })
  dispatch({
    type: 'SET_POPUP',
    payload: {
      message: 'Eliminado',
      detail: 'Se elimino el producto ' + data.name,
      icon: 'fas fa-trash',
      iconColor: 'danger',
    },
  })
}
