import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useDataHandler from '../hooks/useDataHandler'
import useChanges from '../hooks/useChanges'
import ModalBody from '../shared/modal/modal'
import { clone } from '../shared/utility'
import { StyledInput, StyledSelect } from '../shared/inputs/styled-inputs'

const Form = ({
  edit,
  title,
  inputs,
  setForm,
  duplicate,
  confirm,
  dataInit,
  required=[],
}) => {
  let [data, setData] = useState(clone(edit) || { ...dataInit })
  const [lock, setLock] = useState(false)

  const dispatch = useDispatch()

  const disabled = required.some((key) => !data[key])

  const handleData = useDataHandler(setData)
  const changes = useChanges(edit || dataInit, data, ['id'])
  const handleConfirm = () =>
    dispatch(confirm(data)).then(() => {
      if (!lock) {
        setForm({ open: false, edit: null })
      } else {
        setForm({ edit: null, open: true })
        setData({ ...dataInit })
      }
    })

  const handleDuplicate = () => {
    delete data.id
    setData({ ...data })
    duplicate()
  }

  return (
    <ModalBody
      title={edit ? title[1] : title[0]}
      lock={lock}
      lockAction={() => setLock(!lock)}
      form
      close={() => setForm({ open: false, edit: null })}
      disabledConfirm={!changes || disabled}
      confirm={handleConfirm}
      duplicate={!edit ? undefined : handleDuplicate}
    >
      {inputs.map((inp) =>
        inp.type !== 'select' || !inp.type ? (
          <StyledInput
            key={inp.name}
            label={inp.label}
            name={inp.name}
            value={data[inp.name]}
            disabled={inp.disabled !== undefined ?  inp.disabled(edit) : false}
            onChange={handleData}
            {...inp.props}
          />
        ) : (
          <StyledSelect
            key={inp.name}
            label={inp.label}
            name={inp.name}
            value={data[inp.name]}
            onChange={handleData}
            {...inp.props}
          >
            {inp.options.map((opt) => (
              <option value={opt.value}>{opt.key}</option>
            ))}
          </StyledSelect>
        ),
      )}
    </ModalBody>
  )
}

export default Form
