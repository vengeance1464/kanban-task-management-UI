import React, { useEffect, useState } from 'react';
import { IBaseModalProps } from '../types';
import { BaseModal } from '../BaseModal';
import { Box, Stack } from '@mui/material';
import { PieChart } from '../../Charts/PieChart';
import { axios } from '../../../api';
import FilterDropdown from '../../Filter/FilterDropdown';
import { useSelector } from 'react-redux';
import { boardsSelector } from '../../../redux/board/selector';
import { currentBoardSelector } from '../../../redux/currentBoard/selector';
import { LineChart } from '../../Charts/LineChart';

const AnalyticsModalComponent: React.FC<IBaseModalProps> = ({
  open,
  handleClose,
}) => {
  const [stats, setStats] = useState<any>();
  const boards = useSelector(boardsSelector);
  const [boardStats, setBoardStats] = useState<any>();
  const [board, setSelectedBoard] = useState(
    boards && boards.length > 0 && boards[0],
  );
  const [duration, setDuration] = useState('Week');

  useEffect(() => {
    async function fetchTaskStats() {
      const stats = (await axios.get(`/tasks/getStats/${Number(board.id)}`))
        .data;
      console.log('stats ', stats);
      setStats(stats);
      const boardStats = (await axios.get(`/tasks/filter?trend=${duration}`))
        .data;
      console.log('board stats ', boardStats);
      setBoardStats(boardStats);
    }

    fetchTaskStats();
  }, [board]);
  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Stack direction="column" justifyContent={'space-between'}>
        <Box>
          {stats && stats !== null && (
            <Stack justifyContent={'center'} direction={'row'}>
              <Box sx={{ width: '50%' }}>
                <PieChart
                  header={'Task Count Analysis'}
                  labels={[...Object.keys(stats)]}
                  data={[...Object.values(stats)]}
                />
              </Box>
              <FilterDropdown
                handleSelect={(e: any) => {
                  setSelectedBoard(e.target.value);
                }}
                selectedValue={board}
                styles={{ height: 'fit-content' }}
                items={boards}
              />
            </Stack>
          )}
          {/* {boardStats && boardStats !== null && (
            <Stack justifyContent={'center'} direction={'row'}>
              <Box sx={{ width: '50%' }}>
                <LineChart
                  header={'Task Count Analysis'}
                  labels={[...Object.keys(boardStats)]}
                  data={boardStats}
                />
              </Box>
              <FilterDropdown
                handleSelect={(e: any) => {
                  setDuration(e.target.value);
                }}
                selectedValue={duration}
                styles={{ height: 'fit-content' }}
                items={['Week', 'Month', 'Year']}
              />
            </Stack>
          )} */}
        </Box>
      </Stack>
    </BaseModal>
  );
};

export default React.memo(AnalyticsModalComponent);
