import React from "react";
import Lottie from "lottie-react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";

import lottieBlock from "../../assets/lotties/lottieBlock.json";

type LoadingModalProps = {
  isOpen: boolean;
};

export default function LoadingModal(props: LoadingModalProps) {
  const { isOpen } = props;
  console.log("isOpen : ", isOpen);
  return (
    <Modal
      hideCloseButton={true}
      backdrop={"blur"}
      isOpen={isOpen}
      //   onClose={() => {}}
    >
      <ModalContent className="bg-inherit">
        <ModalBody className="flex justify-center items-center">
          {" "}
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <Lottie
              className="h-80 w-80"
              animationData={lottieBlock}
              loop={true}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
