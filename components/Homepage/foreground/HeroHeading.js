import Link from "next/link";
import React from "react";

function HeroHeading() {
  return (
    <>
      <div className="absolute top-1/3 left-[10%] w-1/3">
        <div>
          <h1 className="gilroy-bold text-slate-300 font-extrabold text-7xl">
            Transforming Democracy
          </h1>
          {/* <h1 className='text-slate-300 font-extrabold text-7xl'>in education</h1> */}
          <p className="gilroy-light text-slate-300 mt-4 text-wrap text-xl">
            DigiVote: Casting the Future, Today
          </p>
        </div>
        <div className="flex  w-80 items-center justify-between mt-8 ">
        <Link href={"/register"}>

          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold rounded-lg text-xl px-6 py-2.5 text-center w-full"
          >
            Register
          </button>
        </Link>
          <Link href={"/vote"}>
          
          <button
            type="button"

            className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-lg text-xl px-10 py-2.5 text-center w-full "
          >
            Vote
          </button>
          </Link>
        </div>
          <Link href={"/results"}>
          
          <button
            type="button"

            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-bold rounded-lg text-xl px-10 py-2.5 text-center me-2 mb-2 mt-4 w-80"
          >
            Watch Live Results
          </button>
          </Link>
      </div>
    </>
  );
}

export default HeroHeading;
