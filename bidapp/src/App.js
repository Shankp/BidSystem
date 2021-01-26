import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Components/Login/Login";
import SignUp from "./Components/Register/Register";
import FrontList from "./Components/Item/FrontList";

import Routes from './Routes';

function App() {
  return (
    <Routes/>
  );
}

export default App;