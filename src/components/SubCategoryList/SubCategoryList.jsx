import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Text, VStack } from '@chakra-ui/react';

import { i18n } from '@/i18n';

export const SubCategoryList = ({ categoryData, onOpen, onDelete }) => {
  return (
    <VStack align="start">
      {categoryData.subCategories.map((subCategory) => (
        <Flex key={subCategory.id} w="100%" alignItems="center">
          <Box
            flex="1 0 auto"
            className="colorPallette"
            bg={subCategory.color}
            borderRadius="50%"
            w={{ base: 6, lg: 8 }}
            h={{ base: 6, lg: 8 }}
            ml={2}
          />
          <Text ml="3" flex="0 1 87%">
            {subCategory.name}
          </Text>
          <Flex justify="space-between">
            <IconButton
              size="sm"
              variant="danger"
              icon={<DeleteIcon />}
              onClick={() => onDelete(subCategory.id)}
            />
          </Flex>
        </Flex>
      ))}
      <Button onClick={onOpen} alignSelf="center">
        {i18n.t('button.addSubCategory')}
      </Button>
    </VStack>
  );
};
