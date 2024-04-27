import React from 'react'

function HeroHeading() {
  return (
    <>
    <div className="absolute top-1/3 left-[10%] w-1/3">
    <div>
        <h1 className='gilroy-bold text-slate-300 font-extrabold text-7xl'>Transforming Democracy</h1>
        {/* <h1 className='text-slate-300 font-extrabold text-7xl'>in education</h1> */}
        <p className='gilroy-light text-slate-300 mt-4 text-wrap text-xl'>DigiVote: Casting the Future, Today</p>
    </div>
    <div className="flex gap-10 mt-8">
        <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold rounded-lg text-xl px-6 py-2.5 text-center me-2 mb-2">Register</button>
        <button type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-lg text-xl px-10 py-2.5 text-center me-2 mb-2">Vote</button>
        
    </div>
    </div>
    </>
  )
}

export default HeroHeading