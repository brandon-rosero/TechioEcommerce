import React from 'react'
import Link from 'next/link'
import { urlFor } from '../library/client'


const Product = ({ product }) => {
  return (
    <div>
        <Link href={`/product/${product.slug.current}`}>
            <div className='product-card'>
                <img className='product-image' src={urlFor(product.image && product.image[0])}/>
                <h1 className='product-name'>{product.name}</h1>
                <h3>${product.price}</h3>
            </div>
        </Link>

    </div>
  )
}

export default Product