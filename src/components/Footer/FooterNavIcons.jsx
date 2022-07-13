import { IconButton, Link } from '@chakra-ui/react';

export const FooterNavIcons = ({ elem, color, href = '/' }) => {
  return (
    <Link href={href} isExternal="true">
      <IconButton
        colorScheme={color}
        isRound="true"
        variant="outline"
        size="md"
        icon={elem}
      />
    </Link>
  );
};
