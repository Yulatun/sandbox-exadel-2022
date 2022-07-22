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
  Stack,
  Text
} from '@chakra-ui/react';
import i18next from 'i18next';

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  text
}) => {
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
          <Stack direction="row" spacing={5}>
            <Button colorScheme="red" onClick={onSubmit}>
              {i18next.t('modal.deleteAccount.button.yes')}
            </Button>
            <Button onClick={onClose} invert>
              {i18next.t('modal.deleteAccount.button.no')}
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
