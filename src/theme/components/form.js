const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)'
};

export const Form = {
  baseStyle: (props) => ({
    container: {
      label: {
        color: props.colorMode === 'dark' ? 'orange.100' : 'teal.900'
      }
    }
  }),
  variants: {
    floating: (props) => ({
      container: {
        _focusWithin: {
          label: {
            ...activeLabelStyles,
            color: props.colorMode === 'dark' ? 'orange.50' : 'teal.900'
          }
        },
        'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
          {
            ...activeLabelStyles
          },
        label: {
          top: 0,
          left: 0,
          zIndex: 2,
          position: 'absolute',
          pointerEvents: 'none',
          mx: 3,
          px: 1,
          my: 2,
          transformOrigin: 'left top',
          bg: props.colorMode === 'dark' ? 'teal.600' : 'orange.50',
          color: props.colorMode === 'dark' ? 'orange.50' : 'teal.600'
        }
      }
    })
  }
};
