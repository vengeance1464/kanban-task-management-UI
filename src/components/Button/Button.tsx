import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  variant,
  onClick,
  styles,
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
      {title}
    </Button>
  );
};

export default ButtonComponent;
