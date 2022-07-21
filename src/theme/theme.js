import { extendTheme } from '@chakra-ui/react';

import { Button, Form, Input } from './components';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: false
};

export const theme = extendTheme({
  components: {
    Button,
    Input,
    Form
  },
  config
});
