import React,{useRef, useState}from 'react'
import { Avatar, Button, TextField, FormControlLabel } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import axios from 'axios'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorStyle: {
	  display:	'flex',
	  justifyContent:	'center'
  }
}))

export default function SignUp(props) {

  const classes = useStyles()
  const userNameRef = useRef('')
  const valueRef = useRef('')
  const passRef = useRef('')
  const [errorMessage,setErrorValue] = useState(" ")


  const navigateTo=() =>{
    console.log('history called');
    props.history.push('/dashboard');

  }    


	const sendValue = (event) => {
		event.preventDefault();
		const registerBody={
      "name":userNameRef.current.value,
			"email": valueRef.current.value,
			"password": passRef.current.value,
		}
    
    console.log(registerBody);
		axios.post('http://localhost:4000/v1/auth/register',registerBody)
			.then(res =>{
        localStorage.setItem('accessToken',res.data.tokens.access.token)
        localStorage.setItem('refreshToken',res.data.tokens.refresh.token)
				console.log(res);
        props.history.push('/dashboard');    
			})
			.catch(error=>{
        console.log(error);
				setErrorValue("Please provide correct Information ")
			})

  	}


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal" 
            required
            fullWidth
            id="name"
            label="Username"
            name="name"
            autoComplete="name"
            autoFocus
            inputRef={userNameRef}
          />
          <TextField
            variant="outlined"
            margin="normal" 
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={valueRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passRef}

          />
		  <div style={{ display:'flex', justifyContent: 'center'}}>
			  <p style={{color: "red"}}>	
			  	{errorMessage.toString()}
			  </p>
		  </div>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={sendValue}

          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
