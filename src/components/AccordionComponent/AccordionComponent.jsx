import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  IconButton,
  Text,
  useDisclosure
} from '@chakra-ui/react';

import { useCentralTheme } from '@/theme';

import { AddSubCategoryModal } from '../AddSubCategoryModal';
import { SubCategoryList } from '../SubCategoryList';

export const AccordionComponent = (props) => {
  const { popupBgColor } = useCentralTheme();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Accordion allowToggle="true" margin={4} width="auto">
        <AccordionItem
          position="relative"
          border="1px transparent"
          borderRadius={8}
          bg={popupBgColor}
          boxShadow="sm"
        >
          <AccordionButton
            py={{ base: '8px', md: '12px' }}
            px={{ base: '8px', lg: '16px' }}
          >
            {(props.categoryData.categoryType === 'Expense' && (
              <AccordionIcon w={8} h={8} />
            )) || <Box w={8} h={8} />}

            <Text
              as="h2"
              w={{
                base: '400px',
                sm: '180px',
                lg: '300px',
                xl: '400px'
              }}
              pl={
                props.categoryData.categoryType === 'Expense'
                  ? { base: 8, lg: 12, xl: 16 }
                  : { base: 3, lg: 7, xl: 12 }
              }
              textAlign="left"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {props.name}
            </Text>
          </AccordionButton>

          <Box
            className="colorPallette"
            bg={props.color}
            borderRadius="50%"
            w={{ base: 6, lg: 8 }}
            h={{ base: 6, lg: 8 }}
            position="absolute"
            top={{ base: 3, md: 4, lg: 3 }}
            left={props.categoryData.categoryType === 'Expense' ? 10 : 5}
            ml={{ base: 0, lg: 4, xl: 6 }}
          />

          <IconButton
            position="absolute"
            top={2}
            right={14}
            size={{ base: 'sm', md: 'md' }}
            w={{ base: 8, md: 10 }}
            onClick={props.onEdit}
            icon={<EditIcon />}
          />

          <IconButton
            position="absolute"
            top={2}
            right={2}
            size={{ base: 'sm', md: 'md' }}
            w={{ base: 8, md: 10 }}
            onClick={props.onDelete}
            variant="danger"
            icon={<DeleteIcon />}
          />

          {props.categoryData.categoryType === 'Expense' && (
            <AccordionPanel p={4}>
              <SubCategoryList
                categoryData={props.categoryData}
                onOpen={onOpen}
              />
            </AccordionPanel>
          )}
        </AccordionItem>
      </Accordion>

      <AddSubCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        categoryData={props.categoryData}
      />
    </>
  );
};
