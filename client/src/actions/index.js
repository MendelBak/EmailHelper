// Action Creators directory
// src/actions/index.js

import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_SURVEYS } from './types';

// This action type returns the current user model.
export const fetchUser = () => async (dispatch) => {
  // API call to get the current user.
  const res = await axios.get('/api/current_user');

  // Return current user
  dispatch({ type: FETCH_USER, payload: res.data });
};

// This action type POSTs the strike token (received after submitting the credit card to the Stripe API) to the /api/stripe endpoint (which saves the new credit to the user model in the DB) and then returns the latest version of the current user.
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

// This action type submits a new survey to the backend for processing, saving to the DB, and sending to users.
export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Returns all surveys by the current user.
export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
