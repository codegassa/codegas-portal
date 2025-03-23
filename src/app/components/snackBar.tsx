'use client'
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// Definir Alert como componente funcional con tipo adecuado
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackProps {
  severity?: 'error' | 'warning' | 'info' | 'success'; // Definir los posibles valores de severity
  message: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>; // Función que actualiza el estado de `show`
}

export const Snack: React.FC<SnackProps> = ({ severity = 'success', message, show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default Snack;