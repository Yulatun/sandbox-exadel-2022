import React from 'react';
import { Icon } from '@chakra-ui/react';

export default function UserIcon({
  color = 'white',
  width = '30',
  height = '30'
}) {
  return (
    <Icon w={width} h={height} color={color}>
      <path
        viewBox="0 0 24 24"
        fill="currentColor"
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      />
      <circle fill="currentColor" cx="12" cy="7" r="4" />
    </Icon>
  );
}
