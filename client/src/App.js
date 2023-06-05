import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/register' Component={Register} />
        <Route exact path='/login' Component={Login} />
        <Route exact path='/products' Component={ProductList} />
        <Route exact path='/products/:id' Component={ProductDetails} />
        <Route exact path='/cart' Component={Cart} />
      </Routes>
    </Router>
  )
}

export default App
