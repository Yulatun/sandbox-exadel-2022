/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack
} from '@chakra-ui/react';
import i18next from 'i18next';

export const LoginForm = () => {
  const [show, setShow] = React.useState(false);

  
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    reValidateMode: 'onSubmit',
    mode: 'onTouched'
  });

  const email = watch('email');
  const password = watch('password');
  const isEmpty = !email || !password;

  const onSubmit = (data) => {
   
    reset();
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Stack
      width="500px"
      p="4"
      boxShadow="xl"
      borderRadius="4px"
      background="white"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormControl>
          <FormLabel htmlFor="email">{i18next.t('Email')}</FormLabel>
          <Input
            id="email"
            type="email"
            {...register('email', { required: true })}
          />
          {errors && errors.email && (
            <FormHelperText color="red">
              {errors.email.message && errors.email.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">{i18next.t('Password')}</FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              type={show ? 'text' : 'password'}
              {...register('password', { required: true })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewIcon w={5} h={5} /> : <ViewOffIcon w={5} h={5} />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors && errors.password && (
            <FormHelperText color="red">
              {errors.password.message && errors.password.message}
            </FormHelperText>
          )}
        </FormControl>

        <Button type="submit" disabled={isEmpty} mt="10px" colorScheme="purple">
          {i18next.t('Log in')}
        </Button>
      </form>
    </Stack>
  );
};
