import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import i18next from 'i18next';

import { CentralTheme } from '../../theme/theme';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      mr="16px"
      w="50px"
      h="50px"
      border="2px"
      borderRadius="50%"
      borderColor="transparent"
      color={CentralTheme().textColor}
      _hover={{
        border: '2px',
        borderColor: CentralTheme().textColor
      }}
      _active={{ bg: 'transparent' }}
      variant="outline"
      outline="none"
      aria-label={
        colorMode === 'light'
          ? i18next.t('header.btn.theme.dark')
          : i18next.t('header.btn.theme.light')
      }
      icon={
        colorMode === 'light' ? (
          <MoonIcon w="25px" h="25px" />
        ) : (
          <SunIcon w="30px" h="30px" />
        )
      }
      onClick={toggleColorMode}
    />
  );
};

export default ColorModeToggle;
