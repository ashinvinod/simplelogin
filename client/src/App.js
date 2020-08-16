import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import SignupForm from './SignUp';
import LoginForm from './LogIn';
import Welcome from './Welcome';
import history from './history';

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={SignupForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/welcome" component={Welcome} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
