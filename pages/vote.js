import React, { useState, useEffect } from "react";
import VoteCard from "../components/VoteCard";
import Link from "next/link";

const parties = [
  {
    id: 1,
    name: "Party A",
    image: "/images/candidate.svg",
  },
  {
    id: 2,
    name: "Party B",
    image: "/images/candidate.svg",
  },
  {
    id: 3,
    name: "Party C",
    image: "/images/candidate.svg",
  },
  {
    id: 4,
    name: "Party D",
    image: "/images/candidate.svg",
  },
];

function Vote() {
  const [walletAddress, setWalletAddress] = useState("");
  const [voteCasted, setVoteCasted] = useState(true);

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
      {!voteCasted ? (
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
              <VoteCard
                key={party.id}
                party={party}
                setVoteCasted={setVoteCasted}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen w-full p-10 mb-10">
          <p className="text-white text-2xl mb-5">Your vote has been casted!</p>
          <Link href="/results">
            <button className="text-white text-2xl rounded-md px-4 py-3  gilroy-light bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800">
              Check Live Results {"-->"}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Vote;
