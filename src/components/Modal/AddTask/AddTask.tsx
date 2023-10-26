import { Dialog, InputLabel, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
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
import { InputSize } from '../../Form/types';

const AddTaskComponent: React.FC<AddTaskProps> = ({
  open,
  handleClose,
  isUpdate = false,
  task,
}) => {
  const columns = useSelector(columnsSelector);
  console.log('Add task ', task);
  //const [subTasks, setSubTasks] = useState(isUpdate ? task.subtasks.length : 1);
  const { handleSubmit, reset, control, setValue, register } = useForm({
    defaultValues: {
      title: task ? task.title : '',
      description: task ? task.description : '',
      status: task ? task.status : '',
      subTasks: task ? task.subtasks : [],
    },
  });

  const {
    control: subTaskControl,
    reset: resetSubTasks,
    getValues,
  } = useForm();

  //const { register, control: subTaskControl } = useForm();

  // const watchedFields = useWatch({
  //   control: subTaskControl,
  //   names: dynamicNames,
  // });

  const [subTasksList, setSubTasksList] = useState<string[]>(() => {
    if (task) {
      console.log('setting SUbtasks');
      return task.subtasks.map((subTask) => subTask.title);
    } else {
      return [];
    }
  });

  const { fields, append, remove } = useFieldArray<any>({
    control: control,
    name: 'subTasks',
  });

  // const [subTaskKeys, setSubTaskKeys] = useState(() => {
  //   return subTasksList.map((_, index) => `subTask-${index}`);
  // });

  // const watchFields = watch(subTaskKeys);

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
  // useEffect(() => {
  //   resetSubTasks(
  //     task ? ({ subTasks: task.subtasks } as any) : { subTasks: [] },
  //   );
  // }, []);

  const onSubmit = (data: any) => {
    console.log('data ', data, getValues());
    // console.log('watch ', watchFields);
    const mappedFormData = mapAddTaskData({
      ...data,
      id: task.id,
      ...getValues(),
    });
    console.log('mappedData', mappedFormData);
    if (isUpdate) dispatch(editTask(mappedFormData));
    else dispatch(addTask(mappedFormData));
    handleClose();
  };

  const onCrossClick = (index: number) => {
    console.log('list ');

    remove(index);

    // setSubTasksList((subTasksList: string[]) => {
    //   const list = subTasksList.filter((_: any, i: any) => i !== index);
    //   console.log('list ', list);
    //   return list;
    // });
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
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
          register
          label="Title"
          control={control}
          //initialValue={isUpdate ? task.title : ''}
        />
        <FormInput
          register
          name="description"
          label="Description"
          control={control}
          inputSize={InputSize.LARGE}
          //initialValue={isUpdate ? task.description : ''}
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
                //initialValue={subTask}
                name={`subTasks.${index}].title`}
                register
                label={''}
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
            append({
              id: isUpdate ? task.subtasks.length + 1 : 1,
              title: '',
              isCompleted: false,
            });
            //setSubTasksList([...subTasksList, '']);
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
          register
          control={control}
          // initialValue={task ? task.status : columns[0].name}
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
