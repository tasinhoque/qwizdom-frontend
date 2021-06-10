import * as React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import ProTip from './ProTip'
import StyledButton from './StyledButton'
import SignIn from './loginSignUpModule/SignIn'

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
  )
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

const App = () => <SignIn />

export default App
