import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BellIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getNotifications, readNotification } from '@/api/Notification';
import { useCentralTheme } from '@/theme';

import { NotificationModal } from '../NotificationModal';

export const NotificationsMenu = () => {
  const [chosenNotificationData, setChosenNotificationData] = useState({});

  const queryClient = useQueryClient();

  const readNotificationModal = useDisclosure();

  const { data: dataNotifications, isFetched: isFetchedNotifications } =
    useQuery(['notifications'], getNotifications);

  const editingNotification = useMutation(
    (data) => readNotification(data.id).catch((error) => console.log(error)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notifications']);
      }
    }
  );

  const {
    hoverBgColor,
    popupBgColor,
    popupTextColor,
    textColor,
    notificationUnreadBgColor,
    notificationReadBgColor
  } = useCentralTheme();

  const openOrReadOnClick = (notification) => {
    if (notification.description.length > 120) {
      setChosenNotificationData(notification);
      readNotificationModal.onOpen();
    } else {
      editingNotification.mutate(notification);
    }
  };

  const readOnSubmit = () => {
    editingNotification.mutate(chosenNotificationData);
    readNotificationModal.onClose();
  };

  return (
    <Menu closeOnSelect={false}>
      {!!dataNotifications &&
        !!dataNotifications.data &&
        isFetchedNotifications && (
          <>
            <MenuButton
              pos="relative"
              mr={['14px', '14px', '14px', '0px']}
              w="50px"
              h="50px"
              border="2px"
              borderColor="transparent"
              borderRadius="50%"
              aria-label={i18next.t('header.btn.notifications')}
              color={textColor}
              outline="none"
              _active={{ bg: 'transparent' }}
              _hover={{
                border: '2px',
                borderColor: textColor
              }}
            >
              <BellIcon w="30px" h="30px" />
              {!!dataNotifications.data.filter(
                (notification) => !notification.isRead
              ).length && (
                <Flex
                  pos="absolute"
                  top="5px"
                  right="4px"
                  zIndex="1"
                  alignItems="center"
                  justifyContent="center"
                  px={1}
                  minW="18px"
                  h="18px"
                  borderRadius="50%"
                  fontSize="14px"
                  fontWeight="bold"
                  color="white"
                  bgColor="red"
                >
                  <span>
                    {
                      dataNotifications.data.filter(
                        (notification) => !notification.isRead
                      ).length
                    }
                  </span>
                </Flex>
              )}
            </MenuButton>

            <MenuList
              maxWidth="450px"
              maxH="250px"
              overflowY="scroll"
              bg={popupBgColor}
              color={popupTextColor}
              fontWeight="bold"
            >
              {dataNotifications.data
                .slice()
                .reverse()
                .map((notification, i) => {
                  if (i < 30) {
                    return (
                      <MenuItem
                        key={notification.id}
                        pos="relative"
                        px="35px"
                        minH="60px"
                        borderBottom="1px solid #ccc"
                        bgColor={
                          !notification.isRead
                            ? notificationUnreadBgColor
                            : notificationReadBgColor
                        }
                        _hover={{
                          bg: hoverBgColor
                        }}
                        onClick={() => {
                          openOrReadOnClick(notification);
                        }}
                      >
                        {!notification.isRead && (
                          <Box
                            pos="absolute"
                            top="auto"
                            left="10px"
                            w="10px"
                            h="10px"
                            bgColor="red"
                            borderRadius="50px"
                          />
                        )}
                        <span>
                          {notification.description.length >= 120
                            ? `${notification.description.slice(0, 120)}...`
                            : notification.description}
                        </span>
                      </MenuItem>
                    );
                  }
                })}
            </MenuList>
          </>
        )}
      {!!Object.keys(chosenNotificationData).length &&
        chosenNotificationData.description.length > 120 && (
          <NotificationModal
            isOpen={readNotificationModal.isOpen}
            onSubmit={readOnSubmit}
            onClose={readNotificationModal.onClose}
            text={i18next.t('modal.notification.text', {
              chosenNotificationData
            })}
          />
        )}
    </Menu>
  );
};
