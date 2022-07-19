import React, { useState } from 'react';
import {
  DeleteIcon,
  QuestionOutlineIcon,
  SettingsIcon
} from '@chakra-ui/icons';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import i18next from 'i18next';

import { LogOutIcon } from '@/assets';

import { CustomModal } from '../CustomModal,/CustomModal';

export const UserMenu = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
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
        <MenuItem
          onClick={() => setDeleteModalOpen(true)}
          icon={<DeleteIcon w={5} h={5} />}
        >
          {i18next.t('header.userMenu.delete')}
        </MenuItem>
        <MenuItem icon={<LogOutIcon width={5} height={5} />}>
          {i18next.t('header.userMenu.logout')}
        </MenuItem>
      </MenuList>
      <CustomModal
        isOpen={isDeleteModalOpen}
        onSubmit={() => setDeleteModalOpen(false)}
        onClose={() => setDeleteModalOpen(false)}
        title={i18next.t('Account deletion')}
        text={i18next.t(
          'Are you sure you want to delete your account? All your data will be lost, you can download your report from the Statistics page before confirming'
        )}
      />
    </Menu>
  );
};
