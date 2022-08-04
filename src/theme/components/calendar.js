import { mode } from '@chakra-ui/theme-tools';

export const Calendar = {
  parts: ['calendar'],
  baseStyle: (props) => ({
    calendar: {
      bg: mode('orange.100', 'teal.900')(props),
      borderWidth: '2px',
      borderLeftWidth: '0',
      borderColor: mode('gray.600', 'gray.100')(props),
      color: mode('teal.800', 'orange.100')(props),
      rounded: 'none',
      shadow: 'none'
    }
  })
};

export const CalendarControl = {
  parts: ['button'],
  baseStyle: (props) => ({
    button: {
      h: 6,
      px: 2,
      rounded: 'none',
      fontSize: 'sm',
      color: mode('orange.100', 'teal.900')(props),
      bg: mode('teal.800', 'orange.100')(props),
      _hover: {
        color: mode('orange.100', 'teal.900')(props),
        bg: mode('teal.600', 'orange.200')(props)
      }
    }
  })
};

export const CalendarMonth = {
  parts: ['month', 'weekday'],
  baseStyle: (props) => ({
    month: {
      mr: '10px'
    },
    weekday: {
      color: mode('teal.800', 'orange.100')(props)
    }
  })
};

export const CalendarDay = {
  baseStyle: (props) => ({
    rounded: 'none',
    bgColor: 'transparent',
    borderWidth: 1,
    borderColor: mode('orange.300', 'teal.600')(props),
    color: mode('teal.800', 'orange.100')(props),

    _hover: {
      color: mode('orange.100', 'teal.800')(props),
      bgColor: mode('teal.800', 'orange.100')(props)
    },

    _disabled: {
      color: mode('teal.800', 'orange.100')(props),
      _hover: {
        cursor: 'initial',
        bgColor: 'transparent'
      }
    }
  }),

  sizes: {
    sm: {
      h: 8
    }
  },

  variants: {
    selected: (props) => ({
      color: mode('orange.100', 'teal.800')(props),
      bgColor: mode('teal.600', 'orange.200')(props),

      _hover: {
        bgColor: mode('teal.800', 'orange.300')(props)
      }
    }),

    range: (props) => ({
      color: mode('orange.100', 'teal.800')(props),
      bgColor: mode('teal.400', 'orange.100')(props),

      _hover: {
        bgColor: mode('teal.800', 'orange.300')(props)
      },

      _disabled: {
        _hover: {
          bgColor: mode('teal.300', 'orange.100')(props)
        }
      }
    }),

    outside: (props) => ({
      color: mode('orange.200', 'teal.700')(props)
    }),
    today: (props) => ({
      color: mode('teal.900', 'teal.800')(props),
      bgColor: mode('orange.400', 'teal.500')(props),
      _hover: {
        bgColor: mode('teal.800', 'orange.300')(props)
      }
    })
  },

  defaultProps: {
    size: 'sm'
  }
};
