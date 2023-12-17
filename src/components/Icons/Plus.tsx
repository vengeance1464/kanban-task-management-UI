import { IconButton } from '@mui/material';
import React from 'react';
import { PropsWithChildren } from '../../react-app-env';
import { IconProps } from './types';

export const Plus: React.FC<PropsWithChildren<IconProps>> = ({
  onClick,
  fillColor,
}) => {
  return (
    <IconButton sx={{}} onClick={onClick}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.368 12V7.344H12V4.632H7.368V0H4.656V4.632H0V7.344H4.656V12H7.368Z"
          fill="white"
        />
      </svg>
    </IconButton>
  );
};
