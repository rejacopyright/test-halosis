import React from 'react';
import {BrowserRouter} from "react-router-dom"
import { connect } from 'react-redux'
import Cookies from 'js-cookie';
import Login from './login';
import Dashboard from './dashboard';
function App(props) {
  return (
    <BrowserRouter>
      {
        Cookies.getJSON('auth') ?
        <Dashboard />
        :
        <Login />
      }
    </BrowserRouter>
  );
}

export default connect(s => s)(App);
