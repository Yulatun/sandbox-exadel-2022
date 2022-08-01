import { BellIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import i18next from 'i18next';

import { CentralTheme } from '../../theme/theme';

export const Notification = () => {
  return (
    <IconButton
      mr={['14px', '14px', '14px', '0px']}
      w="50px"
      h="50px"
      borderRadius="50%"
      borderColor="transparent"
      variant="outline"
      color={CentralTheme().textColor}
      _active={{ bg: 'transparent' }}
      _hover={{
        border: '2px',
        borderColor: CentralTheme().textColor
      }}
      aria-label={i18next.t('header.btn.notifications')}
      icon={<BellIcon w="30px" h="30px" />}
    />
  );
};
