import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

import { useCentralTheme } from '@/theme';

export const FiltersTag = ({
  text,
  type,
  value,
  isOnClose = true,
  onClose,
  bgColor = ''
}) => {
  const { textColor } = useCentralTheme();

  return (
    <Tag size="lg" mr={3} mb={3} variant="solid" bgColor={bgColor || textColor}>
      <TagLabel>{text}</TagLabel>
      {isOnClose && (
        <TagCloseButton id={type} value={value} onClick={onClose} />
      )}
    </Tag>
  );
};
