import React from 'react'
import Link from 'next/link'
import Search from '../components/Search'
import Cart from './Cart'
import { AiOutlineShopping } from 'react-icons/ai'
import { Context } from '../context/StateContext'
import { useContext } from 'react'


const Navbar = () => {
  
  const { totalQuantity } = useContext(Context)

  return (
    <div className='nav-container'>
      <h1 className='store-name'>
        <Link href="/">Techio</Link>
      </h1>
      <Link href="/cart/">
        <button className='cart-button'>
          <AiOutlineShopping size={35} />
        <span className='cart-qty'>{totalQuantity}</span>
        </button>
      </Link>
    </div>
  )
}

export default Navbar