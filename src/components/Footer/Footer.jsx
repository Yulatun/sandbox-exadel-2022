import { Center, Text } from '@chakra-ui/react';
import i18next from 'i18next';

import { useCentralTheme } from '@/theme';

export const Footer = () => {
  const { textColor } = useCentralTheme();

  const currentYear = new Date().getFullYear();

  return (
    <Center as="footer" p={16} minH={24}>
      <Text as="span" color={textColor} fontSize="xl">
        {i18next.t('footer.message')} &copy; {currentYear}
      </Text>
    </Center>
  );
};
