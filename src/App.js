import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditSurveyPage from './Pages/EditSurvey/EditSurveyPage';
import SurveyResultsPage from './Pages/SurveyResults/SurveyResultsPage';
import TakeSurveyPage from './Pages/TakeSurvey/TakeSurveyPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/edit-survey'>
            <EditSurveyPage />
          </Route>
          <Route path='/survey-results'>
            <SurveyResultsPage />
          </Route>
          <Route path='/take-survey'>
            <TakeSurveyPage />
          </Route>
          <Route path='/'>
            <p>go to a page</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
