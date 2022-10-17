import React from 'react'
import { useRef } from 'react'
import Link from 'next/link'
import { Context } from '../context/StateContext'
import { useContext } from 'react'
import { urlFor } from '../library/client' 
import { AiOutlineShopping } from 'react-icons/ai'
import {AiOutlineMinus} from 'react-icons/ai'
import {AiOutlinePlus} from 'react-icons/ai'
import getStripe from '../library/getStripe'


const Cart = () => {
  
  const cartRef = useRef();

  const { totalQuantity, cartItems, totalPrice, increaseCartItemQuantity, decreaseCartItemQuantity, remove } = useContext(Context)

  async function checkout(){

    const stripe = await getStripe()

    const options = {
      
      method: 'POST', 
      headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({cartItems})

    }

    const response = await fetch('/api/stripe', options)

    if(response.statusCode === 500){

      return

    }

    const data = await response.json()

    stripe.redirectToCheckout( {sessionId: data.id } )


  }

  return (
      <div>
        <div className='cart-container-wrapper'>
          <span className='cart-header'>Your Cart ({totalQuantity} {totalQuantity == 1 ? 'item' : 'items'})</span>
          <div className='cart-container'>
            {cartItems.length == 0 && (
              <div className='empty-cart-container'>
                <AiOutlineShopping className='empty-shopping-cart' size={100}/>
                <br></br>
                <span className='empty-cart-text'>Your Cart is Empty</span>
                <br></br>
                <Link href='/product/'>
                  <a>
                    <button className='continue-shopping-button'>Continue Shopping</button>
                  </a>
                </Link>  
              </div>
            )}
            {cartItems.length >= 1 && cartItems.map(item => (

              <div className='cart-product-container' key={item._id}> 
                <img  className='cart-image' src={urlFor(item?.image[0])}/>
                <div className='cart-product-detail'>
                  <h3 className='product-cart-header'>{item.name}</h3>
                  <span><AiOutlineMinus  className='cart-minus-symbol' size={25} onClick={() => decreaseCartItemQuantity(item._id)}/></span>
                  <span className='cart-product-qty'>{item.quantity}</span>
                  <span><AiOutlinePlus className='cart-plus-symbol' size={25} onClick={() => increaseCartItemQuantity(item._id)}/></span>
                </div>
                <div className='cart-price-delete-container'>
                    <h1 className='cart-price'>
                      ${item.price}
                    </h1>
                  <div className='cart-delete-container'>
                    <button className='cart-delete-button' onClick={() => remove(item._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {totalQuantity >= 1 && <h1 className='cart-total-price'>Total: ${totalPrice}</h1>}
            <div className='pay-button-container'>
              {totalQuantity >= 1 &&<button className='pay-button' onClick={checkout}>Pay</button>}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Cart