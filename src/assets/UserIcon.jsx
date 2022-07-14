import React from 'react';
import { Icon } from '@chakra-ui/react';

export default function UserIcon({
  color = 'white',
  width = '30',
  height = '30'
}) {
  return (
    <Icon w={width} h={height} color={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </Icon>
  );
}
