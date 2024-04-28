import React, { useState, useEffect } from "react";
import VoteCard from "../components/VoteCard";
import Footer from "../components/Homepage/Footer";
import Link from "next/link";
import { app, db } from "../const/firebase/config";
import {  collection, getDocs, query } from "firebase/firestore";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

function Vote() {
  const address=useAddress()
  const [walletAddress, setWalletAddress] = useState("");
  const [voteCasted, setVoteCasted] = useState(false);
  const [parties, setparties] = useState([])
  useEffect(() => {
    const address = localStorage.getItem("walletAddress");
    if (address) {
      setWalletAddress(address);
    }
    getParties()
  }, []);

  const getParties=async()=>{
    const q = query(collection(db, "parties"));
    const querySnapshot = await getDocs(q);
    let data=[]
    querySnapshot.forEach((doc) => {
      data.push({id:doc.data().id,name:doc.data().name,image:doc.data().imageUrl,desc:doc.data().desc})
    });
    setparties(data)
  }

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
                {!walletAddress?address:walletAddress}
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
                
                {!walletAddress&&<ConnectWallet
                  theme={"dark"}
                  style={{ width: "50%" }}
                  className="bg-white"
                />}
              </span>
            </div>
            <div className="flex flex-wrap justify-start items-center w-full gap-4 ">
              {parties.map((party) => (
                <VoteCard
                  key={party.name}
                  party={party}
                  setVoteCasted={setVoteCasted}
                  walletAddress={!walletAddress?address:walletAddress} 
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
