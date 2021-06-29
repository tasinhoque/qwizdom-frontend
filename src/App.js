import * as React from 'react';
import {
  SignIn,
  SignUp,
  Dashboard,
  QuizHome,
  QuizCreation,
  QuizCreationBasic,
} from './pages';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <main>
      <Switch>
        <Route path="/" component={SignIn} exact />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/quiz-home/:id" component={QuizHome} />
        <Route path="/creation" component={QuizCreation} />
        <Route path="/creation-basic" component={QuizCreationBasic} />
      </Switch>
    </main>
  );
};

export default App;
