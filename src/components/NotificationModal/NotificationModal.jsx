import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react';
import i18next from 'i18next';

export const NotificationModal = ({ isOpen, onClose, onSubmit, text }) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent p={2}>
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            {text}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Stack direction="row" spacing={5}>
            <Button variant="secondary" onClick={onSubmit}>
              {i18next.t('button.okay')}
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
