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
        className="flex flex-col justify-center items-center h-80 hover:bg-slate-700 rounded-md cursor-pointer w-full md:w-1/3 p-4"
        onClick={handleOpen}
      >
        <img src={party.image} width={150} height={150} className="mb-7" />
        <h1 className="text-3xl font-bold text-white">{party.name}</h1>
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
