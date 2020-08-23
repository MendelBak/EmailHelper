import React, { Component } from 'react';
import SurveyField from './SurveyField';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields(label, type, name) {
    // Iterate over the FIELDS variable and create a <Field> for each object, passing in parameters.
    return _.map(formFields, (field) => {
      return (
        <Field
          // Key property needs to be unique, so 'name' should satisfy that requirement
          key={name}
          component={SurveyField}
          type='text'
          label={field.label}
          name={field.name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <div>
            <Link to='/surveys' className='red btn-flat left white-text'>
              Cancel
            </Link>

            <button
              type='submit'
              className='teal btn-flat right white-text next'
            >
              Next
              <i className='material-icons right'>done</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Regex email validation
  errors.recipients = validateEmails(values.recipients || '');

  // iterates through the FIELd objects and compares the names stored in there with the name of the form fields for validation. Returns custom error if missing text in the field.
  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
