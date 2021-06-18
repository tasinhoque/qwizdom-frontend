import * as React from 'react';
import { SignIn, SignUp, Dashboard, QuizHome } from './pages';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <main>
      <Switch>
        <Route path="/" component={SignIn} exact />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/quizhome/:id" component={QuizHome} />
      </Switch>
    </main>
  );
};

export default App;
