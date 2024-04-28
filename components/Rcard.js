import React, { useEffect } from "react";
import ResultCard from "./ResultCard";
import {
  VOTING_CONTRACT_ABI,
  VOTING_CONTRACT_ADDRESS,
} from "../const/addresses";
import { useState } from "react";
import { ethers } from "ethers";

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

const Rcard = () => {
  const [totalVotes, setTotalVotes] = useState(0);

  const handleGetTotalVotes = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(
        VOTING_CONTRACT_ADDRESS,
        VOTING_CONTRACT_ABI,
        signer
      );
      setTotalVotes((await votingContract.getTotalVotes()).toString());
    } else {
      console.log("Ethereum object does not exist!");
    }
  };

  useEffect(() => {
    handleGetTotalVotes();
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
