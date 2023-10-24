import { InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { Controller } from 'react-hook-form';
import { FormDropdownProps, FormInputProps } from './types';

const FormDropdown: React.FC<PropsWithChildren<FormDropdownProps>> = ({
  name,
  control,
  label,
  items,
  initialValue,
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
          render={({ field }) => (
            <Select
              labelId="demo-simple-select-outlined-label"
              label=""
              defaultValue={initialValue ? initialValue : ''}
              {...field}
            >
              {items.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          )}
        />
      </Stack>
    </>
  );
};

export default FormDropdown;
