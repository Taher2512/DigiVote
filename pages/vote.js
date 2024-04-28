import React, { useState, useEffect } from "react";
import VoteCard from "../components/VoteCard";
import Footer from "../components/Homepage/Footer"

const parties = [
  {
    name: "Party A",
    image: "/images/candidate.svg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus"
  },
  {
    name: "Party B",
    image: "/images/candidate.svg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus"
  },
  {
    name: "Party C",
    image: "/images/candidate.svg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus"
  },
  {
    name: "Party D",
    image: "/images/candidate.svg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus"
  },
  {
    name: "Party E",
    image: "/images/candidate.svg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus"
  },
];

function Vote() {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const address = localStorage.getItem("walletAddress");
    if (address) {
      setWalletAddress(address);
    }
  }, []);

  const handleChange = (event) => {
    setWalletAddress(event.target.value);
  };

  return (
    <div className="h-full w-full flex flex-col items-center  px-24">
      <div className="w-1/2 py-4 flex items-center justify-between bg-white/30 mt-8 rounded-xl px-8">
        <h1 className="gilroy-bold text-white text-4xl">DigiVote.</h1>
        <div className="flex items-center gap-4">
          <p className="gilroy-light text-white text-sm text-ellipsis">0x01454684685486469816</p>
          
          <img src="/images/candidate.svg" width={50}/>
        </div>
      </div>
      <div className="w-full p-10 mb-10 mt-4 ">
        <h1 className="text-4xl gilroy-bold text-white mb-8 text-center ">Cast your Vote Here .</h1>
        <div className="self-start w-full p-10 mb-10 border rounded-xl">
          <h1 className="text-2xl font-medium text-white mb-4 gilroy-light">
            Your Wallet Address:
          </h1>
          <span className="flex gap-4">

          <input
            type="text"
            placeholder="Enter your wallet address..."
            value={walletAddress}
            onChange={handleChange}
            className="text-white bg-white/15 hover:bg-slate-700 text-xl py-3 px-8 rounded-full outline-none w-full gilroy-light "
          />
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-full text-xl px-10 py-2.5 text-center gilroy-bold"
          >
            Connect
          </button>
          </span>
        </div>
        <div className="flex flex-wrap justify-start items-center w-full gap-4 ">
          {parties.map((party) => (
            <VoteCard key={party.name} party={party} />
          ))}
        </div>
      </div>
      <div className="w-full">

      <Footer/>
      </div>
    </div>
  );
}

export default Vote;
