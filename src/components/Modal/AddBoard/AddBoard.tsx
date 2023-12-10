import React, { useEffect, useState } from 'react';
import { BaseModal } from '../BaseModal';
import { Stack, Typography } from '@mui/material';
import FormInput from '../../Form/FormInput';
import { useForm } from 'react-hook-form';
import { IBaseModalProps } from '../types';
import { Button } from '../../Button';
import { useSelector } from 'react-redux';
import { boardsSelector } from '../../../redux/board/selector';
import { useDispatch } from 'react-redux';
import { addBoard } from '../../../redux/board/boardSlice';
import { updateCurrentBoard } from '../../../redux/currentBoard/currentBoardSlice';

const AddBoard: React.FC<IBaseModalProps> = ({ open, handleClose }) => {
  const { handleSubmit, reset, control, setValue, register } = useForm();
  const boards = useSelector(boardsSelector);
  const dispatch = useDispatch();
  const onSubmit = (data: any) => {
    console.log('data ', data);
    dispatch(
      addBoard({
        id: boards.length + 1,
        name: data.boardName,
      }),
    );
    dispatch(updateCurrentBoard(boards.length + 1));
    handleClose();
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Stack direction="column" gap={2}>
        <Typography
          sx={{
            fontSize: '1.5rem',
            color: (theme: any) => theme.palette.primary.dark,
          }}
        >
          Add New Board
        </Typography>
        <FormInput
          name="boardName"
          register
          label="Name"
          control={control}
          disabled
          //initialValue={isUpdate ? task.title : ''}
        />
        <Button
          title={'Create New Board'}
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

export default AddBoard;
