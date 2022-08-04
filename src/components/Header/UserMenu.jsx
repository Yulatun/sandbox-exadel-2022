import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { LogOutIcon } from '@/assets';

import { useCentralTheme } from '../../theme/theme';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal';

export const UserMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { hoverBgColor, popupBgColor, popupTextColor, textColor } =
    useCentralTheme();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <Menu>
      <MenuButton
        w="50px"
        h="50px"
        border="2px"
        borderColor="transparent"
        borderRadius="50%"
        aria-label={i18next.t('header.userMenu')}
        color={textColor}
        outline="none"
        _hover={{
          border: '2px',
          borderColor: textColor
        }}
      >
        <SettingsIcon w="25px" h="25px" />
      </MenuButton>
      <MenuList bg={popupBgColor} color={popupTextColor} fontWeight="bold">
        <MenuItem
          _hover={{
            bg: hoverBgColor
          }}
          icon={<SettingsIcon w={5} h={5} color={popupTextColor} />}
        >
          {i18next.t('header.userMenu.settings')}
        </MenuItem>
        <MenuItem
          _hover={{
            bg: hoverBgColor
          }}
          icon={<QuestionOutlineIcon w={5} h={5} color={popupTextColor} />}
        >
          {i18next.t('header.userMenu.help')}
        </MenuItem>
        <MenuItem
          _hover={{
            bg: hoverBgColor
          }}
          onClick={onOpen}
          icon={<DeleteIcon w={5} h={5} color={popupTextColor} />}
        >
          {i18next.t('header.userMenu.delete')}
        </MenuItem>
        <MenuItem
          _hover={{
            bg: hoverBgColor
          }}
          onClick={logout}
          icon={<LogOutIcon width={5} height={5} color={popupTextColor} />}
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
