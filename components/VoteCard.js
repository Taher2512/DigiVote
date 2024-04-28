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
import {
  VOTING_CONTRACT_ABI,
  VOTING_CONTRACT_ADDRESS,
} from "../const/addresses";

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
      const votingContract = new ethers.Contract(
        VOTING_CONTRACT_ADDRESS,
        VOTING_CONTRACT_ABI,
        signer
      );

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
      <div className="flex  border items-center justify-between py-4 hover:bg-purple-900 rounded-full cursor-pointer w-full px-10 bg-white/20 backdrop-blur-md ">
        <img
          src={party.image}
          width={100}
          height={100}
          className="rounded-full"
        />
        <span className="flex flex-col ">
          <h1 className="text-2xl font-bold text-white gilroy-bold ">
            {party.name}
          </h1>
          <p className="gilroy-light text-white text-lg ">{party.desc}</p>
        </span>
        <button
          type="button"
          onClick={handleOpen}
          className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-full text-xl px-10 py-2.5 text-center gilroy-bold"
        >
          Vote
        </button>
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {selectedParty}
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-row">
              Are you sure you want to vote for
              <p className="ml-1 font-bold">{selectedParty}?</p>
            </div>
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
