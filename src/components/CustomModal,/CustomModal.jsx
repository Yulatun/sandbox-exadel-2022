import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import i18next from 'i18next';

export const CustomModal = ({ isOpen, onClose, onSubmit, title, text }) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
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
            {i18next.t('Yes')}
          </Button>
          <Button onClick={onClose} invert>
            {i18next.t('No')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
