export const Button = {
  variants: {
    primary: (props) => ({
      borderWidth: 2,
      borderColor: props.colorMode === 'dark' ? 'teal.900' : 'orange.50',
      color: props.colorMode === 'dark' ? 'teal.900' : 'orange.100',
      bg: props.colorMode === 'dark' ? 'orange.100' : 'teal.800',
      _hover: {
        color: props.colorMode === 'dark' ? 'teal.900' : 'orange.100',
        bg: props.colorMode === 'dark' ? 'orange.200' : 'teal.600',
        _disabled: {
          bg: props.colorMode === 'dark' ? 'orange.100' : 'teal.800'
        }
      }
    }),
    secondary: (props) => ({
      borderWidth: 2,
      borderColor: props.colorMode === 'dark' ? 'orange.100' : 'teal.900',
      color: props.colorMode === 'dark' ? 'orange.100' : 'teal.900',
      bg: props.colorMode === 'dark' ? 'teal.800' : 'orange.50',
      _hover: {
        bg: props.colorMode === 'dark' ? 'teal.600' : 'orange.100',
        _disabled: {
          bg: props.colorMode === 'dark' ? 'teal.800' : 'orange.50'
        }
      }
    }),
    danger: (props) => ({
      borderWidth: 2,
      borderColor: 'red.600',
      color: 'orange.100',
      bg: 'red.600',
      _hover: props.disabled
        ? null
        : {
            color: 'orange.50',
            borderColor: 'red.500',
            bg: 'red.500'
          }
    })
  },
  defaultProps: {
    variant: 'primary'
  }
};
