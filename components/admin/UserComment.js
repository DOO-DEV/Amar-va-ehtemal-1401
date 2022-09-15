import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const UserComment = ({ onClose, isOpen, userComment }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontSize="14px">
          User comment
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          <Box
            overflowY="auto"
            rounded={10}
            bg="#fef"
            px={3}
            py={4}
            fontSize="14px"
            fontWeight={600}
          >
            {userComment}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserComment;
