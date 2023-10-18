import { Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateSubTask } from '../../../redux/task/taskSlice';
import { FormCheckboxInput } from '../../Form/FormCheckboxInput';
import { SubTask, Task } from '../../Task/types';
import { BaseModal } from '../BaseModal';
import { UpdateTaskProps } from '../types';

const UpdateTaskComponent: React.FC<UpdateTaskProps> = ({
  open,
  handleClose,
  task,
}) => {
  const dispatch = useDispatch();

  // const taskRef = useRef({ ...task });
  const onSubtaskSelected = (index: number) => {
    // let subtasks = { ...task.subtasks };
    dispatch(updateSubTask({ ...task, subTaskIndex: index }));
  };
  const getSubtasks = (task: Task) => {
    if (task.subtasks && task.subtasks.length > 0) {
      const totalSubtasks = task.subtasks.length;
      const completedSubtasks = task.subtasks.filter(
        (subtask: any) => subtask.isCompleted,
      ).length;
      return [totalSubtasks, completedSubtasks];
    }

    return [0, 0];
  };

  return (
    <BaseModal
      open={open}
      handleClose={() => {
        handleClose();
      }}
    >
      <Stack direction="column" gap={1}>
        <Typography>{task.title}</Typography>
        <Typography>{task.description}</Typography>
        <Typography>
          Subtasks({getSubtasks(task)[1]} of {getSubtasks(task)[0]} )
        </Typography>
        {task.subtasks &&
          task.subtasks.length > 0 &&
          task.subtasks.map((subtask, index) => (
            <FormCheckboxInput
              isChecked={subtask.isCompleted}
              onClick={() => onSubtaskSelected(index)}
              label={subtask.title}
            />
          ))}
      </Stack>
    </BaseModal>
  );
};

export default React.memo(UpdateTaskComponent);
