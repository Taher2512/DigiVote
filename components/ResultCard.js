import React, { useState } from "react";
import { useEffect } from "react";
import { ethers } from "ethers";
import {
  VOTING_CONTRACT_ABI,
  VOTING_CONTRACT_ADDRESS,
} from "../const/addresses";

function ResultCard({ id, img, name, totalVotes }) {
  const [votes, setVotes] = useState(0);
  const [votePercentage, setVotePercentage] = useState(0);

  const handleGetPartyVotes = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(
        VOTING_CONTRACT_ADDRESS,
        VOTING_CONTRACT_ABI,
        signer
      );
      try {
        const voteCount = await votingContract.getVotes(id);
        const voteCountNumber = voteCount.toString();
        setVotes(voteCountNumber);

        const percentage =
          totalVotes > 0 ? (parseInt(voteCountNumber) / totalVotes) * 100 : 0;
        setVotePercentage(percentage);
      } catch (error) {
        console.error("Failed to fetch votes:", error);
      }
    } else {
      console.log("Ethereum object does not exist!");
    }
  };

  useEffect(() => {
    handleGetPartyVotes();
  }, [id,totalVotes]);

  return (
    <div className="w-3/4 py-4 bg-white/30 rounded-full flex items-center px-16 justify-between">
      <span>
        <div className="w-24 h-24  rounded-full">
          <img src={img} alt={name} className="w-full h-full rounded-full" />
        </div>
      </span>
      <span className="w-1/2">
        <div className="flex justify-between mb-1">
          <span className=" text-lg gilroy-light text-white">{name}</span>
          <span className=" text-lg gilroy-light text-white">
          {isNaN(votePercentage) ? 0 : votePercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: (votePercentage || 0) + "%" }}
          ></div>
        </div>
      </span>
      <div className="w-40 h-16 flex items-center justify-center px-4 gilroy-light text-white text-2xl">
        <p>{votes} Votes</p>
      </div>
    </div>
  );
}

export default ResultCard;
