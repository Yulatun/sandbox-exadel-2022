import { useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  useDisclosure
} from '@chakra-ui/react';

export const AddWallet = () => {
  const [input, setInput] = useState('');
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const isError = input === '';
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Add new wallet</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="new-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <FormControl isRequired isInvalid={isError} py="3">
                <FormLabel>Name</FormLabel>
                <Input type="text" value={input} onChange={handleInputChange} />
                {!isError ? (
                  <FormHelperText>Enter the name of you wallet.</FormHelperText>
                ) : (
                  <FormErrorMessage>Name is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl py="3">
                <FormLabel>Amount</FormLabel>
                <Input type="number" />
              </FormControl>

              <FormControl isRequired py="3">
                <FormLabel>Currency</FormLabel>
                <Select placeholder="Select option">
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="PLN">PLN</option>
                </Select>
              </FormControl>

              <FormControl py="3">
                <FormLabel>Set as default</FormLabel>
                <Switch size="lg" />
                <FormHelperText>
                  If you choose this wallet as default, settings of another
                  default wallet will be changed and a new wallet will be
                  default.
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              form="new-form"
              onClick={onClose}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button type="submit" form="new-form" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
