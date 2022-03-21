import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteProduct,
  getProducts,
  savePRoduct,
} from '../../../redux/actions/products.actions'
import ScreenWrapper from '../../screen-wrapper/screen.wrapper'

const Inventory = () => {
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch()

  const exist = products.list[0]

  const formData = {
    title:["Nuevo Producto","Editar Producto"],
    inputs: [
      { label: 'Nombre', name: 'name' },
      {
        label: 'precio unidad de medida',
        name: 'price',
        props: { type: 'number', min: 0 },
      },
      {
        label: 'costo unidad de medida',
        name: 'cost',
        props: { type: 'number', min: 0 },
      },
      {
        label: 'Cantidad',
        name: 'quantity',
        props: { type: 'number', min: 0 },
        disabled: (edit, data) => !!edit,
      },
      {
        label: 'medida',
        name: 'measure',
        type: 'select',
        options: [
          {
            key: 'litro',
            value: 'lts',
          },
          { key: 'Kilogramo', value: 'kg' },
        ],
      },
      { label: 'Proveedor', name: 'provider' },
    ],
    required: ['name', 'price', 'measure', 'quantity'],
    dataInit: {
      name: '',
      price: '',
      quantity: '',
      cost: '',
      measure: 'lts',
      provider: '',
    },
    confirm: savePRoduct,
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <>
      <ScreenWrapper
        data={products}
        title="Inventario"
        headers={['nombre', 'costo', 'precio', 'cantidad', "unidad",'proveedor']}
        properties={['name', 'cost', 'price', 'quantity',"measure", 'provider']}
        form={formData}
        onRemove={(doc) => dispatch(deleteProduct(doc))}
        filters={exist ? Object.keys(exist).sort() : undefined}
      />
    </>
  )
}

export default Inventory
