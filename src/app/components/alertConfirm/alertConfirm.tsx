'use client';
import React, { memo, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';

interface AlertConfirmProps {
  openConfirm: boolean;
  title: string;
  handleConfirm: () => void;
  handleClose: () => void;
}

// Componente de transición suave
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertConfirm = ({ openConfirm, title, handleConfirm, handleClose }: AlertConfirmProps) => {
  return (
    <Dialog
      open={openConfirm}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" sx={{ cursor: 'move' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AlertConfirm);