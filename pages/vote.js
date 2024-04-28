import React, { useState, useEffect } from "react";
import VoteCard from "../components/VoteCard";
import Footer from "../components/Homepage/Footer";
import Link from "next/link";

const parties = [
  {
    id: 1,
    name: "Party A",
    image: "/images/candidate.svg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus",
  },
  {
    id: 2,
    name: "Party B",
    image: "/images/candidate.svg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus",
  },
  {
    id: 3,
    name: "Party C",
    image: "/images/candidate.svg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus",
  },
  {
    id: 4,
    name: "Party D",
    image: "/images/candidate.svg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus",
  },
  {
    id: 5,
    name: "Party E",
    image: "/images/candidate.svg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus",
  },
];

function Vote() {
  const [walletAddress, setWalletAddress] = useState("");
  const [voteCasted, setVoteCasted] = useState(false);

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
      {!voteCasted ? (
        <>
          <div className="w-1/2 py-4 flex items-center justify-between bg-white/30 mt-8 rounded-xl px-8">
            <Link href={"/#"}>
            <h1 className="gilroy-bold text-white text-4xl">DigiVote.</h1>
            </Link>
            <div className="flex items-center gap-4">
              <p className="gilroy-light text-white text-sm text-ellipsis">
                {walletAddress}
              </p>

              <img src="/images/candidate.svg" width={50} />
            </div>
          </div>
          <div className="w-full p-10 mb-10 mt-4 ">
            <h1 className="text-4xl gilroy-bold text-white mb-8 text-center ">
              Cast your Vote Here .
            </h1>
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
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold rounded-full text-xl px-10 py-2.5 text-center gilroy-bold"
                >
                  Connect
                </button>
              </span>
            </div>
            <div className="flex flex-wrap justify-start items-center w-full gap-4 ">
              {parties.map((party) => (
                <VoteCard
                  key={party.name}
                  party={party}
                  setVoteCasted={setVoteCasted}
                />
              ))}
            </div>
          </div>
        </>
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
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Vote;
