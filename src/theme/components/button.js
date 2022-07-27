import { mode } from '@chakra-ui/theme-tools';

export const Button = {
  variants: {
    primary: (props) => ({
      bg: mode('teal.600', 'orange.200')(props),
      color: mode('orange.50', 'teal.900')(props),
      _hover: {
        bg: mode('teal.700', 'orange.300')(props),
        boxShadow: 'lg',
        transition: 'all 0.3s ease-out'
      },
      _active: {
        boxShadow: 'xl'
      }
    }),
    secondary: (props) => ({
      bg: 'transparent',
      border: '2px solid',
      borderColor: mode('teal.600', 'orange.200')(props),
      color: mode('teal.700', 'orange.200')(props),
      _hover: {
        borderColor: mode('teal.700', 'orange.300')(props),
        color: mode('teal.800', 'orange.300')(props),
        boxShadow: 'xl',
        transition: 'all 0.3s ease-out'
      },
      _active: {
        boxShadow: '2xl'
      }
    }),
    danger: (props) => ({
      bg: mode('red.500', 'red.600')(props),
      color: 'white',
      _hover: {
        bg: mode('red.600', 'red.500')(props),
        boxShadow: 'lg',
        transition: 'all 0.3s ease-out'
      },
      _active: {
        boxShadow: 'xl'
      }
    })
  },
  defaultProps: {
    variant: 'primary'
  }
};
