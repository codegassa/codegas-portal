'use client';
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Definir los tipos de las props de manera explícita
interface AlertConfirmProps {
  openConfirm: boolean;
  title: string;
  handleConfirm: () => void;
  handleClose: () => void;
}

const AlertConfirm: React.FC<AlertConfirmProps> = ({ openConfirm, title, handleConfirm, handleClose }) => {
  return (
    <Dialog
      open={openConfirm}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle id="draggable-dialog-title" sx={{ cursor: 'move' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertConfirm;