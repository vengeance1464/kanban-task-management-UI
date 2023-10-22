import { Stack, TextField } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './types';

const FormInput: React.FC<PropsWithChildren<FormInputProps>> = ({
  name,
  control,
  label,
  children,
  initialValue,
}) => {
  console.log('initial,', initialValue);
  return (
    <>
      <Stack direction="column">
        {label.length > 0 && <label>{label}</label>}
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <Stack direction="row" gap={2} alignItems="center">
              <TextField
                helperText={error ? error.message : null}
                size="small"
                error={!!error}
                onChange={onChange}
                value={value}
                defaultValue={initialValue ? initialValue : ''}
                fullWidth
                label={''}
                variant="outlined"
              />
              {children}
            </Stack>
          )}
        />
      </Stack>
    </>
  );
};

export default FormInput;
