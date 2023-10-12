import { Dialog, Stack, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../Button';
import FormInput from '../../Form/FormInput';
import { BaseModal } from '../BaseModal';
import { AddTaskProps } from '../types';

const AddTaskComponent: React.FC<AddTaskProps> = ({
  open,
  handleClose,
  status,
}) => {
  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: {
      title: '',
    },
  });

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Stack direction="column" gap={2}>
        <Typography>Add New Task</Typography>
        <FormInput name="title" label="Title" control={control} />
        <FormInput name="title" label="Description" control={control} />
        <FormInput name="title" label="Subtasks" control={control} />
        <FormInput name="title" label="Status" control={control} />
        <Button
          title={'Create Task'}
          variant={'contained'}
          onClick={() => null}
        />
      </Stack>
    </BaseModal>
  );
};

export default React.memo(AddTaskComponent);
