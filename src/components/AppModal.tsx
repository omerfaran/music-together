import {
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FC, ReactNode } from "react";
import { Button } from "./ui/Button/Button";

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  body: ReactNode;
  footerButtons?: ButtonProps[];
  //  TODO - This is so stupid, probably better to create a second component
  imageModal?: boolean;
}

export const AppModal: FC<AppModalProps> = ({
  isOpen,
  onClose,
  header,
  body,
  footerButtons,
  imageModal,
}) => {
  // TODO - bad solution !! FIX
  const handleClose = () => {
    setTimeout(() => {
      onClose();
    }, 10);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      placement="top-center"
      classNames={{
        base: `${imageModal ? "border-2 border-white" : ""}`,
        body: `${imageModal ? "p-0" : ""}`,
      }}
      motionProps={{
        // This is completely optional, he just modifies the default animations, so it moves from bottom to center
        variants: {
          enter: { y: 0, opacity: 100, transition: { duration: 0.3 } },
          exit: { y: 100, opacity: 0, transition: { duration: 0.3 } },
        },
      }}
    >
      <ModalContent>
        {!imageModal && (
          <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
        )}

        <ModalBody>{body}</ModalBody>
        {!imageModal && (
          <ModalFooter>
            {footerButtons?.map((props, index) => {
              return (
                <Button {...props} key={index}>
                  {props.children}
                </Button>
              );
            })}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
