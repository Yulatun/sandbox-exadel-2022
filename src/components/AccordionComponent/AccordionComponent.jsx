import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button
} from '@chakra-ui/react';

export const AccordionComponent = (props) => {
  return (
    <>
      <Accordion allowToggle="true" margin="20px">
        <AccordionItem border="1px solid" borderRadius="5px">
          <h2>
            <AccordionButton>
              <Box px={5} textAlign="left">
                <AccordionIcon height="40px" width="40px" />
              </Box>
              <Box flex=".5" textAlign="right" width="10px">
                <Button
                  className="colorPallette"
                  bg="gray"
                  borderRadius="50%"
                ></Button>
              </Box>

              <Box flex="2" px={10} textAlign="left">
                <p>{props.name}</p>
              </Box>

              <Box flex="2" px={5} textAlign="right">
                <Button>Edit</Button>
              </Box>

              <Box textAlign="right">
                <Button variant="danger">Delete</Button>
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{props.message}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
