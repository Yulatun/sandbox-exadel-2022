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
  Text,
  useColorModeValue
} from '@chakra-ui/react';

export const AccordionComponent = (props) => {
  const bgMain = useColorModeValue('orange.50', 'teal.800');

  return (
    <>
      <Accordion allowToggle="true" margin={5}>
        <AccordionItem
          border="1px transparent"
          borderRadius={8}
          bg={bgMain}
          position="relative"
          boxShadow="sm"
        >
          <Text as="h2">
            <AccordionButton>
              <AccordionIcon
                height={{ base: 8, md: 10 }}
                width={{ base: 8, md: 10 }}
              />
              <Text as="span" px={{ base: 2, md: 14 }}>
                {props.title}
              </Text>
            </AccordionButton>
          </Text>

          <Button
            size="sm"
            className="colorPallette"
            bg="gray"
            borderRadius="50%"
            position="absolute"
            top={3}
            left={16}
            display={{ base: 'none', md: 'initial' }}
          ></Button>

          <Button
            position="absolute"
            size={{ base: 'sm', md: 'md' }}
            w={{ base: 8, md: 10 }}
            top={2}
            right={{ base: 14, md: 16, lg: 20 }}
          >
            <EditIcon />
          </Button>

          <Button
            position="absolute"
            size={{ base: 'sm', md: 'md' }}
            w={{ base: 8, md: 10 }}
            top={2}
            right={4}
            variant="danger"
          >
            <DeleteIcon />
          </Button>

          <AccordionPanel p={4}>
            <HStack>
              <Text px={2}>{props.content}</Text>
              <Spacer />
              <Button
                size="sm"
                className="colorPallette"
                bg="gray"
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
