import { Center, Spinner } from '@chakra-ui/react';

import { useCentralTheme } from '@/theme';

export const Preloader = () => {
  const { textColor } = useCentralTheme();

  return (
    <>
      <Center p={4}>
        <Spinner thickness={4} speed="0.8s" color={textColor} size="xl" />
      </Center>
    </>
  );
};

export default Preloader;
