import React from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

export const CustomModal = ({ onSubmit, title, text }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(isOpen);
  return (
    <Box>
      <Button onClick={onOpen}>Delete account</Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        h="200px"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {text}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onSubmit}>
              {i18next.t('Yes')},
            </Button>
            <Button onClick={onClose} invert>
              {i18next.t('No')},
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomModal;
