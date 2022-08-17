import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Skeleton,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getTotalBalance } from '@/api/User';
import { PiggyBankIcon } from '@/assets';
import {
  AddWalletModal,
  SelectControlled,
  WalletCard,
  WalletCarousel
} from '@/components';
import {
  getDefaultCurrencyData,
  getWalletsCurrenciesData
} from '@/helpers/selectHelpers';
import { useCentralTheme } from '@/theme';

export const WalletsList = ({ userData, walletsData }) => {
  const walletModal = useDisclosure();

  const { popupTextColor, textColor, sectionBgColor } = useCentralTheme();

  const { control, watch } = useForm({
    defaultValues: {
      totalBalance: getDefaultCurrencyData(userData, walletsData)
    }
  });

  const chosenCurrencyCode = watch('totalBalance')?.label;

  const {
    data: { data: dataTotalBalance } = { data: [] },
    isFetched: isFetchedTotalBalance
  } = useQuery(['totalBalance', chosenCurrencyCode], getTotalBalance);

  return (
    <>
      <Box
        as="section"
        w="full"
        maxW="container.xl"
        py={2}
        bg={sectionBgColor}
        borderRadius={35}
        shadow="lg"
      >
        <Flex alignItems="center" justifyContent="center" my="10px">
          <Heading as="h4" mr={2} size="md" fontWeight="bold">
            {i18next.t('walletView.headOfBalanceMessage')}&#58;
          </Heading>
          {(!!dataTotalBalance && isFetchedTotalBalance && (
            <Text mr={2} fontSize="xl" fontWeight="bold">
              {watch('totalBalance') &&
                Number(dataTotalBalance.toFixed(2)).toLocaleString('de-DE')}
            </Text>
          )) || (
            <Skeleton
              mr={2}
              width="90px"
              height="30px"
              borderRadius="5px"
              startColor="orange.100"
              endColor="orange.200"
            />
          )}
          <Box mt="10px" maxW="100px" w="100%">
            <SelectControlled
              size="sm"
              nameOfSelect="totalBalance"
              control={control}
              listOfOptions={getWalletsCurrenciesData(walletsData)}
              data={walletsData}
            />
          </Box>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Flex
            direction="column"
            mb="10px"
            alignItems="center"
            mr="25px"
            ml="25px"
          >
            <IconButton
              width="40px"
              height="40px"
              isRound
              mb="5px"
              colorScheme="blue"
              aria-label={i18next.t('modal.addWallet.title')}
              onClick={walletModal.onOpen}
              icon={<AddIcon />}
            />
            {i18next.t('modal.addWallet.title')}
          </Flex>

          {!!walletsData &&
            (walletsData.length > 3 ? (
              <WalletCarousel walletsData={walletsData} />
            ) : walletsData.length === 1 ? (
              <Flex justifyContent="center" w="40%">
                {walletsData.map((wallet) => (
                  <Link
                    key={wallet.id}
                    as={RouterLink}
                    to={`wallet/${wallet.id}`}
                    w="100%"
                    color={popupTextColor}
                    _hover={{ textDecoration: 'none' }}
                  >
                    <WalletCard walletData={wallet} isLink />
                  </Link>
                ))}
              </Flex>
            ) : (
              <Flex justifyContent="center" w="70%">
                {walletsData.map((wallet) => (
                  <Link
                    key={wallet.id}
                    as={RouterLink}
                    to={`wallet/${wallet.id}`}
                    w="100%"
                    color={popupTextColor}
                    _hover={{ textDecoration: 'none' }}
                  >
                    <WalletCard walletData={wallet} isLink />
                  </Link>
                ))}
              </Flex>
            ))}

          <VStack
            p={[8, 8, 4, 8]}
            spacing={8}
            alignItems="center"
            justify="center"
          >
            <PiggyBankIcon
              w={[16, 16, 16, 24]}
              h={[16, 16, 16, 24]}
              color={textColor}
            />
            <Text fontWeight="bold">0 &#36;</Text>
          </VStack>
        </Flex>
      </Box>

      <AddWalletModal
        isOpen={walletModal.isOpen}
        onClose={walletModal.onClose}
      />
    </>
  );
};
