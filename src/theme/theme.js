import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { css } from '@emotion/react';

import {
  Button,
  Input,
  Modal,
  NumberInput,
  Select,
  Switch,
  Textarea
} from './components';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: false
};

export const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

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
      200: '#FBD38D',
      500: '#2C7A7B'
    }
  },
  shadows: {
    outline: '0 0 2px 4px rgba(246, 173, 85, 0.6);'
  },
  components: {
    Button,
    Input,
    Modal,
    NumberInput,
    Select,
    Switch,
    Textarea
  }
});
