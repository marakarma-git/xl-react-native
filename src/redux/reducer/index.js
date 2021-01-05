import {combineReducers} from 'redux';
import dummy_reducer from './dummy_reducer';
const RootReducers = combineReducers({
  dummy_reducer: dummy_reducer
})
export default RootReducers
