import React, { useEffect } from "react";
import Rcard from "../components/Rcard.js";
import Footer from "../components/Homepage/Footer.js";
import { ethers } from "ethers";

const contractAddress = "0x10A09ddBd357AB82d1a86e58351A5B36524A28DB";
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "partyId",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "partyId",
        type: "uint256",
      },
    ],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "totalVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "votesByVoter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

function results() {
  const handleGetVoteCount = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const transactionResponse = await votingContract.getVotes(1);
        console.log(transactionResponse.toString());
      } catch (error) {
        console.error("Some error occurred!", error);
      }
    } else {
      console.log("Ethereum object does not exist!");
    }
  };

  useEffect(() => {
    handleGetVoteCount();
  }, []);

  return (
    <main className="w-screen h-screen overflow-auto">
      <h1 className="text-7xl text-center my-12 gilroy-bold text-white">
        Results
      </h1>
      <Rcard />
      <Footer />
    </main>
  );
}

export default results;
