import { Link } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';

export const Categories = () => {
  return (
    <>
      <Box bg="orange.300" w="100%" p={4} color="cornsilk">
        <Flex direction="column" justify="center" align="center">
          <main>
            <h2>Welcome to the categories!</h2>
          </main>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </Flex>
      </Box>
    </>
  );
};
