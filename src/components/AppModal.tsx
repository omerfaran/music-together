import {
  Button,
  ButtonProps,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FC, ReactNode } from "react";

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  body: ReactNode;
  footerButtons: ButtonProps[];
}

export const AppModal: FC<AppModalProps> = ({
  isOpen,
  onClose,
  header,
  body,
  footerButtons,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
        <ModalFooter>
          {footerButtons.map((props, index) => {
            return (
              <Button {...props} key={index}>
                {props.children}
              </Button>
            );
          })}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
