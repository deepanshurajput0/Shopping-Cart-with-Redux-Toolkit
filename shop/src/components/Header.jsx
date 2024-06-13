import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from "react-icons/fa";
import '../components/style.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const {cart} = useSelector((state)=>state.allCart)
  console.log(cart)
  return (
    <div>
        <Navbar style={{height:"60px",background:"black", color:"white"}} >
        <Container>
          <h3 style={{color:"white"}} >Shop Cart</h3>
          <div>
            <span className='badge' >
              {cart.length}
            </span>
           <Link style={{color:"white"}} to='/cart' >
           <FaShoppingCart size={"30"} />
           </Link>
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header

