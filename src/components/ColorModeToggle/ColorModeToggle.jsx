import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import i18next from 'i18next';

import { useCentralTheme } from '@/theme';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { textColor } = useCentralTheme();

  return (
    <IconButton
      mr={{ base: 'auto', lg: 'none' }}
      minW={12}
      minH={12}
      border="2px transparent"
      borderRadius="50%"
      color={textColor}
      _hover={{
        border: '2px',
        borderColor: textColor
      }}
      _active={{ bg: 'transparent' }}
      variant="outline"
      aria-label={i18next.t(`header.btn.theme.${colorMode}`)}
      icon={
        colorMode === 'light' ? (
          <MoonIcon w={6} h={6} />
        ) : (
          <SunIcon w={7} h={7} />
        )
      }
      onClick={toggleColorMode}
    />
  );
};

export default ColorModeToggle;
