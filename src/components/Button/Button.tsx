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
        background: '#635FC7',
        width: '10vw',
        height: '36px',
        lineHeight: 'normal',
        ...styles,
      }}
      variant={variant}
      onClick={onClick}
    >
      <Typography
        sx={{
          fontSize: '1.25rem',
          fontWeight: 700,
          fontStyle: 'normal',
          color: '#fff',
          textAlign: 'center',
          textTransform: 'none',
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};

export default ButtonComponent;
