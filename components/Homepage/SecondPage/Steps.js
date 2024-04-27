import React from "react";

function Steps() {
  return (
    <>
      <section className=" w-screen h-auto">
        <h1 className="gilroy-bold text-slate-300 font-extrabold text-4xl ml-36 mb-8 mt-32">
          Just 3 Simple Steps to Vote
        </h1>
        <div className="flex">
          <div className="flex flex-col ml-40 items-center">
            <div className="absolute bg-[#0F172A] w-9 h-8 rounded-full border-4 border-blue-700"></div>
            <div className="h-full w-1 bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900"></div>
          </div>
          <ul className="w-2/4 flex flex-col gap-16 mt-8 mb-16 mr-0">
            <li>
              <div className="w-full px-8 py-5 text-white rounded-2xl border-b-2 border-blue-700">
                <h2 className="gilroy-bold text-2xl ">
                  Step 1: Register and KYC
                </h2>
                <p className="mt-4 ml-4">
                Create an account and complete Know Your Customer (KYC) verification using personal identification to ensure secure and eligible voter registration.
                </p>
              </div>
            </li>
            <li>
              <div className="w-full px-8 py-5 text-white rounded-2xl border-b-2 border-blue-800">
                <h2 className="gilroy-bold text-2xl ">Step 2: Connect Wallet</h2>
                <p className="mt-4 ml-4">
                Link your digital wallet to the voting platform, enabling secure transactions and identity verification through blockchain technology.
                </p>
              </div>
            </li>
            <li>
              <div className="w-full px-8 py-5 text-white rounded-2xl border-b-2 border-blue-950">
                <h2 className="gilroy-bold text-2xl ">
                  Step 3: Cast Vote
                </h2>
                <p className="mt-4 ml-4">
                Select your preferred candidates or options, confirm your choices, and submit your vote securely via the blockchain network.
                </p>
              </div>
            </li>
          </ul>
          <div className="w-1/4 h-auto ml-16 mr-40 pt-32">
            <img className="opacity-80" src="/images/vote2.png" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Steps;
