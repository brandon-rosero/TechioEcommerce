import React from 'react'
import Product from '../../components/Product'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { client } from '../../library/client'


const index = ({ products }) => {
  return (
     <div>
        <Navbar />
        <br></br>
        <div className='product-container'>
            {products?.map((product) => <Product key={product._id} product={product} />)}
        </div>  
        <Footer />
    </div>
  )
}

export const getServerSideProps = async () => {

    // Grabs all products from sanity dashboard
    const productQuery = '*[_type == "product"]'
    const products = await client.fetch(productQuery)
  
    return {
  
      props: { products }
  
    }
  
  }

export default index