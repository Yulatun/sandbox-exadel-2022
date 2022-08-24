import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { format } from 'date-fns';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { getReport } from '@/api/Report';
import { getPayers, getUser } from '@/api/User';
import { getAllWallets } from '@/api/Wallet';
import { FiltersReport, Preloader } from '@/components';
import { today as todayDate } from '@/components/FiltersReport/utils';
import { getChosenWalletFullData } from '@/helpers/helpers';
import {
  getCategoriesOptions,
  getPayersOptions
} from '@/helpers/selectHelpers';
import { useCentralTheme } from '@/theme';

export const Statistics = () => {
  const [dataReportOnSubmit, setDataReportOnSubmit] = useState({});
  const [dataChosenWalletId, setDataChosenWalletId] = useState({});

  const [selectedDateFilter, setSelectedDateFilter] = useState({
    value: 'today',
    dates: {
      start: todayDate,
      end: todayDate
    }
  });

  const {
    reportTableBorders,
    reportTableHeadingBgColor,
    reportTableCategoryBgColor,
    textColor
  } = useCentralTheme();

  const { data: { data: dataUser } = { data: [] }, isFetched: isFetchedUser } =
    useQuery(['user'], getUser);

  const {
    data: { data: dataWallets } = { data: [] },
    isFetched: isFetchedWallets
  } = useQuery(['wallets'], getAllWallets);

  const {
    data: { data: dataCategories } = { data: [] },
    isFetched: isFetchedCategories
  } = useQuery(['categories'], getCategories);

  const {
    data: { data: dataPayers } = { data: [] },
    isFetched: isFetchedPayers
  } = useQuery(['payers'], getPayers);

  const {
    data: { data: dataReport } = { data: [] },
    isFetched: isFetchedReport
  } = useQuery(['report', dataReportOnSubmit], getReport, {
    enabled: !!Object.keys(dataReportOnSubmit).length
  });

  const formatOptionsArray = (arr) => {
    if (!!arr && arr.length === 1) {
      switch (arr[0].value) {
        case 'all-categories-incomes':
          return getCategoriesOptions(dataCategories, 'Income').map(
            (category) => category.value
          );

        case 'all-categories-expenses':
          return getCategoriesOptions(dataCategories, 'Expense').map(
            (category) => category.value
          );

        case 'all-payers':
          return getPayersOptions(dataPayers).map((payer) => payer.value);

        default:
          return [arr[0].value];
      }
    } else if (!!arr && arr.length > 1) {
      return [...arr].map((element) => element.value);
    }

    return [];
  };

  const createReportOnSubmit = (data) => {
    setDataChosenWalletId(data.walletReport?.value);

    setDataReportOnSubmit({
      WalletId: data.walletReport?.value,
      DateFrom: `${format(
        selectedDateFilter.dates.start,
        'yyyy-MM-dd'
      )}T00:00:00.000Z`,
      DateTo: `${format(
        selectedDateFilter.dates.end,
        'yyyy-MM-dd'
      )}T23:59:59.999Z`,
      IncomeCategoryIds: formatOptionsArray(data.categoryIncomeReport),
      ExpenseCategoryIds: formatOptionsArray(data.categoryExpenseReport),
      Payers: formatOptionsArray(data.payerReport)
    });
  };

  return (
    <>
      {(isFetchedUser &&
        isFetchedWallets &&
        isFetchedCategories &&
        isFetchedPayers && (
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="flex-start"
            py={8}
            px={4}
            w="100%"
          >
            <Heading as="h2" mb={6}>
              {i18next.t('report.heading')}
            </Heading>

            {!!dataUser &&
              !!dataWallets &&
              !!dataCategories &&
              !!dataPayers && (
                <FiltersReport
                  userData={dataUser}
                  walletsData={dataWallets}
                  categoriesData={dataCategories}
                  payersData={dataPayers}
                  selectedDateFilter={selectedDateFilter}
                  setSelectedDateFilter={setSelectedDateFilter}
                  onSubmit={createReportOnSubmit}
                  setDataReportOnSubmit={setDataReportOnSubmit}
                />
              )}

            {(!!dataReport &&
              !!dataWallets &&
              isFetchedReport &&
              (dataReport.totalIncome || dataReport.totalExpense) && (
                <Flex w="80%">
                  <TableContainer
                    w="100%"
                    maxH="570px"
                    overflowY="auto"
                    borderRadius={8}
                    boxShadow="md"
                  >
                    <Table
                      whiteSpace="normal"
                      size="lg"
                      colorScheme={reportTableBorders}
                    >
                      <Thead bgColor={reportTableHeadingBgColor}>
                        <Tr>
                          <Th></Th>
                          <Th textAlign="center">
                            {i18next.t('report.table.heading.income')}
                          </Th>
                          <Th textAlign="center">
                            {i18next.t('report.table.heading.expense')}
                          </Th>
                          <Th textAlign="center">
                            {i18next.t('report.table.heading.payer')}
                          </Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {!!dataReport.totalExpense && (
                          <Tr bgColor={reportTableCategoryBgColor}>
                            <Th>
                              {i18next.t(
                                'report.table.heading.expenseCategories'
                              )}
                            </Th>
                            <Th></Th>
                            <Th></Th>
                            <Th></Th>
                          </Tr>
                        )}
                        {!!dataReport.expenseReports.length &&
                          dataReport.expenseReports
                            .filter((category) => category.transactionSum > 0)
                            .map((category, i) => (
                              <Tr key={i}>
                                <Th>{category.categoryName}</Th>
                                <Th></Th>
                                <Th textAlign="center">
                                  {`${category.transactionSum} ${
                                    getChosenWalletFullData(
                                      dataChosenWalletId,
                                      dataWallets
                                    )?.currency.symbol
                                  }`}
                                </Th>
                                <Th textAlign="center">{category.payer}</Th>
                              </Tr>
                            ))}

                        {!!dataReport.totalIncome && (
                          <Tr bgColor={reportTableCategoryBgColor}>
                            <Th>
                              {i18next.t(
                                'report.table.heading.incomeCategories'
                              )}
                            </Th>
                            <Th></Th>
                            <Th></Th>
                            <Th></Th>
                          </Tr>
                        )}
                        {!!dataReport.incomeReports.length &&
                          dataReport.incomeReports
                            .filter((category) => category.transactionSum > 0)
                            .map((category, i) => (
                              <Tr key={i}>
                                <Th>{category.categoryName}</Th>
                                <Th textAlign="center">
                                  {`${category.transactionSum} ${
                                    getChosenWalletFullData(
                                      dataChosenWalletId,
                                      dataWallets
                                    )?.currency.symbol
                                  }`}
                                </Th>
                                <Th></Th>
                                <Th></Th>
                              </Tr>
                            ))}
                      </Tbody>

                      <Tfoot bgColor={reportTableHeadingBgColor}>
                        <Tr>
                          <Th>{i18next.t('report.table.heading.total')}</Th>
                          <Th textAlign="center">
                            {dataReport.totalIncome
                              ? `${dataReport.totalIncome} ${
                                  getChosenWalletFullData(
                                    dataChosenWalletId,
                                    dataWallets
                                  )?.currency.symbol
                                }`
                              : ''}
                          </Th>
                          <Th textAlign="center">
                            {dataReport.totalExpense
                              ? `${dataReport.totalExpense} ${
                                  getChosenWalletFullData(
                                    dataChosenWalletId,
                                    dataWallets
                                  )?.currency.symbol
                                }`
                              : ''}
                          </Th>
                          <Th></Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </Flex>
              )) ||
              (!!dataReport &&
                isFetchedReport &&
                !dataReport.totalIncome &&
                !dataReport.totalExpense && (
                  <Text color={textColor} fontSize="xl">
                    {i18next.t('report.noData')}
                  </Text>
                ))}

            {!isFetchedReport && !!Object.keys(dataReportOnSubmit)?.length && (
              <Preloader />
            )}
          </Flex>
        )) || <Preloader />}
    </>
  );
};
