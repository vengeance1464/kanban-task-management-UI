import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '../../Button';
import { BaseModal } from '../BaseModal';
import { DeleteProps } from '../types';

const DeleteComponent: React.FC<DeleteProps> = ({
  open,
  handleClose,
  onDelete,
  onCancel,
  title,
  description,
}) => {
  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Stack direction="column" gap={1}>
        <Typography>{title}</Typography>
        <Typography>{description}</Typography>
      </Stack>
      <Stack direction="row">
        <Button title={'Delete'} variant={'text'} onClick={onDelete} />
        <Button title={'Cancel'} variant={'text'} onClick={onCancel} />
      </Stack>
    </BaseModal>
  );
};

export default React.memo(DeleteComponent);
