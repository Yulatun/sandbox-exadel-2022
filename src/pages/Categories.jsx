import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { AddCategoryModal } from '@/components';

export const Categories = () => {
  const categoriesModal = useDisclosure();

  return (
    <>
      <Flex>
        <Button onClick={categoriesModal.onOpen}> add Category</Button>
        <AddCategoryModal
          isOpen={categoriesModal.isOpen}
          onSubmit={categoriesModal.onClose}
          onClose={categoriesModal.onClose}
          categoryType="Income"
        />
      </Flex>
    </>
  );
};
