import { IconButton } from '@mui/material';
import React from 'react';
import { PropsWithChildren } from '../../react-app-env';
import { IconProps } from './types';

export const UpArrow: React.FC<PropsWithChildren<IconProps>> = ({
  onClick,
}) => {
  return (
    <IconButton onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="7"
        viewBox="0 0 9 7"
        fill="none"
      >
        <path d="M9 6L5 2L1 6" stroke="#635FC7" stroke-width="2" />
      </svg>
    </IconButton>
  );
};
