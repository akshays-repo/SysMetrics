import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className=''>
      
      <Link href={'/heapmemory'} >Heap memory visulaisation </Link>
      <Link href={'/FPS'}>FPS (Frames Per Second)</Link>

    </div>
  )
}

export default Home