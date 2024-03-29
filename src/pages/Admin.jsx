import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { Center, Heading } from '@chakra-ui/react';

import { getUser } from '@/api/User';
import { Preloader } from '@/components';
import { i18n } from '@/i18n';
import { useCentralTheme } from '@/theme';

export const Admin = () => {
  const { data: dataUser, isFetched: isFetchedUser } = useQuery(
    ['user'],
    getUser
  );

  const { textColor } = useCentralTheme();

  return (
    <>
      {!isFetchedUser && <Preloader />}
      {!!dataUser &&
      !!dataUser.data &&
      !dataUser.data.isAdmin &&
      isFetchedUser ? (
        <Navigate to="/" replace={true} />
      ) : (
        <Center h="full" flexDirection="column">
          <Heading as="h1" color={textColor} size="xl">
            {i18n.t('admin.welcomePage')}
          </Heading>
        </Center>
      )}
    </>
  );
};
