import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Center, Heading } from '@chakra-ui/react';

import { getUser } from '@/api/User';
import { i18n } from '@/i18n';

export const Admin = () => {
  const { data: dataUser, isFetched: isFetchedUser } = useQuery(
    ['user'],
    getUser
  );

  const navigate = useNavigate();

  return (
    <>
      {!!dataUser &&
      !!dataUser.data &&
      !!dataUser.data.isAdmin &&
      isFetchedUser ? (
        <Center h="full" flexDirection="column">
          <Heading as="h1" size="xl">
            {i18n.t('admin.welcomePage')}
          </Heading>
          <Heading as="h2" size="md" m={4}>
            {i18n.t('admin.disclaimer')}
          </Heading>
        </Center>
      ) : (
        navigate('/', { replace: true })
      )}
    </>
  );
};
