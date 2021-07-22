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
  ForumPage,
  Stat,
  LandingPage,
} from './pages';
import { Route, Switch } from 'react-router-dom';
import { FullThread } from './components';

const App = () => {
  return (
    <main>
      <Switch>
        {/* <Route path="/" component={SignIn} exact /> */}
        <Route path="/" component={LandingPage} exact />
        <Route path="/landing" component={LandingPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />

        <Route path="/quiz-home/:id" component={QuizHome} />
        <Route path="/creation-basic" component={QuizCreationBasic} />
        <Route path="/creation/:id" component={QuizCreation} />
        <Route path="/quiz-edit/:id" component={QuizCreation} />
        <Route path="/quiz-play/:id" component={QuizPlay} />
        <Route
          path="/:quizId/evaluate-quiz/:userId"
          component={ManualEvaluation}
        />

        <Route path="/quiz-result/:id" component={ResultPage} />
        <Route
          path="/quiz/:id/user-submission/:userId"
          component={ResultPage}
        />
        <Route path="/quiz/:id/leaderboard" component={Leaderboard} />
        <Route path="/all-submissions/:id" component={AllSubmissions} />
        <Route path="/quiz/:id/stat-data" component={Stat} />

        <Route path="/quiz/:id/forum" component={ForumPage} />
        <Route
          path="/quiz/:quizId/forum-thread/:threadId"
          component={FullThread}
        />
      </Switch>
    </main>
  );
};

export default App;
