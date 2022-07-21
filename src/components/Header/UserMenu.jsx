import React from 'react';
import {
  DeleteIcon,
  QuestionOutlineIcon,
  SettingsIcon
} from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { LogOutIcon } from '@/assets';

import { DeleteConfirmationModal } from '../DeleteConfirmationModal';

export const UserMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconsThemeColor = useColorModeValue('black', 'white');

  return (
    <Menu>
      <MenuButton
        w="50px"
        h="50px"
        transition="all 0.2s"
        borderRadius="50%"
        aria-label={i18next.t('header.userMenu')}
        _hover={{ bg: 'gray.100' }}
        _focus={{ boxShadow: 'outline' }}
      >
        <SettingsIcon w="30px" h="30px" />
      </MenuButton>
      <MenuList>
        <MenuItem icon={<SettingsIcon w={5} h={5} />}>
          {i18next.t('header.userMenu.settings')}
        </MenuItem>
        <MenuItem icon={<QuestionOutlineIcon w={5} h={5} />}>
          {i18next.t('header.userMenu.help')}
        </MenuItem>
        <MenuItem onClick={onOpen} icon={<DeleteIcon w={5} h={5} />}>
          {i18next.t('header.userMenu.delete')}
        </MenuItem>
        <MenuItem
          icon={<LogOutIcon width={5} height={5} color={iconsThemeColor} />}
        >
          {i18next.t('header.userMenu.logout')}
        </MenuItem>
      </MenuList>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onSubmit={onClose}
        onClose={onClose}
        title={i18next.t('modal.deleteAccount.title')}
        text={i18next.t('modal.deleteAccount.text')}
      />
    </Menu>
  );
};
