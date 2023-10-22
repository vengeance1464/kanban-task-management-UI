import { Dialog, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { columnsSelector } from '../../../redux/columns/selector';
import taskSlice, {
  addTask,
  deleteSubTask,
  editTask,
} from '../../../redux/task/taskSlice';
import { Button } from '../../Button';
import FormDropdown from '../../Form/FormDropdown';
import FormInput from '../../Form/FormInput';
import { Cross } from '../../Icons/Cross';
import { BaseModal } from '../BaseModal';
import { AddTaskProps } from '../types';
import { mapAddTaskData } from './types';

const AddTaskComponent: React.FC<AddTaskProps> = ({
  open,
  handleClose,
  isUpdate = false,
  task,
}) => {
  const columns = useSelector(columnsSelector);
  console.log('Add task ', task);
  //const [subTasks, setSubTasks] = useState(isUpdate ? task.subtasks.length : 1);
  const { handleSubmit, reset, control, setValue } = useForm({
    defaultValues: {
      title: task ? task.title : '',
      description: task ? task.description : '',
      status: task ? task.status : '',
    },
  });
  const [subTasksList, setSubTasksList] = useState<string[]>(() => {
    if (task) {
      console.log('setting SUbtasks');
      return task.subtasks.map((subTask) => subTask.title);
    } else {
      return [''];
    }
  });

  console.log('subtasks', subTasksList);

  const dispatch = useDispatch();

  // const getSubtasks = () => {
  //   const subTasksList: React.JSX.Element[] = [];
  //   for (let i = 0; i < subTasks; i++) {
  //     subTasksList.push(
  //       <FormInput
  //         initialValue={
  //           isUpdate && i < task.subtasks.length ? task.subtasks[i].title : ''
  //         }
  //         name={`subTask-${i}`}
  //         label={''}
  //         control={control}
  //       >
  //         <Cross
  //           onClick={() => {
  //             setSubTasks(subTasks.splice());
  //           }}
  //         />
  //       </FormInput>,
  //     );
  //   }
  //   return subTasksList;
  // };

  const onSubmit = (data: any) => {
    const mappedFormData = mapAddTaskData({ ...data, id: task.id });
    console.log('mappedData', mappedFormData);
    if (isUpdate) dispatch(editTask(mappedFormData));
    else dispatch(addTask(mappedFormData));
    handleClose();
  };

  const onCrossClick = (index: number) => {
    console.log('list ');

    setSubTasksList((subTasksList: string[]) => {
      const list = subTasksList.filter((_: any, i: any) => i !== index);
      console.log('list ', list);
      return list;
    });
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Stack direction="column" gap={2}>
        <Typography>{isUpdate ? 'Edit Task' : 'Add New Task'}</Typography>
        <FormInput
          name="title"
          label="Title"
          control={control}
          initialValue={isUpdate ? task.title : ''}
        />
        <FormInput
          name="description"
          label="Description"
          control={control}
          initialValue={isUpdate ? task.description : ''}
        />
        <label>Subtasks</label>
        {subTasksList !== null &&
          subTasksList.length > 0 &&
          subTasksList.map((subTask, index) => {
            return (
              <FormInput
                initialValue={subTask}
                name={`subTask-${index}`}
                label={''}
                key={`subTask-${index}`}
                control={control}
              >
                <Cross onClick={(event: any) => onCrossClick(index)} />
              </FormInput>
            );
          })}

        <Button
          title={'Add Sub Task'}
          variant={'contained'}
          onClick={() => {
            setSubTasksList([...subTasksList, '']);
          }}
        />
        <FormDropdown
          items={columns.map((column) => column.name)}
          name={'status'}
          label={'Status'}
          control={control}
          initialValue={task ? task.status : columns[0].name}
        />
        <Button
          title={isUpdate ? 'Save Changes' : 'Create Task'}
          variant={'contained'}
          onClick={handleSubmit(onSubmit)}
        />
      </Stack>
    </BaseModal>
  );
};

export default React.memo(AddTaskComponent);
