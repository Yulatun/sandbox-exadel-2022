import { extendTheme } from '@chakra-ui/react';

import { Button, Form, Input, Modal } from './components';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: false
};

export const theme = extendTheme({
  components: {
    Button,
    Form,
    Input,
    Modal
  },
  config
});
