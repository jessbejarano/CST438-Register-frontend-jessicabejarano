import './App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import StudentHome from './components/StudentHome';
import AdminHome from './components/AdminHome';
import ShowSchedule from './components/ShowSchedule';
import React from 'react';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  )
}
export default App;