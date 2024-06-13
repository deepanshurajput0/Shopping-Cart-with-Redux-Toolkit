import React, { useState } from 'react'
import './style.css'
import Cardsdata from './CartData'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Card'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/todoSlice'
const Home = () => {
  const dispatch = useDispatch()
  const [cartData,setCartData]=useState(Cardsdata)
  const send=(e)=>{
     dispatch(addToCart(e))
     console.log(e)
  }
  return (
    <>
     <section className='item_section mt-4 container' >
      <h2 className=' px-4 ' style={{fontWeight:'400'}} >Restaurants in Bulandshahr Open Now</h2>
      <div className=' row mt-2 d-flex justify-content-around align-items-center'> 
      {
        cartData.map((item,i)=>{
           return(
            <Card key={i} style={{width:"22rem", border:"none", marginTop:"30px"}} className='hove mb-4' >
       <Card.Img className='cd' src={item.imgdata} />
       <div className='card_body'>
         <div className='upper_data d-flex justify-content-between align-items-center'>
         <h4 className='mt-2' >{item.dish}</h4>
         <span>{item.rating} *</span>
         </div>
         <div className='lower_data d-flex justify-content-between '>
         <h5>{item.address}</h5>
         <span>{item.price}</span>
         </div>
         <div className='extra'></div>
         <div style={{marginTop:"10px"}} className='last_data d-flex justify-content-between '>
       <img style={{width:"2rem"}} src={item.arrimg} className='limg' alt="" />
       <Button varient="outline-light" style={{width:"150px",backgroundColor:"red",color:"white", textAlign:'center', padding:"5px"}} onClick={()=>send(item)}  >Add To Cart</Button>
       <img src={item.delimg} className='laimg' alt="" />
         </div>
       </div>
      </Card>
           )
        })
      }
      
       </div>
     </section>
    </>
  )
}

export default Home

