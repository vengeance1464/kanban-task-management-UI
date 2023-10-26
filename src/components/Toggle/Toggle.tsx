import { Switch, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { IToggleProps } from './types';

const ToggleComponent: React.FC<IToggleProps> = ({ checked, handleChange }) => {
  const theme = useTheme();
  return (
    <div>
      <Switch
        sx={{
          color: checked ? theme.palette.primary.main : theme.palette.grey[700],
        }}
        checked={checked}
        onChange={handleChange}
      />
      {/* {checked ? <span>On</span> : <span>Off</span>} */}
    </div>
  );
};

export default React.memo(ToggleComponent);
