import { SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import i18next from 'i18next';

import { MoonIcon } from '../assets';

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const iconsThemeColor = useColorModeValue('#000', '#fff');

  return (
    <IconButton
      mr="20px"
      w="50px"
      h="50px"
      border="2px"
      borderRadius="50%"
      colorScheme="gray"
      bgColor="rgba(237, 242, 247, .2)"
      variant="outline"
      aria-label={
        colorMode === 'light'
          ? i18next.t('header.btn.theme.light')
          : i18next.t('header.btn.theme.dark')
      }
      icon={
        colorMode === 'light' ? (
          <SunIcon w="30px" h="30px" color={iconsThemeColor} />
        ) : (
          <MoonIcon color={iconsThemeColor} />
        )
      }
      onClick={toggleColorMode}
    />
  );
};
