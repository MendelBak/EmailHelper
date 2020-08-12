import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Components
import Header from './Header';
import Landing from './Landing';
import NewSurvey from './surveys/surveyCreation/NewSurvey';
import SurveyComplete from './surveys/surveyCreation/SurveyComplete';
import Dashboard from './Dashboard';

class App extends Component {
  // This function runs when the App component loads for the first time.
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/surveyComplete' component={SurveyComplete} />
            <Route exact path='/' component={Landing} />
            <Route exact path='/surveys' component={Dashboard} />
            <Route exact path='/survey/new' component={NewSurvey} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
