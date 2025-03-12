/* eslint-disable*/
import { combineReducers } from 'redux';
import Details from '../reduxContainers/details/DetailReducer';
import TenderList from '../reduxContainers/tender/TenderReducer';
const rootReducer = combineReducers({
  Details,
  TenderList
});

export default rootReducer;
