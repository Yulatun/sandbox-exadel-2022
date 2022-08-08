import React from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { DeleteConfirmationModal } from '@/components';
import { i18n } from '@/i18n';
import { useCentralTheme } from '@/theme';

export const WalletCard = (props) => {
  const { popupBgColor, popupTextColor, badgeBgColor } = useCentralTheme();

  const totalBalanceView = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2
  }).format(props.totalBalance);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = () => {
    onClose();
  };

  return (
    <>
      <Box
        h="200px"
        w={['280px', '350px', '300px', '500px']}
        m={[2, 5, 5, 5]}
        borderRadius={35}
        bg={popupBgColor}
        shadow="lg"
      >
        <Badge
          ml="80%"
          mt="5%"
          fontSize="50%"
          align="center"
          p={1}
          bg={badgeBgColor}
          borderRadius={5}
          color={popupTextColor}
        >
          {i18n.t('walletView.nameOfDefaultBadge')}
        </Badge>

        <Heading as="h1" size="md" color={popupTextColor} ml={10}>
          {props.name}
        </Heading>

        <Flex direction="column" m={5} align="center" color={popupTextColor}>
          <Flex>{i18n.t('walletView.headOfBalanceMessage')}</Flex>
          <Flex fontSize="2xl" fontWeight="bold" color={popupTextColor}>
            {totalBalanceView}
          </Flex>
          <Text>{props.currency}</Text>
        </Flex>
        <IconButton
          onClick={onOpen}
          ml="80%"
          icon={<DeleteIcon />}
        ></IconButton>
        <DeleteConfirmationModal
          isOpen={isOpen}
          onSubmit={onDelete}
          onClose={onClose}
          text={i18next.t('modal.deleteWallet.text')}
        />
        <Flex
          direction="column"
          p={2}
          m={2}
          align="start"
          justify="flex-end"
          h="20%"
        ></Flex>
      </Box>
    </>
  );
};
