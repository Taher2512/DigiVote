import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function VoteCard({ party }) {
  const [selectedParty, setSelectedParty] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    setSelectedParty(party.name);
    onOpen();
  };

  return (
    <>
      <div
        className="flex  border items-center justify-between py-4 hover:bg-purple-900 rounded-full cursor-pointer w-full px-10 bg-white/20 backdrop-blur-md "
        
      >
        <img src={party.image} width={100} height={100} className="rounded-full"/>
        <span className="flex flex-col ">
        <h1 className="text-2xl font-bold text-white gilroy-bold ">{party.name}</h1>
        <p className="gilroy-light text-white text-lg ">
          {party.desc}
        </p>
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
          {(onClose) => (
            <>
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
                <Button color="primary" onPress={onClose}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default VoteCard;
