import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyledInput, StyledSelect } from '../shared/inputs/styled-inputs'
import StyledTable from '../shared/table/styled-table'
import Spinner from '../shared/spinner/spinner'
import { search } from '../shared/utility'
import Form from './form'

const ScreenWrapper = ({
  data,
  onRemove,
  form,
  headers = [],
  properties = [],
  title,
  filters = [],
}) => {
  const [formHandler, setFormHandler] = useState({ edit: false, open: false })
  const [keyword, setKeyword] = useState('')
  const [list, setList] = useState([])

  const dispatch = useDispatch()

  const handleRemove = (doc) => {
    dispatch({
      type: 'SET_POPUP',
      payload: {
        message: 'Eliminar?',
        detail: 'por favor confirme la operación',
        confirm: () => onRemove(doc),
      },
    })
  }

  useEffect(() => {
    const result = search({
      target: data.list,
      ignore: ['id'],
      keyword,
    })
    setList(result)
  }, [keyword, data])

  return (
    <div className="fadein column scroll-area h-100 p-4">
      <h6 className="text-warning strong-text">{title}</h6>
      <div className="d-flex align-items-center flex-wrap">
        <StyledInput
          style={{ marginRight: '20px', width: '400px' }}
          type="text"
          placeholder="Buscar"
          icon="fas fa-search"
          iconColor="light"
          actionVariant="light"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <StyledSelect style={{ marginRight: '20px', flex: 'unset' }}>
          <option value="">-- Filtrar --</option>
          {filters.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </StyledSelect>

        <button
          style={{ marginRight: '20px' }}
          className="btn btn-light"
          onClick={() => setFormHandler({ open: true, edit: false })}
        >
          Ingresar
        </button>
      </div>
      {data.loading ? (
        <Spinner />
      ) : data.error ? (
        <div className="center-all border rounded">
          <i className="fas fa-bug text-danger display-3 mb-4" />
          <p className="strong-text text-danger display-6 mb-2">REQUEST FAIL</p>
          <p className="text-danger">{data.error}</p>
        </div>
      ) : data.list.length ? (
        <StyledTable
          data={list}
          headers={headers}
          properties={properties}
          edit={(edit) => setFormHandler({ edit, open: true })}
          remove={handleRemove}
          pagginate
        />
      ) : (
        <div className="center-all border rounded">
          <i className="fas fa-folder-open text-warning display-3 mb-4" />
          <p className="strong-text text-warning">NO FILES FOUND</p>
        </div>
      )}
      {formHandler.open && (
        <Form
          title={form.title}
          inputs={form.inputs}
          confirm={form.confirm}
          dataInit={form.dataInit}
          required={form.required}
          edit={formHandler.edit}
          setForm={setFormHandler}
          duplicate={
            formHandler.edit
              ? () => setFormHandler({ edit: false, open: true })
              : null
          }
        />
      )}
    </div>
  )
}

export default ScreenWrapper
