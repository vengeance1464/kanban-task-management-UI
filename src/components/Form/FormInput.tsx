import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './types';

const FormInput: React.FC<FormInputProps> = ({ name, control, label }) => {
  return (
    <>
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={''}
            variant="outlined"
          />
        )}
      />
    </>
  );
};

export default FormInput;
