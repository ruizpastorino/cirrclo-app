import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (props) => {
  const { cred, profile } = useSelector((state) => state.user)

  return cred && profile ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRoute
