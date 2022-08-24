import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BellIcon } from '@chakra-ui/icons';
import {
  Box,
  createStandaloneToast,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns';
import i18next from 'i18next';

import { getNotifications, readNotification } from '@/api/Notification';
import { useCentralTheme } from '@/theme';

import { NotificationModal } from '../NotificationModal';

export const NotificationsMenu = () => {
  const [chosenNotificationData, setChosenNotificationData] = useState({});

  const queryClient = useQueryClient();
  const { toast } = createStandaloneToast();

  const readNotificationModal = useDisclosure();

  const {
    data: { data: dataNotifications } = { data: [] },
    isFetched: isFetchedNotifications
  } = useQuery(['notifications'], getNotifications);

  const editingNotification = useMutation(
    (data) =>
      readNotification(data.id).catch((err) =>
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            margin: '100px'
          }
        })
      ),
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
    notificationReadBgColor,
    dateColor
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
    <Menu closeOnSelect={false} autoSelect={false} placement="bottom">
      {!!dataNotifications && isFetchedNotifications && (
        <>
          <MenuButton
            pos="relative"
            ml={{ sm: 'auto', md: 'none', lg: 'none' }}
            mr={2}
            minW={12}
            minH={12}
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
            <BellIcon w={8} h={8} mr={0.5} />
            {!!dataNotifications.filter((notification) => !notification.isRead)
              .length && (
              <Flex
                pos="absolute"
                mr={0.5}
                top={1}
                right={1}
                zIndex="1"
                alignItems="center"
                justifyContent="center"
                minW={5}
                minH={5}
                borderRadius="50%"
                fontSize={12}
                fontWeight="bold"
                color="white"
                bgColor="red"
              >
                <span>
                  {
                    dataNotifications.filter(
                      (notification) => !notification.isRead
                    ).length
                  }
                </span>
              </Flex>
            )}
          </MenuButton>

          <MenuList
            pos="relative"
            zIndex="10"
            minW={{ sm: '250px', lg: '350px' }}
            maxH="280px"
            overflowY="auto"
            bg={popupBgColor}
            color={popupTextColor}
            fontWeight="bold"
            p={0}
            mt={1}
          >
            {dataNotifications.length ? (
              dataNotifications
                .slice()
                .reverse()
                .map((notification, i) => {
                  if (i < 30) {
                    return (
                      <MenuItem
                        key={notification.id}
                        pos="relative"
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        px="25px"
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
                            top="7px"
                            left="7px"
                            w="10px"
                            h="10px"
                            bgColor="red"
                            borderRadius="50px"
                          />
                        )}
                        <Text
                          fontSize={{ sm: '15px', lg: '17px' }}
                          textTransform="capitalize"
                          mb={2}
                        >
                          {notification.description.length >= 120
                            ? `${notification.description.slice(0, 120)}...`
                            : notification.description}
                        </Text>
                        <Box
                          w="100%"
                          fontSize={{ sm: '12px', lg: '15px' }}
                          textAlign="end"
                          color={dateColor}
                        >
                          {format(new Date(notification.date), 'dd.MM.yyyy')}
                        </Box>
                      </MenuItem>
                    );
                  }
                })
            ) : (
              <MenuItem px="35px" minH="60px">
                <Text>{i18next.t('header.notificationsMenu.noData')}</Text>
              </MenuItem>
            )}
          </MenuList>
        </>
      )}
      {!isFetchedNotifications && (
        <SkeletonCircle
          size={12}
          startColor="orange.100"
          endColor="orange.200"
        />
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
