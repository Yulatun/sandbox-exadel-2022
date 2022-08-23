import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
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
  useBoolean
} from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import i18next from 'i18next';

import { loginAction } from '@/api/Authorization';
import { LogoWalletIcon } from '@/assets';
import { LOCAL_STORAGE_API_KEY } from '@/helpers/constants';
import { i18n } from '@/i18n';
import { useCentralTheme } from '@/theme';

export const LoginForm = () => {
  const [show, setShow] = useBoolean();
  const { toast } = createStandaloneToast();

  const navigate = useNavigate();

  const { textColor, containerBgColor } = useCentralTheme();

  const queryClient = useQueryClient();

  const mutation = useMutation(loginAction, {
    onSuccess: (data) => {
      localStorage.setItem(LOCAL_STORAGE_API_KEY, data.data.token);
      queryClient.setQueryData(['user'], () => data.data.user);
      navigate('/', { replace: true });
    },
    onError() {
      toast({ title: i18n.t('toast.error.notAuthorized'), position: 'top' });
    }
  });
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
    mutation.mutate({ email, password });
    reset();
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
        background={containerBgColor}
      >
        <LogoWalletIcon width="45" height="45" color={textColor} />
        <Heading as="h1" mr="5px" ml="5px" size="lg" color={textColor}>
          {i18next.t('login.appName')}
        </Heading>
      </Circle>

      <Stack
        width="500px"
        p="4"
        boxShadow="xl"
        borderRadius="4px"
        background={containerBgColor}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl position="relative" mb="5px" pb="20px" isRequired>
            <FormLabel htmlFor="email">
              {i18next.t('login.form.email')}
            </FormLabel>
            <Input
              id="email"
              placeholder={i18next.t('login.form.email')}
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Wrong email format'
                },
                max: { value: 254, message: 'Cannot exceed 254 characters' }
              })}
            />
            {errors && errors.email && (
              <FormHelperText
                position="absolute"
                bottom="0"
                left="0"
                color="red"
              >
                {errors.email.message && errors.email.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl position="relative" mb="5px" pb="20px" isRequired>
            <FormLabel htmlFor="password">
              {i18next.t('login.form.password')}
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                placeholder={i18next.t('login.form.password')}
                type={show ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
              />
              <InputRightElement width="4.5rem">
                <Button
                  variant="secondary"
                  h="1.75rem"
                  size="sm"
                  onClick={setShow.toggle}
                >
                  {show ? (
                    <ViewIcon w={5} h={5} />
                  ) : (
                    <ViewOffIcon w={5} h={5} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors && errors.password && (
              <FormHelperText
                position="absolute"
                bottom="0"
                left="0"
                color="red"
              >
                {errors.password.message && errors.password.message}
              </FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            disabled={isEmpty}
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
