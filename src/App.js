import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { SignIn, SignUp, Dashboard, QuizHome } from './pages';
import { Route, Switch } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// export default function App() {
//   return (
//     <>
//       {/* <Box sx={{ my: 4 }}> */}
//       <Container maxWidth="sm">
//         <StyledButton />
//         <Box mb={2}>
//           <Typography variant="h4" component="h1">
//             Create React App v5-alpha example
//           </Typography>
//         </Box>
//         <ProTip />
//         <Copyright />
//         {/* </Box> */}
//       </Container>
//     </>
//   )
// }

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
