import { useQuery } from 'react-query';
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

import { deleteUser, getUser } from '@/api/User';
import { LogOutIcon } from '@/assets';
import { ConfirmationModal } from '@/components';
import { logout } from '@/helpers/authorization';
import { useCentralTheme } from '@/theme';

export const UserMenu = () => {
  const { data: dataUser } = useQuery(['user'], getUser);

  const deleteModal = useDisclosure();
  const logoutModal = useDisclosure();

  const { hoverBgColor, popupBgColor, popupTextColor, textColor } =
    useCentralTheme();

  const onDelete = () => {
    deleteUser(dataUser.id)
      .then(() => alert(i18next.t('delete.account.successful.message')))
      .catch((err) => console.log(err));
    deleteModal.onClose();
    logout();
  };

  const onLogout = () => {
    logoutModal.onClose();
    logout();
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
          onClick={deleteModal.onOpen}
          icon={<DeleteIcon w={5} h={5} color={popupTextColor} />}
        >
          {i18next.t('header.userMenu.delete')}
        </MenuItem>
        <MenuItem
          _hover={{
            bg: hoverBgColor
          }}
          onClick={logoutModal.onOpen}
          icon={<LogOutIcon width={5} height={5} color={popupTextColor} />}
        >
          {i18next.t('header.userMenu.logout')}
        </MenuItem>
      </MenuList>
      <ConfirmationModal
        onSubmit={onDelete}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        title={i18next.t('modal.confirmation.deleteAccount.title')}
        text={i18next.t('modal.confirmation.deleteAccount.text')}
        variant="danger"
      />
      <ConfirmationModal
        onSubmit={onLogout}
        isOpen={logoutModal.isOpen}
        onClose={logoutModal.onClose}
        title={i18next.t('modal.confirmation.logout.title')}
        text={i18next.t('modal.confirmation.logout.text')}
      />
    </Menu>
  );
};
