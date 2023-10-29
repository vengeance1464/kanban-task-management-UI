import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '../../Button';
import { BaseModal } from '../BaseModal';
import { DeleteProps } from '../types';
import { useDevice } from '../../utils/hooks/useDevice';

const DeleteComponent: React.FC<DeleteProps> = ({
  open,
  handleClose,
  onDelete,
  onCancel,
  title,
  description,
}) => {
  const { isMobile } = useDevice();
  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Stack direction="column" justifyContent={'space-between'} gap={3}>
        <Typography
          sx={{
            fontSize: '1.5rem',
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: '1.2rem' }}>{description}</Typography>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          justifyContent={'center'}
          gap={1}
        >
          <Button
            styles={{
              backgroundColor: (theme: any) => theme.palette.secondary.main,
              ':hover': {
                backgroundColor: (theme: any) => theme.palette.secondary.light,
              },
              width: isMobile && '100%',
            }}
            title={'Delete'}
            variant={'text'}
            onClick={onDelete}
          />

          <Button
            styles={{
              width: isMobile && '100%',
            }}
            title={'Cancel'}
            variant={'text'}
            onClick={onCancel}
          />
        </Stack>
      </Stack>
    </BaseModal>
  );
};

export default React.memo(DeleteComponent);
