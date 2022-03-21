import React from 'react'
import {  Route, Switch } from 'react-router-dom'
import Containers from './components/containers/containers.index'
import Navigator from './components/navigation/navigator/navigator.index'
import Products from './components/products/products.index'
import Supplies from './components/supplies/supplies.index'

const Main = () => {


  return (
    <div className="d-flex vh-100 vw-100">
      <Navigator />
      <div className="col-10 h-100 shadow bg-secondary">
        <Switch>
          <Route path="/app/supplies" component={Supplies} />
          <Route path="/app/products" component={Products} />
          <Route path="/app/containers" component={Containers} />
          <Route
            path="*"
            component={() => (
              <div className="center-all h-100">
                <h5 className="strong-text">404 error</h5>
              </div>
            )}
          />
        </Switch>
      </div>

    </div>
  )
}

export default Main
