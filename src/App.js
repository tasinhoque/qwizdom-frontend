import * as React from 'react';
import {
  SignIn,
  SignUp,
  Dashboard,
  QuizHome,
  QuizCreation,
  AllSubmissions,
  Profile,
  QuizCreationBasic,
  QuizPlay,
  Leaderboard,
  ResultPage,
  ManualEvaluation,
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
        <Route path="/quiz/:id/leaderboard" component={Leaderboard} />
        <Route path="/quiz-result/:id" component={ResultPage} />
        <Route path="/creation/:id" component={QuizCreation} />
        <Route path="/edit-quiz/:id" component={QuizCreation} />
        <Route path="/allsubs" component={AllSubmissions} />
        <Route
          path="/:quizId/evaluate-quiz/:userId"
          component={ManualEvaluation}
        />
        <Route
          path="/quiz/:id/user-submission/:userId"
          component={ResultPage}
        />
      </Switch>
    </main>
  );
};

export default App;
