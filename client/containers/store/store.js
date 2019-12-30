import { createStore , combineReducers,applyMiddleware  } from 'redux';
import reduxThunk from 'redux-thunk'
import sampleReducer from './reducer/sampleReducer'


const rootReducer =  combineReducers({
    sampleReducer
})

const store  =  createStore(rootReducer,applyMiddleware(reduxThunk));

export default store;