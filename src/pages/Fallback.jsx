import { Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import i18next from 'i18next';

export const Fallback = () => (
  <Box bg="gray.300" w="100%" p={4} textAlign="center" fontSize="2xl">
    {i18next.t('fallback.message')}
    <Navigate to={'login'} replace={false} />
  </Box>
);
