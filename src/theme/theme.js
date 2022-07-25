import { extendTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';

import { Button, Form, Input, Modal, Switch } from './components';

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
