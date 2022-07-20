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

import { DeleteComfirmationModal } from '../DeleteComfirmationModal';

export const UserMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userMenuBgThemeColor = useColorModeValue('orange.50', 'teal.800');
  const userMenutextcolor = useColorModeValue('teal.900', 'orange.100');
  const userMenuItemHoverBgColor = useColorModeValue('orange.100', 'teal.600');
  const iconsThemeColor = useColorModeValue('teal.900', 'orange.300');
  const iconsMenuThemeColor = useColorModeValue('teal.900', 'orange.100');
  const iconsHoverThemeColor = useColorModeValue('teal.900', 'orange.300');

  return (
    <Menu>
      <MenuButton
        w="50px"
        h="50px"
        transition="all 0.2s"
        borderRadius="50%"
        aria-label={i18next.t('header.userMenu')}
        color={iconsThemeColor}
        outline="none"
        _hover={{
          border: '2px',
          borderColor: iconsHoverThemeColor
        }}
      >
        <SettingsIcon w="30px" h="30px" />
      </MenuButton>
      <MenuList
        bg={userMenuBgThemeColor}
        color={userMenutextcolor}
        fontWeight="bold"
      >
        <MenuItem
          _hover={{
            bg: userMenuItemHoverBgColor
          }}
          icon={<SettingsIcon w={5} h={5} color={iconsMenuThemeColor} />}
        >
          {i18next.t('header.userMenu.settings')}
        </MenuItem>
        <MenuItem
          _hover={{
            bg: userMenuItemHoverBgColor
          }}
          icon={<QuestionOutlineIcon w={5} h={5} color={iconsMenuThemeColor} />}
        >
          {i18next.t('header.userMenu.help')}
        </MenuItem>
        <MenuItem
          _hover={{
            bg: userMenuItemHoverBgColor
          }}
          onClick={onOpen}
          icon={<DeleteIcon w={5} h={5} color={iconsMenuThemeColor} />}
        >
          {i18next.t('header.userMenu.delete')}
        </MenuItem>
        <MenuItem
          _hover={{
            bg: userMenuItemHoverBgColor
          }}
          icon={<LogOutIcon width={5} height={5} color={iconsMenuThemeColor} />}
        >
          {i18next.t('header.userMenu.logout')}
        </MenuItem>
      </MenuList>
      <DeleteComfirmationModal
        isOpen={isOpen}
        onSubmit={onClose}
        onClose={onClose}
        title={i18next.t('modal.delete_account.title')}
        text={i18next.t('modal.delete_account.text')}
      />
    </Menu>
  );
};
