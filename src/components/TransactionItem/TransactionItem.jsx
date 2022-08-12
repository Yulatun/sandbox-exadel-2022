import { useQuery } from 'react-query';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { format } from 'date-fns';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { getWallets } from '@/api/Wallet';
import { NoteIcon } from '@/assets';
import { useCentralTheme } from '@/theme';

export const TransactionItem = ({
  transactionData,
  onEdit,
  onDelete,
  isExpensesType,
  isShortView
}) => {
  let categoryData = {};
  let subcategoryName = '';
  let walletData = {};

  const { popupExpTextColor, transactionBgColor } = useCentralTheme();

  const { data: dataCategories, isFetched: isFetchedCategories } = useQuery(
    ['categories'],
    getCategories
  );

  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallets'],
    getWallets
  );

  if (!!dataCategories && !!dataCategories.data && isFetchedCategories) {
    categoryData = dataCategories.data.find(
      (category) => category.id === transactionData.categoryId
    );

    if (categoryData.subCategories.length) {
      subcategoryName = categoryData.subCategories.find(
        (subcategory) => subcategory.id === transactionData.subCategoryId
      );
    }
  }

  if (!!dataWallets && !!dataWallets.data && isFetchedWallets) {
    walletData = dataWallets.data.find(
      (wallet) => wallet.id === transactionData.walletId
    );
  }

  return (
    <>
      {!!dataCategories &&
        !!dataCategories.data &&
        isFetchedCategories &&
        !!dataWallets &&
        !!dataWallets.data &&
        isFetchedWallets && (
          <Flex
            alignItems="center"
            justifyContent="space-between"
            py={4}
            px={8}
            w="100%"
            bg={transactionBgColor}
            color={popupExpTextColor}
            boxShadow="lg"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mr={6}
              w="100%"
            >
              <Box mr="10px" minW="85px" w="15%" textAlign="center">
                {format(
                  new Date(transactionData.dateOfTransaction),
                  'dd.MM.yyyy'
                )}
              </Box>

              <Box mr="10px" w="25%" textAlign="center">
                <Text>{categoryData.name}</Text>
                {isExpensesType && !!subcategoryName.length && (
                  <Text>{subcategoryName}</Text>
                )}
              </Box>

              <Text mr="10px" w="20%" textAlign="center">
                {`${isExpensesType ? '-' : '+'} ${transactionData.value} ${
                  transactionData.currency.symbol
                }`}
              </Text>

              <Box mr="10px" w="15%" textAlign="center">
                <Tooltip w="100%" label={walletData.name}>
                  <Text cursor="pointer">
                    Wallet {transactionData.currency.currencyCode}
                  </Text>
                </Tooltip>
              </Box>

              {!isShortView && (
                <>
                  {isExpensesType && (
                    <Box mr="10px" w="20%" textAlign="center">
                      {transactionData.payer}
                    </Box>
                  )}

                  <Box minW="40px" w="5%" textAlign="center">
                    <Tooltip
                      w="100%"
                      label={
                        transactionData.description.length
                          ? transactionData.description.length
                          : i18next.t('transaction.tooltip.note')
                      }
                    >
                      <Text cursor="pointer">
                        <NoteIcon color={popupExpTextColor} />
                      </Text>
                    </Tooltip>
                  </Box>
                </>
              )}
            </Flex>

            <Flex justifyContent="flex-end" minW="90px" w="12%">
              <IconButton mr="10px" onClick={onEdit} icon={<EditIcon />} />
              <IconButton onClick={onDelete} icon={<DeleteIcon />} />
            </Flex>
          </Flex>
        )}
    </>
  );
};
