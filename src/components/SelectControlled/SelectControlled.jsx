import { Controller } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
  Skeleton,
  Text
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import i18next from 'i18next';
import { findIndex } from 'lodash';

import { getSelectFieldsData } from '@/helpers/selectHelpers';

export const SelectControlled = ({
  zIndex = false,
  size = 'md',
  nameOfSelect,
  control,
  errorData,
  listOfOptions,
  isRequiredData = false,
  isDisabled = false,
  data = {},
  modalOnOpen,
  isMulti = false,
  closeMenuOnSelect = true,
  validateWalletData = [],
  validateWalletName = '',
  setIsSelectOnFocus = () => {},
  checkAllOptions = () => {}
}) => {
  const setStateOnFocus = () => {
    switch (nameOfSelect) {
      case 'walletReport':
        setIsSelectOnFocus((prevState) => ({
          ...prevState,
          wallet: !prevState.wallet
        }));
        break;

      case 'categoryIncomeReport':
        setIsSelectOnFocus((prevState) => ({
          ...prevState,
          income: !prevState.income
        }));
        break;

      case 'categoryExpenseReport':
        setIsSelectOnFocus((prevState) => ({
          ...prevState,
          expense: !prevState.expense
        }));
        break;

      case 'payerReport':
        setIsSelectOnFocus((prevState) => ({
          ...prevState,
          payer: !prevState.payer
        }));
        break;
    }
  };

  return (
    <>
      <Controller
        control={control}
        name={nameOfSelect}
        rules={{
          required:
            isRequiredData && getSelectFieldsData(nameOfSelect).required,
          validate: (currency) =>
            findIndex(validateWalletData, {
              name: validateWalletName,
              currency: { id: currency?.value }
            }) < 0
              ? true
              : i18next.t('modal.addCategory.validationErrorMessage.nameExist')
        }}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <FormControl
            pos="relative"
            zIndex={zIndex}
            mb="20px"
            isInvalid={errorData}
            isRequired={isRequiredData}
            onFocus={setStateOnFocus}
          >
            <FormLabel htmlFor={nameOfSelect}>
              {getSelectFieldsData(nameOfSelect).label}
            </FormLabel>
            {(!!data && (
              <Select
                size={size}
                name={name}
                value={value}
                ref={ref}
                onChange={(event) => {
                  onChange(event);
                  checkAllOptions(event);
                }}
                onBlur={() => {
                  setStateOnFocus();
                  onBlur();
                }}
                options={listOfOptions}
                isSearchable={true}
                isDisabled={isDisabled}
                selectedOptionStyle="check"
                hideSelectedOptions={false}
                placeholder={getSelectFieldsData(nameOfSelect).placeholderData}
                isMulti={isMulti}
                closeMenuOnSelect={closeMenuOnSelect}
                components={{
                  ClearIndicator: () => null,
                  IndicatorSeparator: () => null,
                  MultiValueContainer: () => null
                }}
              />
            )) || (
              <Skeleton
                height="40px"
                borderRadius="5px"
                startColor="orange.100"
                endColor="orange.200"
              />
            )}
            {!!errorData && (
              <FormErrorMessage>
                <Text>{errorData && errorData.message}</Text>
              </FormErrorMessage>
            )}

            {(name === 'payer' ||
              name === 'category' ||
              name === 'subcategory') && (
              <Text mt={1} fontSize="xs">
                {getSelectFieldsData(nameOfSelect).newDataQuestion}
                <Link onClick={modalOnOpen} textColor="blue.500" ml={3}>
                  {i18next.t(getSelectFieldsData(nameOfSelect).addNewData)}
                </Link>
              </Text>
            )}
          </FormControl>
        )}
      />
    </>
  );
};
