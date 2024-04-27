import { useState } from "react";
import { ethers } from "ethers";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function VoteCard({ party, setVoteCasted }) {
  const [selectedParty, setSelectedParty] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  const handleOpen = () => {
    setSelectedParty(party.name);
    onOpen();
  };

  const handleVote = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(contractAddress, abi, signer);

      try {
        setTransactionInProgress(true);
        const transactionResponse = await votingContract.vote(party.id);
        await transactionResponse.wait();
        setTransactionInProgress(false);
        onClose();
        setVoteCasted(true);
        toast.success("Your vote has been casted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.error("Transaction failed", error);
        setTransactionInProgress(false);
        onClose();
        setVoteCasted(false);
        toast.error("You have already voted!", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } else {
      console.log("Ethereum object does not exist!");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div
        className="flex flex-col justify-center items-center h-80 hover:bg-slate-700 rounded-md cursor-pointer w-full md:w-1/3 p-4"
        onClick={handleOpen}
      >
        <img src={party.image} width={150} height={150} className="mb-7" />
        <h1 className="text-3xl font-bold text-white">{party.name}</h1>
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {selectedParty}
          </ModalHeader>
          <ModalBody>
            <p className="flex flex-row">
              Are you sure you want to vote for
              <p className="ml-1 font-bold">{selectedParty}?</p>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleVote}
              disabled={transactionInProgress}
            >
              {transactionInProgress ? "Processing..." : "Yes"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default VoteCard;
