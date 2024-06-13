import React, { useEffect, useState } from 'react'
import './cartStyle.css'
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js/pure';
import { addToCart, removeToCart, removeSingleItem, emptyCart } from '../redux/todoSlice';
import { useDispatch } from 'react-redux';
const CartDetails = () => {
  const {cart} = useSelector((state)=>state.allCart)
  const [price,setPrice]=useState(0)
  const [totalquantity,setTotalQuantity]=useState(0)
  const dispatch = useDispatch()
  const IncrementCart=(e)=>{
      dispatch(addToCart(e))
  }
  const deleteItem=(e)=>{
    dispatch(removeToCart(e))
  }

  const handleSingleDecrement=(e)=>{
    dispatch(removeSingleItem(e))
  }
  const EmptyCart=()=>{
    dispatch(emptyCart())
  }
  const total=()=>{
    let price = 0
    cart.map((el,i)=>(
      price= el.price * el.qnty + price
    ))
    setPrice(price)
  }

  const totalQuantity=()=>{
    let totalquantity = 0
    cart.map((el,i)=>(
      totalquantity = el.qnty + totalquantity
    ))
    setTotalQuantity(totalquantity)
  }
  useEffect(()=>{
   total()
  },[total])
  useEffect(()=>{
    totalQuantity()
  },[totalQuantity])
  const makePayment=async()=>{
    const stripe = await loadStripe("pk_test_51Onn7JSJ37my76qZXbAAUBCOLNttcIxDqXQXZwkQZXACRHeD1E7JPlSEgjcwoydAfuPdb9lDeWiSZbOkYdGPtwmk00IkDtNAAh");
   const body = {
    products:cart
   }
   const headers={
    "Content-Type":"application/json"
   }
   const response = await fetch('http://localhost:7000/api/create-checkout-session',{
    method:"POST",
    headers:headers,
    body:JSON.stringify(body)
   })
  const session = await response.json()
  const result = stripe.redirectToCheckout({
    sessionId:session.id
  })
  if(result.error){
    console.log(result.error)
  }
  }
  const arr =[1,2]
  return (
    <div className='row justify-content-center m-0' >
      <div className='col-md-8 mt-5 mb-5 cardsdetails' >
         <div className="card">
           <div className="card-header bg-dark p-3">
            <div className='card-header-flex' >
            <h5 className='text-white m-0'>Cart Calculation({cart.length})</h5>
              {
                cart.length>0 ? <button onClick={EmptyCart} className='btn btn-danger mt-0 btn-sm' > <FaShoppingCart /> <span>Empty Cart</span> </button>:""
              }
            </div>
            </div>
            <div className="card-body p-0">
              {
                cart.length ===0 ? <table className='table cart-table mb-0'>
                    <tbody>
                      <tr>
                        <td colSpan={6} >
                          <div className='cart-empty' >
                            <FaShoppingCart size={50} />
                            <p style={{color:"black", marginTop:'10px'}}>Your Cart is Empty</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                </table> : <table className='table cart-table mb-0 table-responsive-sm'>
                   <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className=' text-right' > <span>Total Amount</span> </th>
                    </tr>
                   </thead>
                   <tbody>
                    {
                      cart.map((data,index)=>{
                         return(
                          <tr>
                            <td>
                              <button onClick={()=>deleteItem(data.id)} className='prdct-delete' >
                                 <MdDelete />
                              </button>
                            </td>
                            <td>
                              <div className='product-img'>
                                <img src={data.imgdata} alt="img" />
                              </div>
                            </td>
                            <td>
                              <div className='product-name'>
                                <p>{data.dish}</p>
                              </div>
                            </td>
                            <td>{data.price}</td>
                            <td>
                              <div className="prdct-qty-container">
                               <button className='prdct-qty-btn' type='button' onClick={ data.qnty <=1 ? ()=>deleteItem(data.id): ()=>handleSingleDecrement(data)} >
                                <FaMinus/>
                               </button>
                               <input type="text" className='qty-input-box' disabled value={data.qnty} name='' id='' />
                               <button onClick={  ()=>IncrementCart(data)} className='prdct-qty-btn' type='button'>
                                <FaPlus  />
                               </button>
                              </div>
                            </td>
                            <td className='text-right'>
                              {data.qnty * data.price}
                            </td>
                          </tr>
                         )
                      })
                    }
                   </tbody>
                   <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3} >&nbsp;</th>
                      <th>Items In Cart <span className='ml-2 mr-2' >:</span> <span className='text-danger'>{totalquantity}</span> </th>
                      <th className='text-right'>
                        Total Price
                        <span className='ml-2 mr-2'>:</span> <span className='text-danger' >
                           {price}
                        </span>
                      </th>
                      <th className='text-right'>
                         <button onClick={makePayment} className='btn btn-success' >Checkout</button>
                      </th>
                    </tr>
                   </tfoot>
                </table>
              }
            </div>
           
         </div>
      </div>
    </div>
  )
}

export default CartDetails

