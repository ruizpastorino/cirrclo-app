import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NavGroup = ({ title, routes }) => {
  const [display, setDisplay] = useState(true)

  const location = useLocation()

  return (
    <div
      style={{ height: 'auto' }}
      className="w-100 px-3 column overflow-hidden py-1"
    >
      <div
        className="d-flex justify-content-between align-items-center w-100 mb-2 touchable"
        onClick={() => setDisplay(!display)}
      >
        <h5 className="strong-text text-success m-0">{title}</h5>
        <i
          className={`fas fa-chevron-${
            display ? 'down' : 'right'
          } text-success`}
        />
      </div>
      <div
        style={display ? { flex: 1 } : { height: '0px', flex: 'unset' }}
        className="scroll-area w-100 animate"
      >
        {routes.map((route) => (
          <NavLink
            activeClassName='text-warning'
            key={route.path}
            to={`/app/${route.path}`}
            className={`d-flex align-items-center my-3 touchable`}
          >
            <div style={{ width: '30px' }}>
              <i className={`${route.icon}`} />
            </div>
            <p className="font-weight-bold text-capitalize">{route.label}</p>
          </NavLink>
          
        ))}
      </div>
    </div>
  )
}

export default NavGroup
