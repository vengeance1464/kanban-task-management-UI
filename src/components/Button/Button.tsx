import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { PropsWithChildren } from '../../react-app-env';

const ButtonComponent: React.FC<PropsWithChildren<ButtonProps>> = ({
  title,
  variant,
  onClick,
  styles,
  children,
}) => {
  return (
    <Button
      sx={{
        borderRadius: '20px',
        background: (theme) => theme.palette.buttonColor.backgroundColor,
        width: '10vw',
        height: '36px',
        lineHeight: 'normal',
        color: '#fff',
        fontSize: '1.25rem',
        textAlign: 'center',
        textTransform: 'none',
        ...styles,
      }}
      variant={variant}
      onClick={onClick}
    >
      {title && title != '' ? title : children}
    </Button>
  );
};

export default ButtonComponent;
