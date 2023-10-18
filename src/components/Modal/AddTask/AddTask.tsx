import { Dialog, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../redux/task/taskSlice';
import { Button } from '../../Button';
import FormInput from '../../Form/FormInput';
import { BaseModal } from '../BaseModal';
import { AddTaskProps } from '../types';
import { mapAddTaskData } from './types';

const AddTaskComponent: React.FC<AddTaskProps> = ({ open, handleClose }) => {
  const [subTasks, setSubTasks] = useState(1);
  const { handleSubmit, reset, control, setValue } = useForm({
    defaultValues: {
      title: '',
    },
  });
  const dispatch = useDispatch();

  const getSubtasks = () => {
    const subTasksList = [];
    for (let i = 0; i < subTasks; i++) {
      subTasksList.push(
        <FormInput name={`subTask-${i}`} label={''} control={control}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="12.728"
              width="3"
              height="18"
              transform="rotate(45 12.728 0)"
              fill="#828FA3"
            />
            <rect
              y="2.12109"
              width="3"
              height="18"
              transform="rotate(-45 0 2.12109)"
              fill="#828FA3"
            />
          </svg>
        </FormInput>,
      );
    }
    return subTasksList;
  };

  const onSubmit = (data: any) => {
    const mappedFormData = mapAddTaskData(data);
    console.log('mappedData', mappedFormData);
    dispatch(addTask(mappedFormData));
    handleClose();
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Stack direction="column" gap={2}>
        <Typography>Add New Task</Typography>
        <FormInput name="title" label="Title" control={control} />
        <FormInput name="description" label="Description" control={control} />
        <label>Subtasks</label>
        {subTasks !== null && getSubtasks()}

        <Button
          title={'Add Sub Task'}
          variant={'contained'}
          onClick={() => {
            setSubTasks(subTasks + 1);
          }}
        />
        <FormInput name="status" label="Status" control={control} />
        <Button
          title={'Create Task'}
          variant={'contained'}
          onClick={handleSubmit(onSubmit)}
        />
      </Stack>
    </BaseModal>
  );
};

export default React.memo(AddTaskComponent);
