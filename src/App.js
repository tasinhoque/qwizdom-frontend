import * as React from 'react';
import {
  SignIn,
  SignUp,
  Dashboard,
  QuizHome,
  QuizCreation,
  Profile,
  QuizCreationBasic,
  QuizPlay,
  Leaderboard,
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
        <Route path="/creation/:id" component={QuizCreation} />
        <Route path="/profile" component={Profile} />
        <Route path="/creation-basic" component={QuizCreationBasic} />
        <Route path="/quiz-play/:id" component={QuizPlay} />
        <Route path="/leaderboard" component={Leaderboard} />
      </Switch>
    </main>
  );
};

export default App;
