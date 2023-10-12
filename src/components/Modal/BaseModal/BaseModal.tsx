import React from 'react';
import { Box, Dialog, Modal } from '@mui/material';
import { IBaseModalProps } from '../types';
import { PropsWithChildren } from '../../../react-app-env';

const BaseModalComponent: React.FC<PropsWithChildren<IBaseModalProps>> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: 'white',
          boxShadow: 'none',
          width: '50%',
          padding: '32px',
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default React.memo(BaseModalComponent);
