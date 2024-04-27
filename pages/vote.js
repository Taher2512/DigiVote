import React, { useState, useEffect } from "react";
import VoteCard from "../components/VoteCard";

const parties = [
  {
    name: "Party A",
    image: "/images/candidate.svg",
  },
  {
    name: "Party B",
    image: "/images/candidate.svg",
  },
  {
    name: "Party C",
    image: "/images/candidate.svg",
  },
  {
    name: "Party D",
    image: "/images/candidate.svg",
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
    <div className="h-full w-full flex flex-col items-center bg-slate-800">
      <div className="w-full p-10 mb-10">
        <div className="self-start w-full p-10 mb-10">
          <h1 className="text-2xl font-medium text-white mb-4">
            Your Wallet Address:
          </h1>
          <input
            type="text"
            placeholder="Enter your wallet address..."
            value={walletAddress}
            onChange={handleChange}
            className="text-white bg-slate-700 text-2xl py-3 px-4 rounded-md outline-none w-full"
          />
        </div>
        <div className="flex flex-wrap justify-center items-center w-full">
          {parties.map((party) => (
            <VoteCard key={party.name} party={party} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vote;
