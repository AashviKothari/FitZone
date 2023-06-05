import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/register' Component={Register} />
        <Route exact path='/login' Component={Login} />
      </Routes>
    </Router>
  )
}

export default App
