import { useQuery } from 'react-query';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Avatar,
  createStandaloneToast,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { deleteUser, getUser } from '@/api/User';
import { LogOutIcon } from '@/assets';
import { ConfirmationModal } from '@/components';
import { logout } from '@/helpers/authorization';
import { useCentralTheme } from '@/theme';

export const UserMenu = () => {
  const { data: { data: dataUser } = { data: [] }, isFetched: isFetchedUser } =
    useQuery(['user'], getUser);

  const deleteModal = useDisclosure();
  const logoutModal = useDisclosure();

  const { toast } = createStandaloneToast();

  const { hoverBgColor, popupBgColor, popupTextColor, textColor } =
    useCentralTheme();

  const onDelete = () => {
    deleteUser(dataUser.id);
    deleteModal.onClose();
    logout();
    toast({
      title: i18next.t('delete.account.successful.message'),
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
      containerStyle: {
        margin: '100px'
      }
    });
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
        {!!dataUser && isFetchedUser && (
          <Avatar name={dataUser.fullName} w="40px" h="40px" />
        )}
        {!isFetchedUser && (
          <SkeletonCircle
            size="12"
            startColor="orange.100"
            endColor="orange.200"
          />
        )}
      </MenuButton>
      <MenuList bg={popupBgColor} color={popupTextColor} fontWeight="bold">
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
