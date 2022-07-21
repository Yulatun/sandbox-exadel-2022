import { extendTheme } from '@chakra-ui/react';

import { Button, Input } from './components';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: false
};

export const theme = extendTheme({
  components: {
    Button,
    Input
  },
  config
});
