import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, Text, VStack } from '@chakra-ui/react';

import { i18n } from '@/i18n';

export const SubCategoryList = ({ categoryData, onOpen }) => {
  return (
    <VStack align="start">
      {categoryData.subCategories.map((subCategory) => (
        <Flex key={subCategory.id} w="100%" alignItems="center">
          <Button
            className="colorPallette"
            bg={subCategory.color}
            borderRadius="50%"
            size={{ base: 'xs', lg: 'sm' }}
          />
          <Text ml="3" flex="0 1 87%">
            {subCategory.name}
          </Text>
          <Flex flex="1 0 13%" justify="space-between">
            <IconButton size="sm" icon={<EditIcon />} />
            <IconButton size="sm" variant="danger" icon={<DeleteIcon />} />
          </Flex>
        </Flex>
      ))}
      <Button onClick={onOpen} alignSelf="center">
        {i18n.t('button.addSubCategory')}
      </Button>
    </VStack>
  );
};
