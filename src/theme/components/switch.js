import { mode } from '@chakra-ui/theme-tools';

export const Switch = {
  baseStyle: (props) => ({
    track: {
      bg: mode('gray.300', 'teal.700')(props)
    },
    thumb: {
      bg: mode('orange.50', 'white')(props)
    }
  }),
  defaultProps: {
    colorScheme: 'switch'
  }
};
