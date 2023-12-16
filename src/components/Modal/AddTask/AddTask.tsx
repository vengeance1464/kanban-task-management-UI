import { Dialog, InputLabel, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { columnsSelector } from '../../../redux/columns/selector';
import { addTask, editTask } from '../../../redux/task/taskSlice';
import { Button } from '../../Button';
import FormDropdown from '../../Form/FormDropdown';
import FormInput from '../../Form/FormInput';
import { Cross } from '../../Icons/Cross';
import { BaseModal } from '../BaseModal';
import { AddTaskProps } from '../types';
import { IFormData, mapAddTaskData } from './types';
import { InputSize } from '../../Form/types';
import { allTasksSelector } from '../../../redux/task/selectors';
import { axios } from '../../../api';
import { currentBoardSelector } from '../../../redux/currentBoard/selector';

const AddTaskComponent: React.FC<AddTaskProps> = ({
  open,
  handleClose,
  isUpdate = false,
  task,
}) => {
  const columns = useSelector(columnsSelector);
  const tasks = useSelector(allTasksSelector);
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task ? task.title : '',
      description: task ? task.description : '',
      status: task ? task.status : 'Todo',
      subTasks: task ? task.subtasks : [],
    },
  });

  const {
    control: subTaskControl,
    reset: resetSubTasks,
    getValues,
  } = useForm();

  const [subTasksList, setSubTasksList] = useState<string[]>(() => {
    if (task) {
      return task.subtasks.map((subTask) => subTask.title);
    } else {
      return [];
    }
  });

  const { fields, append, remove } = useFieldArray<any>({
    control: control,
    name: 'subTasks',
  });

  const dispatch = useDispatch();

  const currentBoard = useSelector(currentBoardSelector);

  const onSubmit = async (data: any) => {
    const mappedFormData = mapAddTaskData({
      ...data,
      id: isUpdate ? task.id : tasks.length + 1,
      boardId: currentBoard,
      ...getValues(),
    });
    if (isUpdate) {
      const res = await axios.put('/tasks/update', mappedFormData);
      dispatch(editTask(mappedFormData));
    } else {
      const res = await axios.post('/tasks/add', mappedFormData);
      dispatch(addTask(mappedFormData));
    }
    handleClose();
  };

  const onCrossClick = (index: number) => {
    remove(index);
  };

  return (
    <BaseModal
      styles={{ maxHeight: '75vh' }}
      open={open}
      handleClose={handleClose}
    >
      <Stack direction="column" gap={2}>
        <Typography
          sx={{
            fontSize: '1.5rem',
            color: (theme) => theme.palette.primary.dark,
          }}
        >
          {isUpdate ? 'Edit Task' : 'Add New Task'}
        </Typography>
        <FormInput
          name="title"
          required
          register
          label="Title"
          control={control}
        />
        <FormInput
          register
          name="description"
          label="Description"
          control={control}
          required
          inputSize={InputSize.LARGE}
        />
        <InputLabel
          sx={{
            fontSize: '1rem',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            color: (theme) => theme.palette.grey[700],
          }}
        >
          SubTasks
        </InputLabel>
        {fields !== null &&
          fields.length > 0 &&
          fields.map((subTask, index) => {
            return (
              <FormInput
                name={`subTasks.${index}].title`}
                register
                label={''}
                required
                control={control}
                key={subTask.id}
              >
                <Cross onClick={(event: any) => onCrossClick(index)} />
              </FormInput>
            );
          })}

        <Button
          title={'+ Add Sub Task'}
          variant={'contained'}
          onClick={() => {
            const subtask = {
              id: isUpdate ? task.subtasks.length + 1 : 1,
              title: '',
              isCompleted: false,
            };
            append(subtask);
          }}
          styles={{
            width: '100%',
            color: (theme: any) => `${theme.palette.primary.main} !important`,
            backgroundColor: (theme: any) =>
              `${theme.palette.otherColor.secondaryColor} !important`,
            ':hover': {
              backgroundColor: (theme: any) =>
                `${theme.palette.otherColor.primaryLightColor} !important`,
            },
          }}
        />
        <FormDropdown
          items={columns.map((column) => column.name)}
          name={'status'}
          label={'Status'}
          required
          register
          control={control}
        />
        <Button
          title={isUpdate ? 'Save Changes' : 'Create Task'}
          variant={'contained'}
          onClick={handleSubmit(onSubmit)}
          styles={{
            width: '100%',
          }}
        />
      </Stack>
    </BaseModal>
  );
};

export default React.memo(AddTaskComponent);
