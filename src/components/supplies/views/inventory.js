import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteSupply,
  getSupplies,
  saveSupply,
} from '../../../redux/actions/supplies.actions'
import ScreenWrapper from '../../screen-wrapper/screen.wrapper'

const Inventory = () => {
  const supplies = useSelector((state) => state.supplies)
  const dispatch = useDispatch()

  const exist = supplies.list[0]

  const formData = {
    title: ['Nuevo Insumo', 'Editar Insumo'],
    inputs: [
      { label: 'Nombre', name: 'name' },
      {
        label: 'Capacidad',
        name: 'capacity',
        props: { type: 'number', min: 0 },
      },
      {
        label: 'Cantidad',
        name: 'quantity',
        props: { type: 'number', min: 0 },
        disabled: (edit, data) => !!edit,
      },
      { label: 'Proveedor', name: 'provider' },
    ],
    required: ['name', 'quantity'],
    dataInit: {
      name: '',
      capacity: '',
      quantity: '',
      provider: '',
    },
    confirm: saveSupply,
  }

  useEffect(() => {
    dispatch(getSupplies())
  }, [])

  return (
    <>
      <ScreenWrapper
        data={supplies}
        title="Inventario"
        headers={['nombre', 'capacidad', 'precio', 'cantidad', 'proveedor']}
        properties={['name', 'capacity', 'price', 'quantity', 'provider']}
        form={formData}
        onRemove={(doc) => dispatch(deleteSupply(doc))}
        filters={exist ? Object.keys(exist).sort() : undefined}
      />
    </>
  )
}

export default Inventory
