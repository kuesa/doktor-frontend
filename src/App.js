import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Checkup from './components/checkup';
import Dashboard from './components/dashboard';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/dashboard' />
        </Route>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <ProtectedRoute path='/checkup' component={Checkup} />
        <ProtectedRoute path='/dashboard' component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
