import React from 'react';
import {
  DeleteIcon,
  QuestionOutlineIcon,
  SettingsIcon
} from '@chakra-ui/icons';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import i18next from 'i18next';

import { LogOutIcon } from '@/assets';

export const UserMenu = ({ setIsAuth }) => {
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
        <MenuItem icon={<DeleteIcon w={5} h={5} />}>
          {i18next.t('header.userMenu.delete')}
        </MenuItem>
        <MenuItem
          icon={<LogOutIcon w={5} h={5} />}
          onClick={() => {
            setIsAuth(false);
          }}
        >
          {i18next.t('header.userMenu.logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
