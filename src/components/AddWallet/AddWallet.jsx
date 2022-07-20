import { useForm } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm();

  const onSubmit = function (data) {
    console.log(data);
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Add new wallet</Button>

      {/* After coding is done - set isOpen={isOpen} in modal */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.name} isRequired py="3">
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  {...register('name', { required: 'This field is required' })}
                  type="text"
                  placeholder="My new wallet"
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl py="3">
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <Input
                  {...register('amount', { valueAsNumber: true })}
                  type="number"
                />
              </FormControl>

              <FormControl isInvalid={errors.currency} isRequired py="3">
                <FormLabel htmlFor="currency">Currency</FormLabel>
                <Select
                  {...register('currency', {
                    required: 'This field is required'
                  })}
                  placeholder="Select option"
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="PLN">PLN</option>
                </Select>
                <FormErrorMessage>
                  {errors.currency && errors.currency.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl py="3">
                <FormLabel htmlFor="setDefault">Set as default</FormLabel>
                <Switch {...register('setDefault')} size="lg" />
                <FormHelperText>
                  If you choose this wallet as default, settings of another
                  default wallet will be changed and a new wallet will be
                  default.
                </FormHelperText>
              </FormControl>

              <ModalFooter>
                <Button
                  onClick={!isValid ? handleSubmit(onSubmit) : onClose}
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                >
                  Save
                </Button>
                <Button mr={-3} onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
