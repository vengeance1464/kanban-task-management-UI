import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSubTask } from '../../../redux/task/taskSlice';
import { FormCheckboxInput } from '../../Form/FormCheckboxInput';
import { More } from '../../Icons/More';
import { Menu } from '../../Menu/Menu';
import { SubTask, Task } from '../../Task/types';
import { AddTask } from '../AddTask';
import { BaseModal } from '../BaseModal';
import { Delete } from '../Delete';
import { UpdateTaskProps } from '../types';
import { deleteTask } from '../../../redux/task/taskSlice';
import { axios } from '../../../api';
const UpdateTaskComponent: React.FC<UpdateTaskProps> = ({
  open,
  handleClose,
  task,
  handleMenuItem,
}) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  // const [editTask, setEditTask] = useState(false);
  // const [deleteCurrentTask, setDeleteCurrentTask] = useState(false);

  const onSubtaskSelected = (index: number) => {
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

  const onMoreClick = () => {
    setMenuOpen(true);
  };

  return (
    <BaseModal
      open={open}
      handleClose={() => {
        handleClose();
      }}
    >
      <Stack direction="column" gap={2}>
        <Stack direction="row" justifyContent={'space-between'}>
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.dark,
              fontSize: '1.5rem',
            }}
          >
            {task.title}
          </Typography>
          <More onClick={onMoreClick} />
        </Stack>
        <Typography
          sx={{
            color: (theme) => theme.palette.grey[700],
            fontSize: '1.1rem',
            fontWeight: '500',
            lineHeight: '23px',
          }}
        >
          {task.description}
        </Typography>
        <Typography
          sx={{
            fontSize: '1rem',
            color: (theme) => theme.palette.grey[700],
          }}
        >
          Subtasks({getSubtasks(task)[1]} of {getSubtasks(task)[0]} )
        </Typography>
        <Stack gap={1}>
          {task.subtasks &&
            task.subtasks.length > 0 &&
            task.subtasks.map((subtask, index) => (
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.info.light,
                  borderRadius: '4px',
                }}
              >
                <FormCheckboxInput
                  isChecked={subtask.isCompleted}
                  onClick={() => onSubtaskSelected(index)}
                  label={subtask.title}
                />
              </Box>
            ))}
        </Stack>
      </Stack>
      {menuOpen && (
        <Menu
          items={['Edit Task', 'Delete Task']}
          open={menuOpen}
          handleItem={handleMenuItem}
          handleClose={() => setMenuOpen(false)}
        />
      )}
      {/* {editTask && (
        <AddTask
          open={editTask}
          isUpdate={true}
          handleClose={() => setEditTask(false)}
          task={task}
        />
      )}
      {deleteCurrentTask && (
        <Delete
          onDelete={async () => {
            await axios.delete('/tasks/delete', { id: task.id });
            dispatch(deleteTask(task));
            setDeleteCurrentTask(false);
          }}
          onCancel={() => setDeleteCurrentTask(false)}
          title={'Delete this task?'}
          description={`Are you sure you want to delete the 
            ‘${task.title}’ task and its subtasks? This action cannot be reversed.`}
          open={deleteCurrentTask}
          handleClose={() => setDeleteCurrentTask(false)}
        />
      )} */}
    </BaseModal>
  );
};

export default React.memo(UpdateTaskComponent);
