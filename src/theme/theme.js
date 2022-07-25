import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import { Button, Form, Input, Modal, Switch } from './components';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: false
};

export const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: mode('orange.100', 'teal.900')(props)
      }
    })
  },
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
  }
});
