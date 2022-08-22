import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
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
          border="1px transparent"
          borderRadius={8}
          bg={popupBgColor}
          position="relative"
          boxShadow="sm"
        >
          <AccordionButton
            py={{ base: '8px', md: '12px' }}
            pl={{ base: '8px', lg: '16px' }}
            pr={{ base: '8px', lg: '16px' }}
          >
            <AccordionIcon
              height={{ base: 8, md: 8 }}
              width={{ base: 8, md: 8 }}
            />
            <Text
              as="h2"
              width="180px"
              pl={{ base: 8, lg: 12, xl: 16 }}
              overflow={{ base: 'hidden', lg: 'visible' }}
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              textAlign="left"
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
            left={10}
            ml={{ base: 0, lg: 4, xl: 6 }}
          />

          <Button
            position="absolute"
            size={{ base: 'sm', md: 'md' }}
            w={{ base: 8, md: 10 }}
            top={2}
            right={{ base: 14, md: 14 }}
            onClick={props.onEdit}
          >
            <EditIcon />
          </Button>

          <Button
            position="absolute"
            size={{ base: 'sm', md: 'md' }}
            w={{ base: 8, md: 10 }}
            top={2}
            right={2}
            variant="danger"
            onClick={props.onDelete}
          >
            <DeleteIcon />
          </Button>

          <AccordionPanel p={4}>
            {props.categoryData.categoryType === 'Expense' && (
              <SubCategoryList
                categoryData={props.categoryData}
                onOpen={onOpen}
              />
            )}
          </AccordionPanel>
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
