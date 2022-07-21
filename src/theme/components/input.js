export const Input = {
  baseStyle: (props) => ({
    field: {
      color: props.colorMode === 'dark' ? 'white' : 'black',
      bg: props.colorMode === 'dark' ? 'teal.600' : 'orange.50',
      borderColor: props.colorMode === 'dark' ? 'orange.100' : 'teal.900',
      borderWidth: 2,
      _focus: {
        borderColor: props.colorMode === 'dark' ? 'orange.100' : 'teal.900',
        color: props.colorMode === 'dark' ? 'white' : 'black',
        _placeholder: {
          color: props.colorMode === 'dark' ? 'teal.600' : 'orange.50'
        }
      },
      _hover: {
        borderColor: props.colorMode === 'dark' ? 'teal.900' : 'orange.100'
      },
      _placeholder: {
        color: props.colorMode === 'dark' ? 'orange.50' : 'teal.600'
      }
    }
  }),
  defaultProps: {
    variant: null // null here!!!
  }
};
