import { extendTheme } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
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
export const teal900 = 'teal.900',
  teal800 = 'teal.800',
  teal700 = 'teal.700',
  teal600 = 'teal.600',
  orange300 = 'orange.300',
  orange100 = 'orange.100',
  orange50 = 'orange.50';

export const useCentralTheme = () => {
  let bgColor = useColorModeValue(orange100, teal900);
  let textColor = useColorModeValue(teal900, orange300);
  let popupBgColor = useColorModeValue(orange50, teal800);
  let popupTextColor = useColorModeValue(teal900, orange100);
  let hoverBgColor = useColorModeValue(orange100, teal600);
  return {
    bgColor,
    textColor,
    popupBgColor,
    popupTextColor,
    hoverBgColor
  };
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
      200: '#FBD38D',
      500: '#2C7A7B'
    }
  },
  shadows: {
    outline: '0 0 2px 4px rgba(246, 173, 85, 0.6);',
    headerShadow: '0px 5px 3px -5px'
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
