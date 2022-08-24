import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  createStandaloneToast,
  Flex,
  IconButton,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { getCurrencies } from '@/api/Currency';
import { getExpenses, getIncomes } from '@/api/Transaction';
import { getPayers, getUser } from '@/api/User';
import { deleteWallet, editWallet, getWallets } from '@/api/Wallet';
import {
  ConfirmationModal,
  EditWalletModal,
  Preloader,
  TransactionList,
  WalletCard
} from '@/components';
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const WalletView = () => {
  const { id: walletId } = useParams();

  const [chosenWallet, setChosenWallet] = useState({});

  const editWalletModal = useDisclosure();
  const deleteWalletModal = useDisclosure();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { toast } = createStandaloneToast();
  const { bgColor, textColor } = useCentralTheme();

  const { data: { data: dataUser } = { data: [] }, isFetched: isFetchedUser } =
    useQuery(['user'], getUser);

  const {
    data: { data: dataWallets } = { data: [] },
    isFetched: isFetchedWallets
  } = useQuery(['wallets'], getWallets);

  const {
    data: { data: { data: dataIncomes } } = { data: { incomes: [] } },
    isFetched: isFetchedIncomes
  } = useQuery(['incomes'], getIncomes);

  const {
    data: { data: { data: dataExpenses } } = { data: { expenses: [] } },
    isFetched: isFetchedExpenses
  } = useQuery(['expenses'], getExpenses);

  const {
    data: { data: dataCategories } = { data: [] },
    isFetched: isFetchedCategories
  } = useQuery(['categories'], getCategories);

  const {
    data: { data: dataPayers } = { data: [] },
    isFetched: isFetchedPayers
  } = useQuery(['payers'], getPayers);

  const { data: dataCurrency, isFetched: isFetchedCurrency } = useQuery(
    ['currency'],
    getCurrencies
  );

  const setCurrentId = (currencyCode) =>
    isFetchedCurrency &&
    dataCurrency.data.find((currency) => currency.currencyCode === currencyCode)
      .id;

  const editMutationWallet = useMutation(
    (data) =>
      editWallet(data.setDefault, {
        ...chosenWallet,
        name: data.name,
        currencyId: setCurrentId(data.currency),
        dateOfChange: new Date().toJSON()
      }).catch((err) =>
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
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['user']);
      }
    }
  );

  const mutationWallet = useMutation(() => deleteWallet(walletId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['wallets']);
      navigate('/', { replace: true });
      toast({
        title: i18next.t('wallet.deletedMessage'),
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
        containerStyle: {
          margin: '100px'
        }
      });
    }
  });

  const openWalletOnEdit = (dataWallet) => {
    setChosenWallet(dataWallet);
    editWalletModal.onOpen();
  };

  const openWalletOnDelete = () => {
    deleteWalletModal.onOpen();
  };

  const updateWalletOnEdit = (data) => {
    if (
      chosenWallet.currency.currencyCode !== data.currency &&
      allTransactions.length
    ) {
      toast({
        title: i18next.t('modal.editWallet.editedCurrency.cancel'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
        containerStyle: {
          margin: '100px'
        }
      });
      return;
    }

    if (dataUser.defaultWallet === walletId && !data.setDefault) {
      toast({
        title: i18next.t(
          'modal.editWallet.editedMessage.nonDefaultWallet.cancel'
        ),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
        containerStyle: {
          margin: '100px'
        }
      });

      resetEditOnClose();
      return;
    }
    editMutationWallet.mutate(data);
    resetEditOnClose();
    toast({
      title: i18next.t('modal.editWallet.editedWallet.success'),
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
      containerStyle: {
        margin: '100px'
      }
    });
  };

  const deleteWalletOnSubmit = () => {
    deleteWalletModal.onClose();
    if (dataUser && isFetchedUser && dataUser.defaultWallet === walletId) {
      toast({
        title: i18next.t('modal.deleteWalletDefault.text'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
        containerStyle: {
          margin: '100px'
        }
      });
      return;
    }
    mutationWallet.mutate();
  };

  const resetEditOnClose = () => {
    setChosenWallet({});
    editWalletModal.onClose();
  };

  const currentWallet =
    isFetchedWallets && dataWallets.find((wallet) => wallet.id === walletId);

  let allTransactions = [];

  if (
    !!dataIncomes &&
    !!dataExpenses &&
    !!dataWallets &&
    isFetchedIncomes &&
    isFetchedExpenses &&
    isFetchedWallets
  ) {
    allTransactions = getTransactionsList(
      dataWallets,
      dataIncomes,
      dataExpenses
    ).filter((data) => data.walletId === walletId);
  }

  return (
    <>
      <Flex
        flexDir="column"
        alignItems="center"
        mt={6}
        px={24}
        py={6}
        w="100%"
        bg={bgColor}
      >
        <Flex justify="space-around" w="100%">
          <IconButton
            onClick={() => openWalletOnEdit(currentWallet)}
            size="sm"
            icon={<EditIcon />}
          />
          <IconButton
            onClick={openWalletOnDelete}
            size="sm"
            icon={<DeleteIcon />}
          />
        </Flex>
        <Flex justifyContent="center" mb={8} w="400px">
          {(!!dataWallets && isFetchedWallets && (
            <WalletCard
              walletData={dataWallets.find((wallet) => wallet.id === walletId)}
            />
          )) || <Preloader />}
        </Flex>

        {!!dataWallets &&
        !!dataCategories &&
        !!dataPayers &&
        isFetchedIncomes &&
        isFetchedExpenses &&
        isFetchedWallets &&
        isFetchedCategories &&
        isFetchedPayers &&
        !allTransactions.length ? (
          <Text color={textColor} fontSize="xl">
            {i18next.t('transaction.noData')}
          </Text>
        ) : (
          <TransactionList
            list={allTransactions}
            maxH="550px"
            isShortView
            walletsData={dataWallets}
            categoriesData={dataCategories}
            payersData={dataPayers}
          />
        )}
      </Flex>

      <ConfirmationModal
        isOpen={deleteWalletModal.isOpen}
        onSubmit={deleteWalletOnSubmit}
        onClose={deleteWalletModal.onClose}
        title={i18next.t('modal.deleteWallet.title')}
        text={i18next.t('modal.deleteWallet.text')}
      />

      {!!Object.keys(chosenWallet).length && (
        <EditWalletModal
          isOpen={editWalletModal.isOpen}
          onSubmit={updateWalletOnEdit}
          onClose={resetEditOnClose}
          walletData={chosenWallet}
        />
      )}
    </>
  );
};
