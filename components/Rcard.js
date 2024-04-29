import React, { useEffect } from "react";
import ResultCard from "./ResultCard";
import {
  VOTING_CONTRACT_ABI,
  VOTING_CONTRACT_ADDRESS,
} from "../const/addresses";
import { useState } from "react";
import { ethers } from "ethers";
import { app, db } from "../const/firebase/config";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const Rcard = () => {
  const [totalVotes, setTotalVotes] = useState(0);
  const [parties, setparties] = useState([]);
  const getParties = async () => {
    const q = query(collection(db, "parties"));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.data().id,
        name: doc.data().name,
        image: doc.data().imageUrl,
        desc: "Hello please vote me",
      });
    });
    setparties(data);
  };
  const handleGetTotalVotes = async () => {
    const { ethereum } = window;

    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const votingContract = new ethers.Contract(
          VOTING_CONTRACT_ADDRESS,
          VOTING_CONTRACT_ABI,
          signer
        );
        const totVotes = await votingContract.getTotalVotes();
        setTotalVotes(totVotes.toString());
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Ethereum object does not exist!");
    }
  };

  useEffect(() => {
    handleGetTotalVotes();
    getParties();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 items-center mb-12">
      {parties.map((party) => (
        <ResultCard
          key={party.id}
          id={party.id}
          name={party.name}
          img={party.image}
          totalVotes={totalVotes}
        />
      ))}
    </div>
  );
};

export default Rcard;
