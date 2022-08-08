import { extendTheme } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
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
export const teal900 = 'teal.900',
  teal800 = 'teal.800',
  teal700 = 'teal.700',
  teal600 = 'teal.600',
  orange300 = 'orange.300',
  orange200 = 'orange.200',
  orange100 = 'orange.100',
  orange50 = 'orange.50',
  gray400 = 'gray.400',
  whiteAlpha400 = 'whiteAlpha.400',
  gray100 = 'gray.100',
  whiteAlpha300 = 'whiteAlpha.300',
  gray200 = 'gray.200';

export const useCentralTheme = () => {
  let bgColor = useColorModeValue(orange100, teal900);
  let textColor = useColorModeValue(teal900, orange300);
  let popupBgColor = useColorModeValue(orange50, teal800);
  let containerBgColor = useColorModeValue(orange50, teal600);
  let popupTextColor = useColorModeValue(teal900, orange100);
  let hoverBgColor = useColorModeValue(orange100, teal600);
  let popupExpBgColor = useColorModeValue(orange50, teal700);
  let popupExpTextColor = useColorModeValue(teal900, orange50);
  let inputValueColor = useColorModeValue(gray400, whiteAlpha400);
  let inputSelectBg = useColorModeValue(gray100, whiteAlpha300);
  let inputSelectBorderColor = useColorModeValue(gray200, whiteAlpha300);
  let badgeBgColor = useColorModeValue(orange100, teal700);
  let sectionBgColor = useColorModeValue(orange200, teal700);
  let notificationUnreadBgColor = useColorModeValue(orange200, teal700);
  let notificationReadBgColor = useColorModeValue(orange50, teal900);
  return {
    bgColor,
    textColor,
    popupBgColor,
    popupTextColor,
    hoverBgColor,
    popupExpBgColor,
    popupExpTextColor,
    inputValueColor,
    inputSelectBg,
    inputSelectBorderColor,
    containerBgColor,
    badgeBgColor,
    sectionBgColor,
    notificationUnreadBgColor,
    notificationReadBgColor
  };
};

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
    outline: '0 0 2px 4px rgba(246, 173, 85, 0.6);',
    headerShadow: '0px 5px 3px -5px'
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
