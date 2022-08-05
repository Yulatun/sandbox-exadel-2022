import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

import { useCentralTheme } from '@/theme';

export const FiltersTag = ({ text }) => {
  const { textColor } = useCentralTheme();

  return (
    <Tag size="lg" variant="solid" bgColor={textColor}>
      <TagLabel>{text}</TagLabel>
      <TagCloseButton />
    </Tag>
  );
};
