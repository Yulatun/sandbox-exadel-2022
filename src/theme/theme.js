import { extendTheme } from '@chakra-ui/react';

import { Button, Form, Input, Modal, Switch } from './components';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: false
};

export const theme = extendTheme({
  colors: {
    switch: {
      200: '#38B2AC',
      500: '#2C7A7B'
    }
  },
  components: {
    Button,
    Form,
    Input,
    Modal,
    Switch
  },
  config
});
