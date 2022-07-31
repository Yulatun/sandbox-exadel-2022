import { BellIcon } from '@chakra-ui/icons';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import i18next from 'i18next';

export const Notification = () => {
  const iconsThemeColor = useColorModeValue('teal.900', 'orange.300');
  const iconsHoverThemeColor = useColorModeValue('teal.900', 'orange.300');

  return (
    <IconButton
      mr={['14px', '14px', '14px', '0px']}
      w="50px"
      h="50px"
      borderRadius="50%"
      borderColor="transparent"
      variant="outline"
      color={iconsThemeColor}
      _active={{ bg: 'transparent' }}
      _hover={{
        border: '2px',
        borderColor: iconsHoverThemeColor
      }}
      aria-label={i18next.t('header.btn.notifications')}
      icon={<BellIcon w="30px" h="30px" />}
    />
  );
};
