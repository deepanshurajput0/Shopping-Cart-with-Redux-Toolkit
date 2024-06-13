import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import CartDetails from './components/CartDetails';
function App() {
  return (
     <div>
      <Router>
      <Header/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cart' element={<CartDetails/>} />
      </Routes>
      </Router>
     </div>
  )
}

export default App
