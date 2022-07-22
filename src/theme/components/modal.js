import { mode } from '@chakra-ui/theme-tools';

export const Modal = {
  baseStyle: (props) => ({
    dialog: {
      bg: mode('orange.50', 'teal.800')(props),
      borderRadius: 20,
      boxShadow: 'md'
    },
    closeButton: {
      borderRadius: 20
    }
  })
};
