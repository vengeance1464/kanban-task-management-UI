import { InputLabel, Stack, TextField } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { Controller } from 'react-hook-form';
import { FormInputProps, InputSize } from './types';

const FormInput: React.FC<PropsWithChildren<FormInputProps>> = ({
  name,
  control,
  label,
  children,
  initialValue,
  register,
  inputSize,
  disabled,
  required = false,
}) => {
  return (
    <>
      <Stack direction="column">
        {label.length > 0 && (
          <InputLabel
            sx={{
              fontSize: '1rem',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
              color: (theme) => theme.palette.grey[700],
            }}
          >
            {label}
          </InputLabel>
        )}
        <Controller
          name={name}
          control={control}
          rules={{
            required: { value: true, message: 'Required' },
          }}
          render={({ field, fieldState: { error }, formState }) => (
            <Stack direction="row" gap={2} alignItems="center">
              <TextField
                helperText={error ? 'Required' : null}
                size="small"
                error={error && error.message.length > 0}
                required={required}
                {...field}
                multiline={inputSize === InputSize.LARGE}
                rows={inputSize === InputSize.LARGE ? 4 : 1}
                sx={{
                  background: (theme) =>
                    theme.palette.otherColor.backgroundColor,
                  border: !error && '1px solid rgba(130, 143, 163)',
                  borderRadius: '4px',
                }}
                //onChange={onChange}
                //value={value}
                //defaultValue={initialValue ? initialValue : ''}
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
