import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  Circle,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useBoolean,
  useColorModeValue
} from '@chakra-ui/react';
import i18next from 'i18next';

import { LogoWalletIcon } from '@/assets';

export const LoginForm = () => {
  const [show, setShow] = useBoolean();

  const navigate = useNavigate();
  const iconsThemeColor = useColorModeValue('purple.900', 'white');

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

  const onSubmit = () => {
    reset();
    navigate('/', { replace: true });
  };

  return (
    <>
      <Circle
        boxShadow="xl"
        m="0 auto"
        mb="70px"
        borderRadius="100px"
        size="200px"
        justify="center"
        flexDirection="column"
        borderWidth="1px"
        background="white"
      >
        <LogoWalletIcon width="45" height="45" color={iconsThemeColor} />
        <Heading as="h1" mr="5px" ml="5px" size="lg" color={iconsThemeColor}>
          {i18next.t('login.appName')}
        </Heading>
      </Circle>

      <Stack
        width="500px"
        p="4"
        boxShadow="xl"
        borderRadius="4px"
        background="white"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">
              {i18next.t('login.form.email')}
            </FormLabel>
            <Input
              id="email"
              placeholder={i18next.t('login.form.email')}
              type="email"
              {...register('email', { required: true })}
            />
            {errors && errors.email && (
              <FormHelperText color="red">
                {errors.email.message && errors.email.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">
              {i18next.t('login.form.password')}
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                placeholder={i18next.t('login.form.password')}
                type={show ? 'text' : 'password'}
                {...register('password', { required: true })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={setShow.toggle}>
                  {show ? (
                    <ViewIcon w={5} h={5} />
                  ) : (
                    <ViewOffIcon w={5} h={5} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors && errors.password && (
              <FormHelperText color="red">
                {errors.password.message && errors.password.message}
              </FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            disabled={isEmpty}
            colorScheme="purple"
            display="block"
            margin="0 auto"
            mt="20px"
          >
            {i18next.t('login.form.btn.login')}
          </Button>
        </form>
      </Stack>
    </>
  );
};
