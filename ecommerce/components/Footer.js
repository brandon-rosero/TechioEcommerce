import React from 'react'
import Link from 'next/link'
import { AiFillGithub } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'
import Email from './Email'

const Footer = () => {
  return (
    <div className='footer-container'>
      <h1 className='store-name'>
        <Link href='/'>Techio</Link>
      </h1>
      
      <Link href={"https://github.com/brandon-rosero"}>
        <a>
          <AiFillGithub className='github' size={35} />
        </a>
      </Link>
      
      <Link href='https://www.linkedin.com/in/brandon-rosero-22a3b4239/'>
        <a>
          <AiFillLinkedin className='linkedin' size={35}  />
        </a>
      </Link>
      <Email />
    </div>
  )
}

export default Footer