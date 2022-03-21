import './styles/App.css'
import './styles/bootstrap.min.css'
import './styles/icons/css/all.css'
import { useDispatch, useSelector } from 'react-redux'
import Popup from './components/shared/popup/popup'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginScreen from './components/auth/login.screen'
import Main from './main'
import PublicRoute from './components/navigation/public-route'
import PrivateRoute from './components/navigation/private-route'
import { Redirect } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const popup = useSelector((state) => state.popup)
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute path="/app" component={Main} />
          <PublicRoute exact path="/login" component={LoginScreen} />
          <Route path="/" component={() => <Redirect to="/login" />} />
          <Route
            path="*"
            component={() => <div className="center-all vh-100">404 page</div>}
          />
        </Switch>
      </Router>
      {popup && (
        <Popup {...popup} close={() => dispatch({ type: 'CLOSE_POPUP' })} />
      )}
    </>
  )
}

export default App
