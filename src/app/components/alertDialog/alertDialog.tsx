'use client'

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import type { AlertDialogProps } from './alertDialog.types';

export function AlertDialog({ children, showDialog, setShowDialog }: AlertDialogProps) {
  return (
    <Dialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}