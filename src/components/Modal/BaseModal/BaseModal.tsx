import React from 'react';
import { Box, Dialog, Modal, useTheme } from '@mui/material';
import { IBaseModalProps } from '../types';
import { PropsWithChildren } from '../../../react-app-env';
import { useDevice } from '../../utils/hooks/useDevice';

const BaseModalComponent: React.FC<PropsWithChildren<IBaseModalProps>> = ({
  open,
  handleClose,
  children,
  styles,
}) => {
  const theme = useTheme();
  const { isMobile } = useDevice();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.modalColor.backgroundColor,
          boxShadow: 'none',
          width: isMobile ? '100%' : '50%',
          padding: '32px',
          ...styles,
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default React.memo(BaseModalComponent);
