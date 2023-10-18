import { Checkbox, FormControlLabel } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { FormCheckboxProps } from './types';

export const FormCheckboxInput: React.FC<
  PropsWithChildren<FormCheckboxProps>
> = ({ label, onClick = null, isChecked }) => {
  const [checked, setChecked] = React.useState(isChecked);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);

    if (onClick) onClick();
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name="demoCheckbox"
          color="primary"
        />
      }
      sx={{
        textDecoration: checked ? 'line-through' : 'initial',
      }}
      label={label}
    />
  );
};
