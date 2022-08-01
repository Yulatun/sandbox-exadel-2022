import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { css } from '@emotion/react';
import { CalendarDefaultTheme } from '@uselessdev/datepicker';

import {
  Button,
  Calendar,
  CalendarControl,
  CalendarDay,
  CalendarMonth,
  Input,
  List,
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

export const theme = extendTheme(CalendarDefaultTheme, {
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
    List,
    Modal,
    NumberInput,
    Select,
    Switch,
    Textarea,
    Calendar,
    CalendarControl,
    CalendarMonth,
    CalendarDay
  }
});
