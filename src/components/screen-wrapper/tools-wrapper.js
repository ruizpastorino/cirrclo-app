import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const ToolWrapper = ({ children, icon, subMenu, subMenuTitle }) => {
  const [display, setDisplay] = useState(true)

  const circleSize = display ? '75px' : '0px'

  return (
    <div
      style={{ width: display ? '150px' : '40px' }}
      className="column align-items-center h-100 animate overflow-hidden"
    >
      <div className="p-2 content">
        <div
          style={{ width: circleSize, height: circleSize }}
          className="rounded-circle center-all bg-dark my-3"
        >
          <i className={`fas fa-${icon} display-${display ? '5' : '7'}`} />
        </div>
      </div>
      <div className="flex-1">
        <div
          style={display ? undefined : { display: 'none' }}
          className="flex-1 w-100 p-4"
        >
          {children}
          <h5 className="strong-text mt-5 text-success">
            {subMenuTitle || 'Acciones'}
          </h5>
          {subMenu.map((route) => (
            <NavLink
              to={route.path}
              activeClassName="text-warning"
              className="font-weight-bold my-2"
              key={route.path}
            >
              <i className="far fa-dot-circle text-info mr-2" />
              {route.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div
        className="p-4 d-flex justify-content-between w-100 mb-4 touchable"
        onClick={() => setDisplay(!display)}
      >
        {display && <p className="font-weight-bold text-success">Cerrar</p>}
        <i className="fas fa-chevron-right text-success" />
      </div>
    </div>
  )
}

export default ToolWrapper
