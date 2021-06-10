import * as React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <div>
      <CssBaseline />
      <App />
    </div>,
  </BrowserRouter>,

  document.querySelector('#root')
)
