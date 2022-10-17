import React from 'react'
import Head from 'next/head'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import Footer from '../components/Footer'
import Link from 'next/link'
import { client } from '../library/client'
const Homepage = ({ bannerInfo, highlightProducts }) => {
  return (
    <div>
      <Head>
        <title>Techio</title>
        
      </Head>
      
      <Navbar />
      <Banner bannerProp={bannerInfo[0]} />
      <div>
          <h2 className='product-header'>Check Out These Amazing Products!</h2>
      </div>
      <div className='product-container'>
        {highlightProducts?.map((product) => <Product key={product._id} product={product} />)}
        <Link href={`/product/`}> 
          <button className='all-products-button' >All Products</button>
        </Link>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export const getServerSideProps = async () => {

  // Grabs all products from sanity dashboard
  const highlightProductQuery = '*[_type == "highlightProduct"]'
  const highlightProducts = await client.fetch(highlightProductQuery)

  // Grabs all banner info from sanity dashboard
  const bannerQuery = '*[_type == "banner"]'
  const bannerInfo = await client.fetch(bannerQuery)

  return {

    props: { bannerInfo, highlightProducts}

  }

}

export default Homepage
