export const Input = {
  baseStyle: (props) => ({
    field: {
      color: props.colorMode === 'dark' ? 'white' : 'black',
      bg: props.colorMode === 'dark' ? 'teal.600' : 'orange.100',
      borderColor: props.colorMode === 'dark' ? 'orange.200' : 'teal.900',
      borderWidth: 2,
      _focus: {
        borderColor: props.colorMode === 'dark' ? 'teal.600' : 'orange.100',
        color: props.colorMode === 'dark' ? 'black' : 'white',
        bg: props.colorMode === 'dark' ? 'orange.100' : 'teal.600'
      },
      _hover: {
        borderColor: props.colorMode === 'dark' ? 'orange.100' : 'teal.600'
      }
    }
  }),
  defaultProps: {
    variant: null // null here!!!
  }
};
