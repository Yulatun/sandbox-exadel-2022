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

import { getSelectFieldsData } from '@/helpers/selectHelpers';

export const SelectControlled = ({
  nameOfSelect,
  control,
  errorData,
  listOfOptions,
  isRequiredData = false,
  data = {},
  isFetchedData = true,
  modalOnOpen
}) => {
  return (
    <>
      <Controller
        control={control}
        name={nameOfSelect}
        rules={
          isRequiredData
            ? {
                required: getSelectFieldsData(nameOfSelect).required
              }
            : {}
        }
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <FormControl
            mb="20px"
            isInvalid={errorData}
            isRequired={isRequiredData}
          >
            <FormLabel htmlFor={nameOfSelect}>
              {getSelectFieldsData(nameOfSelect).label}
            </FormLabel>
            {(!!data && isFetchedData && (
              <Select
                name={name}
                value={value}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                options={listOfOptions}
                isSearchable={true}
                selectedOptionStyle="check"
                hideSelectedOptions={false}
                placeholder={getSelectFieldsData(nameOfSelect).placeholderData}
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

            {(name === 'payer' || name === 'category') && (
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
