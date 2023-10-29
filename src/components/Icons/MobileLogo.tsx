import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { PropsWithChildren } from '../../react-app-env';
import { IconProps } from './types';
import { Theme, ThemeContext, useTheme } from '@emotion/react';
import { useDevice } from '../utils/hooks/useDevice';

export const MobileLogo: React.FC<PropsWithChildren<IconProps>> = ({
  onClick,
  fillColor,
}) => {
  return (
    <IconButton
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="6" height="25" rx="2" fill="#635FC7" />
        <rect
          opacity="0.75"
          x="9"
          width="6"
          height="25"
          rx="2"
          fill="#635FC7"
        />
        <rect
          opacity="0.5"
          x="18"
          width="6"
          height="25"
          rx="2"
          fill="#635FC7"
        />
      </svg>
    </IconButton>
  );
};
