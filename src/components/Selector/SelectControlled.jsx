import { Controller } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Skeleton,
  Text
  //Link
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import i18next from 'i18next';

export const SelectControlled = ({
  nameOfSelect,
  control,
  errorData,
  listOfOptions,
  defaultValue,
  isRequiredData = false,
  data,
  isFetchedData
}) => {
  let label = null;
  let placeholderData = null;
  let required = null;
  //let question=null;
  //let addPayer= null;

  switch (nameOfSelect) {
    case 'wallet':
      label = i18next.t('modal.addIncome.wallet');
      placeholderData = i18next.t('modal.addIncome.wallet.placeholder');
      break;

    case 'currency':
      label = i18next.t('modal.addWallet.currency');
      placeholderData = i18next.t('modal.addWallet.currency.placeholder');
      required = i18next.t('modal.addWallet.validationErrorMessage.currency');
      break;

    case 'category':
      label = i18next.t('modal.addIncome.category');
      placeholderData = i18next.t('modal.addIncome.category.placeholder');
      required = i18next.t('modal.addIncome.validationErrorMessage.category');
      break;
    case 'payer':
      label = i18next.t('modal.addExpense.payer');
      placeholderData = i18next.t('modal.addExpense.payer.placeholder');
      // question = i18next.t('modal.addExpense.addPayerQuestion');
      // addPlayer = i18next.t('modal.addExpense.addPayer');
      break;
    case 'subcategory':
      placeholderData = i18next.t('modal.addExpense.subcategory.placeholder');
      break;
    case 'isRecurring':
      placeholderData = i18next.t('modal.addIncome.isRecurring');
      break;
    default:
      return nameOfSelect;
  }

  return (
    <Controller
      control={control}
      name={nameOfSelect}
      rules={
        isRequiredData
          ? {
              required: required
            }
          : {}
      }
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <FormControl mb="20px" isInvalid={errorData}>
          <FormLabel htmlFor={nameOfSelect}>{label}</FormLabel>
          {(!!data && !!data.data && isFetchedData && (
            <Select
              name={name}
              value={defaultValue ? defaultValue : value}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              options={listOfOptions}
              isSearchable={true}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
              placeholder={placeholderData}
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

          {/*{name === 'payer' && (
            <Text fontSize="xs">
              <Link
                onClick={payerModal.onOpen}
                textColor="blue.500"
                ml={5}
              ></Link>
            </Text>
          )} */}
        </FormControl>
      )}
    />
  );
};
