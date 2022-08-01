import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import i18next from 'i18next';

export const AccordionComponent = (props) => {
  const bgMain = useColorModeValue('orange.50', 'teal.900');

  return (
    <>
      <Accordion allowToggle="true" margin="20px">
        <AccordionItem bg={bgMain}>
          <Box>
            <AccordionButton>
              <Box bg={bgMain} px={5} textAlign="left">
                <AccordionIcon height="40px" width="40px" />
              </Box>
              <Box flex="2" px={10} textAlign="left">
                <p display="inline-block">{props.title}</p>
              </Box>
            </AccordionButton>
            <Button
              className="colorPallette"
              position="relative"
              display="inline-block"
              left="13%"
              bottom="2.8rem"
              bg="gray"
              borderRadius="50%"
            ></Button>
            <Button
              position="relative"
              display="inline-block"
              left="67%"
              bottom="2.8rem"
            >
              {i18next.t('button.edit')}
            </Button>
            <Button
              variant="danger"
              position="relative"
              display="inline-block"
              bottom="2.8rem"
              left="70%"
            >
              {i18next.t('button.delete')}
            </Button>
          </Box>
          <AccordionPanel pb={4}>{props.content}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
