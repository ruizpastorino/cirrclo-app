import React from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import ToolWrapper from '../screen-wrapper/tools-wrapper'
import routes from './routes.json'
import Analitycs from './views/analitycs'
import Inventory from './views/inventory'

const SuppliesScreen = () => {
  return (
    <div className="d-flex w-100 h-100">
      <ToolWrapper
        icon="fas fa-parachute-box"
        subMenu={routes}
        subMenuTitle="Vistas"
      >
        <div className="w-100">
          <h6 className="text-warning strong-text">Total</h6>
          <p className="strong-text">48 Envases</p>
          <h6 className="text-warning strong-text mt-4">Pendientes</h6>
          <p className="strong-text">8 Envases</p>
        </div>
      </ToolWrapper>
      <div className="flex-1 h-100 shadow">
        <Switch>
          <Route path={'/app/supplies/analitycs'} component={Analitycs} />
          <Route path={'/app/supplies/inventory'} component={Inventory} />
          <Route
            path="*"
            component={() => (
              <div className="center-all h-100 shadow bg-secondary">
                <h5 className="strong-text">404 error</h5>
              </div>
            )}
          />
        </Switch>
      </div>
    </div>
  )
}
export default SuppliesScreen
