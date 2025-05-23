import React, { useEffect, useState } from 'react';
import { BaseModal } from '../BaseModal';
import { AIPromptModalProps, IBaseModalProps } from '../types';
import { Stack, Typography } from '@mui/material';
import FormInput from '../../Form/FormInput';
import { useForm } from 'react-hook-form';
import { Button } from '../../Button';
import { axios } from '../../../api';
import TaskGrid from '../../TaskGrid/TaskGrid';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../redux/task/taskSlice';
import { currentBoardSelector } from '../../../redux/currentBoard/selector';
import { boardsSelector } from '../../../redux/board/selector';

const AIPromptComponent: React.FC<AIPromptModalProps> = ({
  open,
  handleClose,
  createBoardOpen,
  setCreateBoardOpen,
}) => {
  const { handleSubmit, reset, control } = useForm();
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [fetchSuggestions, setFetchSuggestions] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const currentBoard = useSelector(currentBoardSelector);
  const boards = useSelector(boardsSelector);
  console.log('Boards', boards.length);

  const onSubmit = async (data: any) => {
    console.log('prompt ', data.prompt);
    setMessage(data.prompt);
  };

  const sanitizeResponse = (response: any) => {
    console.log('Res', response);
    // Regex pattern to match unwanted characters before the JSON brackets
    const regex = /^[^{[]*/; // Matches any characters that are not '{' or '[' at the beginning of the string

    // Remove unwanted characters using regex
    const sanitizedResponse = response.replace(regex, '');

    console.log('Sanitized res', sanitizedResponse);
    return sanitizedResponse;
  };
  useEffect(() => {
    async function fetchTasks() {
      const aiSuggestions = await axios
        .get(`/ai/getAIResponse?message=${message}`)
        .then((res) => res.data);

      console.log('suggestions ', aiSuggestions);
      //sanitizeResponse(aiSuggestions);

      setAiSuggestions(aiSuggestions.tasks);
      setMessage('');
    }

    if (message.length > 0) fetchTasks();
  }, [message]);
  return (
    <BaseModal
      styles={{ maxHeight: '75vh' }}
      open={open}
      handleClose={handleClose}
    >
      <Typography
        sx={{
          fontSize: '1.5rem',
          color: (theme) => theme.palette.primary.dark,
        }}
      >
        Generate Tasks using AI
      </Typography>
      <FormInput
        name="prompt"
        required
        register
        label="Title"
        control={control}
      />

      <Button
        title={'Generate Tasks'}
        variant={'contained'}
        onClick={handleSubmit(onSubmit)}
        styles={{
          width: '100%',
        }}
      />

      {aiSuggestions.length > 0 && <TaskGrid tasks={aiSuggestions} />}
      {aiSuggestions.length > 0 && (
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button
            title="Create Board"
            variant={'text'}
            onClick={() => {
              dispatch(
                addTask(
                  aiSuggestions.map((suggestion: any, index: number) => {
                    return {
                      id: index + 1,
                      title: suggestion.title,
                      description: '',
                      status: 'Todo',
                      subtasks: suggestion.subtasks.map(
                        (subtask: any, index: number) => ({
                          title: subtask.title,
                          isCompleted: false,
                          id: index + 1,
                        }),
                      ),
                      boardId: boards.length + 1,
                    };
                  }),
                ),
              );
              setCreateBoardOpen(true);

              handleClose();
            }}
          />
          <Button
            title="Add "
            variant={'text'}
            onClick={() => {
              dispatch(
                addTask(
                  aiSuggestions.map((suggestion: any, index: number) => {
                    return {
                      id: index + 1,
                      title: suggestion.title,
                      description: '',
                      status: 'Todo',
                      subtasks: suggestion.subtasks.map(
                        (subtask: any, index: number) => ({
                          title: subtask.title,
                          isCompleted: false,
                          id: index + 1,
                        }),
                      ),
                      boardId: currentBoard,
                    };
                  }),
                ),
              );
              handleClose();
            }}
          />
        </Stack>
      )}
    </BaseModal>
  );
};

export default AIPromptComponent;
