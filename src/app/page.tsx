import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className=''>
     <div className=" flex flex-col justify-center items-center">
      <div className="bg-white p-8">
        <h1 className="text-3xl font-bold mb-4 text-black">SysMetrics</h1>
        <p className="text-lg mb-6 text-black">
          SysMetrics is the utility application that renders charts for heap memory visualization of JavaScript, mouse clicks speed, mouse movement speed in both X and Y directions.
        </p>
        <p className="text-lg mb-6 text-black">
          Feel free to contribute to the project on GitHub:
        </p>
        <a
          href="https://github.com/akshays-repo/SysMetrics"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/akshays-repo/SysMetrics
        </a>
      </div>
    </div>
    </div>
  )
}

export default Home