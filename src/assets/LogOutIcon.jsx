import React from 'react';
import { Icon } from '@chakra-ui/react';

export function LogOutIcon({ color = 'black', width = '24', height = '24' }) {
  return (
    <Icon w={width} h={height} color={color}>
      <path
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      />
      <polyline fill="currentColor" points="16 17 21 12 16 7" />
      <line stroke="currentColor" x1="17" y1="12" x2="7" y2="12" />
    </Icon>
  );
}
