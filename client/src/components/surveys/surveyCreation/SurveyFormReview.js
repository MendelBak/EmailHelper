// Shows users a review of their form before submission.

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/index';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div style={{ marginBottom: '20px' }}>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please check your survey before submission</h5>
      <div>{reviewFields}</div>

      <div>
        <button className='yellow darken-3 btn-flat' onClick={onCancel}>
          Go Back
        </button>

        <button
          className='green btn-flat right white-text'
          onClick={() => submitSurvey(formValues, history)}
        >
          Send Survey
          <i className='material-icons right'>email</i>
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

// Whenever we pass a function using 'connect' the return statement will be passed as a prop to the component.
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
