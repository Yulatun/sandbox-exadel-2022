import { Link } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';

export const Landing = () => {
  return (
    <>
      <Box bg="bisque" w="100%" p={4} color="blueviolet">
        <Flex direction="column" justify="center" align="center">
          <main>
            <h2>Welcome to the landing page!</h2>
          </main>
          <nav>
            <Link to="/categories">About</Link>
          </nav>
        </Flex>
      </Box>
    </>
  );
};
