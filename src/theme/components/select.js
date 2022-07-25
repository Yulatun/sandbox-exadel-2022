import { mode } from '@chakra-ui/theme-tools';

export const Select = {
  variants: {
    outline: (props) => ({
      field: {
        background: 'inherit',
        border: '1px solid',
        borderColor: mode('blackAlpha.500', 'inherit')(props),
        _focus: {
          zIndex: 1,
          borderColor: 'transparent',
          boxShadow: '0 0 2px 2px rgba(246, 173, 85, 0.6)'
        },
        _hover: { borderColor: mode('gray.300', 'whiteAlpha.400')(props) }
      }
    })
  }
};
