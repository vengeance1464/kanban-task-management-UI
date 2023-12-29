import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../utils/firebase/FirebaseProvider';
import { BaseModal } from '../BaseModal';
import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';
import { Button } from '../../Button';
import { axios } from '../../../api';
import { IBaseModalProps } from '../types';
import { useSelector } from 'react-redux';
import { boardsSelector } from '../../../redux/board/selector';
import { useFirebaseAuth } from '../../utils/hooks/useFirebaseAuth';
import AnalyticsModal from '../Analytics/AnalyticsModal';

const ProfileComponent = ({ open, handleClose }: IBaseModalProps) => {
  const { user, signIn, signOut } = useFirebaseAuth();

  const [stats, setStats] = useState();
  const boards = useSelector(boardsSelector);
  const [analyticsOpen, setAnlytiicsOpen] = useState(false);

  useEffect(() => {
    async function fetchTaskStats() {
      const stats = await axios.get('/tasks/getStats');
      setStats(stats.data);
    }

    fetchTaskStats();
  }, []);
  return (
    <>
      <BaseModal
        open={open}
        handleClose={handleClose}
        styles={{ overflowX: 'hidden' }}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Avatar sx={{ width: '15%', height: '15%' }} src={user.photoURL} />
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <Grid item md={4} xs={12} sm={6}>
            <Typography
              sx={{ fontWeight: '700', fontStize: '20px', color: '#000' }}
            >
              <h3>Total&nbsp;&nbsp;Boards</h3>
            </Typography>
            <Typography sx={{ fontSize: '16px' }}>
              {boards ? boards.length : 0}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12} sm={6}>
            <Typography
              sx={{ fontWeight: '700', fontStize: '20px', color: '#000' }}
            >
              <h3>Total&nbsp;&nbsp;Pending&nbsp;&nbsp;Tasks</h3>
            </Typography>
            <Typography sx={{ fontSize: '16px', color: 'red' }}>
              {stats ? stats['Todo'] : 0}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12} sm={6}>
            <Typography
              sx={{ fontWeight: '700', fontStize: '20px', color: '#000' }}
            >
              <h3>Total&nbsp;&nbsp;In&nbsp;Progress&nbsp;&nbsp;Tasks</h3>
            </Typography>
            <Typography sx={{ fontSize: '16px', color: 'orange' }}>
              {stats ? stats['Doing'] : 0}
            </Typography>
          </Grid>
          <Grid item md={4} xs={12} sm={6}>
            <Typography
              sx={{ fontWeight: '700', fontStize: '20px', color: '#000' }}
            >
              <h3>Total&nbsp;&nbsp;Completed&nbsp;&nbsp;Tasks</h3>
            </Typography>
            <Typography sx={{ fontSize: '16px', color: 'green' }}>
              {stats ? stats['Done'] : 0}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
          }}
        >
          <Button
            styles={{
              width: '75%',
            }}
            variant="contained"
            onClick={() => {
              setAnlytiicsOpen(true);
            }}
          >
            View Analytics
          </Button>
          <Button
            styles={{
              width: '75%',
            }}
            variant="contained"
            onClick={() => {
              signOut();
              handleClose();
            }}
          >
            Sign Out
          </Button>
        </Box>
      </BaseModal>
      {analyticsOpen && (
        <AnalyticsModal
          open={analyticsOpen}
          handleClose={() => setAnlytiicsOpen(false)}
        />
      )}
    </>
  );
};
export default React.memo(ProfileComponent);
