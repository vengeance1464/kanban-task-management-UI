import { IconButton } from '@mui/material';
import React from 'react';
import { PropsWithChildren } from '../../react-app-env';
import { IconProps } from './types';

export const Cross: React.FC<PropsWithChildren<IconProps>> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="12.728"
          width="3"
          height="18"
          transform="rotate(45 12.728 0)"
          fill="#828FA3"
        />
        <rect
          y="2.12109"
          width="3"
          height="18"
          transform="rotate(-45 0 2.12109)"
          fill="#828FA3"
        />
      </svg>
    </IconButton>
  );
};
