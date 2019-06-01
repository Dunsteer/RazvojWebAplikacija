import React from 'react';
import logo from './logo.svg';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavbarComponent from './components/NavbarComponent';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import { Container } from 'react-bootstrap';
import LoginComponent from './components/LoginComponent';
import Cookies from 'universal-cookie';
import UserComponent from './components/UserComponent';

const App: React.FC = () => {

  let loggedIn = () => {
    console.log("loggedIn");
    const cookies = new Cookies();
    let cookie = cookies.get('logedIn');
    console.log(cookie);
    return cookie != null;
  }

  return (
    <Router>
      <Route exact path="/" render={() => (
        loggedIn() ? (
          <HomeComponent />
        ) : (
            <Redirect to="/login" />
          )
      )}>
      </Route>
      <Route path="/users" component={UserComponent}></Route>
      <Route path="/login" component={LoginComponent}></Route>
    </Router>
  );
}

export default App;
