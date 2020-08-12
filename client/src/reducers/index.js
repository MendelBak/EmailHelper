// reducers/index.js
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducers';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,  
});
