import { combineReducers } from 'redux';
import jobs from './jobsReducer';

const rootReducer =()=> combineReducers({
  jobs:jobs,
});

export default rootReducer;

