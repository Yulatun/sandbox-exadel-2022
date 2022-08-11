import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  HStack,
  Spacer,
  Text
} from '@chakra-ui/react';

import { useCentralTheme } from '@/theme';

export const AccordionComponent = (props) => {
  const { popupBgColor } = useCentralTheme();

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
              pl={{ base: 2, md: 8, lg: 10 }}
              overflow={{ base: 'hidden', lg: 'visible' }}
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              textAlign="left"
            >
              {props.name}
            </Text>
          </AccordionButton>
          <Button
            size={{ base: 'xs', lg: 'sm' }}
            className="colorPallette"
            bg={props.color}
            borderRadius="50%"
            position="absolute"
            top={{ base: 4, lg: 3 }}
            left={10}
            display={{ base: 'none', md: 'initial' }}
            ml={[0, 0, 0, 2]}
          ></Button>

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
          >
            <DeleteIcon />
          </Button>

          <AccordionPanel p={4}>
            <HStack>
              <Text px={2}>{props.name}</Text>
              <Spacer />
              <Button
                size="sm"
                className="colorPallette"
                bg={props.color}
                borderRadius="50%"
                display={{ base: 'initial', md: 'none' }}
              ></Button>
            </HStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
