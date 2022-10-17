import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { client } from '../../library/client'
import { urlFor } from '../../library/client'
import { useContext } from 'react'

import {AiOutlineMinusCircle} from 'react-icons/ai'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { Context } from '../../context/StateContext'
import Product from '../../components/Product'

const productInfo = ({ product, product2, allProducts }) => {
  
    const {quantity, decreaseQty, increaseQty, addToCart} = useContext(Context)

    return (
    <div>
        <Navbar />
      
        <div className='product-info-container'>
          {/*Checks to see if the product(_type == "product") equals null. If it does, that means that the user 
          clicked a highlightProduct which means that product2(_type == "highlightProduct") details should output*/}
          <div className='product-info-card'>
            {product == null ? <h1 className='product-info-name'>{product2.name}</h1> : <h1 className='product-info-name'>{product.name}</h1>}
            {product == null ? <img className='product-info-image' src={urlFor(product2.image && product2.image[0])}/> : 
            <img className='product-info-image' src={urlFor(product.image && product.image[0])}/>} 
            
            {product == null ? <p className='product-info-details'>{product2.details}</p> : <p className='product-info-details'>{product.details}</p>}
            {product == null ? <h1 className='product-info-price'>${product2.price}</h1> : <h1 className='product-info-price'>${product.price}</h1>}
            
            <div className='product-info-qty-container'>
              <span><AiOutlineMinusCircle  className='minus-symbol' size={45} onClick={decreaseQty}/></span>
              <span className='product-qty'>{quantity}</span>
              <span><AiOutlinePlusCircle className='plus-symbol' size={45} onClick={increaseQty}/></span>
            </div>
            
            <div className='product-button-container'>
              <button className='product-info-add' onClick={product == null ? () => addToCart(quantity, product2) : () => addToCart(quantity, product)}>Add to cart</button>
              <button className='product-info-buy'>Buy now</button>
            </div>
          </div> 
        </div>

        <h1 className='other-items-header'>Check out these other items!</h1>
        <div className='other-products-container'>
          {allProducts?.map((product) => <Product key={allProducts._id} product={product} />)}
        </div>
        
        <Footer />
    </div>
  )
}

export const getServerSideProps = async ({ params: {slug} }) => {

  // Grabs all products from sanity dashboard
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const product = await client.fetch(query)

  const query2 = `*[_type == "highlightProduct" && slug.current == '${slug}'][0]`
  const product2 = await client.fetch(query2)

  const query3 = `*[_type == "product"]`
  const allProducts = await client.fetch(query3)

    return {

      props: { product, product2, allProducts }
  
    }

}

export default productInfo
