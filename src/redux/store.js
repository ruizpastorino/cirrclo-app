import { combineReducers, createStore, applyMiddleware } from 'redux'
import user from './reducers/user.reducer'
import popup from './reducers/popup.reducer'
import supplies from './reducers/supplies.reducer'
import products from './reducers/products.reducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({ user, popup, supplies, products })

const store = createStore(reducer, {}, applyMiddleware(thunk))

export default store
