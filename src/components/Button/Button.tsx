import * as React from 'react';
import Button from '@mui/material/Button';

const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  variant,
  onClick,
}) => {
  return (
    <Button
      sx={{
        borderRadius: '20px',
        background: '#635FC7',
      }}
      variant={variant}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default ButtonComponent;
