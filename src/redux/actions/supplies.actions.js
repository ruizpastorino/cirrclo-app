import fakeData from '../fake/@supplies.json'

export const getSupplies = () => async (dispatch) => {
  dispatch({ type: 'SUPPLIES_REQUEST_START' })
  setTimeout(() => {
    dispatch({ type: 'UPDATE_SUPPLIES', payload: fakeData })
    dispatch({ type: 'SUPPLIES_REQUEST_END' })
  }, 600)
}

export const saveSupply = (data) => async (dispatch, getState) => {
  try {
    const list = getState().supplies.list
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
        message: edit ? 'Guardado Cambios' : 'Ingresado nuevo Articulo',
        icon: 'fas fa-edit',
        iconColor: 'warning',
      },
    })
    dispatch({ type: 'UPDATE_SUPPLIES', payload: list })
  } catch (error) {
    console.log(error)
  }
}

export const deleteSupply = (data) => async (dispatch, getState) => {
  const list = getState().supplies.list
  const index = list.findIndex((doc) => doc.id === data.id)
  list.splice(index, 1)
  dispatch({ type: 'UPDATE_SUPPLIES', payload: list })
  dispatch({
    type: 'SET_POPUP',
    payload: {
      message: 'Eliminado',
      detail: 'Se elimino el insumo ' + data.name,
      icon: 'fas fa-trash',
      iconColor: 'danger',
    },
  })
}
