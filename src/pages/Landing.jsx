import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import i18next from 'i18next';

import { Footer } from '@/components';

import { CustomModal } from '../components/Modal/CustomModal';

export const Landing = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <>
      <Box bg="bisque" w="100%" h="1000px" p={4} color="blueviolet">
        <Flex direction="column" justify="center" align="center">
          <main>
            <h2>{i18next.t('landing.welcomeMessage')}</h2>
            <CustomModal
              isOpen={isDeleteModalOpen}
              onSubmit={() => setDeleteModalOpen(false)}
              onClose={() => setDeleteModalOpen(false)}
              title={i18next.t('Account deletion')}
              text={i18next.t(
                'Are you sure you want to delete your account? All your data will be lost, you can download your report from the Statistics page before confirming'
              )}
            />
          </main>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
