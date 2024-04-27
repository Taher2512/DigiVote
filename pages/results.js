import React from 'react'
import Rcard from '../components/Rcard.js'
import Footer from "../components/Homepage/Footer.js"

function results() {
  return (
    <main className='w-screen h-screen overflow-auto'>
    <h1 className='text-7xl text-center my-12 gilroy-bold text-white'>Results</h1>
    <Rcard/>
    <Footer/>
    </main>
  )
}

export default results