import { mode } from '@chakra-ui/theme-tools';

export const List = {
  baseStyle: (props) => ({
    container: {
      bgColor: mode('white', 'gray.700')(props),
      borderWidth: '2px',
      borderRightWidth: '0',
      borderColor: mode('gray.600', 'gray.100')(props)
    },
    item: {
      pos: 'relative',
      p: '6px 0 6px 35px',
      color: mode('black', 'white')(props),
      bg: mode('white', 'gray.700')(props),
      cursor: 'pointer',
      _hover: {
        bgColor: mode('gray.100', 'gray.600')(props)
      }
    },
    icon: {
      pos: 'absolute',
      top: '30%',
      left: '10px'
    }
  }),
  defaultProps: {
    variant: null
  }
};
