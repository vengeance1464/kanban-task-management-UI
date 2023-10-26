import React from 'react';
import { Box, Dialog, Modal, useTheme } from '@mui/material';
import { IBaseModalProps } from '../types';
import { PropsWithChildren } from '../../../react-app-env';

const BaseModalComponent: React.FC<PropsWithChildren<IBaseModalProps>> = ({
  open,
  handleClose,
  children,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.modalColor.backgroundColor,
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
