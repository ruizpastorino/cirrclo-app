import React, { useState } from 'react'
import Pagination from './pagination'
import './styles.css'

const StyledTable = ({
  data,
  headers = [],
  children,
  title,
  style,
  className,
  properties = [],
  setRange,
  pagginate,
  edit,
  remove,
  extra,
  extraIcon = 'fas fa-spider',
  minShow,
}) => {
  const [innerRange, setInnerRange] = useState({ min: 0, max: 0 })

  const rangeHandler = children && setRange ? setRange : setInnerRange

  const Row = (idx, element) => {
    return (
      <tr key={idx}>
        {properties.map((property, s_idx) => (
          <td
            key={s_idx}
            style={{ textAlign: headers[s_idx].center ? 'center' : 'left' }}
          >
            {property.indexOf('.') === -1
              ? element[property]
              : element[property.split('.')[0]][property.split('.')[1]]}
          </td>
        ))}
        {(edit || remove || extra) && (
          <td className="text-center">
            {remove && (
              <i
                className="fas fa-trash display-8 text-waring mr-2 touchable"
                onClick={() => remove(element)}
              />
            )}
            {extra && (
              <i
                className={`fas fa-${extraIcon} mr-2 touchable`}
                onClick={extra}
              />
            )}
            {edit && (
              <i
                className="fas fa-edit mr-2 touchable"
                onClick={() => edit(element)}
              />
            )}
          </td>
        )}
      </tr>
    )
  }

  return (
    <div className={'table-wrapper fadein' + className} style={style}>
      {title && <p className="font-weight-bold">{title}</p>}
      <div className="scroll-area flex-1 w-100">
        <table className="styled-table">
          <thead>
            <tr>
              {headers.map((th, idx) => (
                <th key={idx} style={th.style}>
                  {th.title || th}
                </th>
              ))}
              {edit || remove || extra ? (
                <th style={{ textAlign: 'center' }}>Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {children ||
              data
                .slice(innerRange.min, innerRange.max || data.length)
                .map((element, idx) => Row(idx, element))}
          </tbody>
        </table>
      </div>
      {!!pagginate && (
        <Pagination
          length={!children ? data.length : pagginate}
          rangeHandler={rangeHandler}
          displayDefault={minShow}
        />
      )}
    </div>
  )
}

export default StyledTable
