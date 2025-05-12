import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Snack } from '../components/snackBar';
import { AlertDialog } from '../components/alertDialog/alertDialog';
import { addAlert } from '../store/fetch-tanque';

const renderAlertsTable = (alertsList: any[]) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Alerta Text</TableCell>
          <TableCell>Usuario Crea</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {alertsList.map(({ alertatext, usuariocrea }) => (
          <TableRow key={alertatext}>
            <TableCell>{alertatext}</TableCell>
            <TableCell>{usuariocrea}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default function Step4({ tanqueId, alerts }: { tanqueId: any; alerts: any[] }) {
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [newAlertaText, setNewAlertaText] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newData = {
      alertaText: data.get('alertaText'),
      usuarioCrea: 2,
      tanqueId,
    };
    await saveData(newData);
  };

  const saveData = async (data: any) => {
    const { status } = await addAlert(data);
    if (status) {
      setShowSnack(true);
      setMessage('Alerta Guardada con éxito');
      setShowDialog(false);
      setNewAlertaText(data.alertaText);
      const updatedAlerts = [...alerts, { alertatext: data.alertaText, usuarioCrea: 2 }];
      setAlerts(updatedAlerts);
    }
  };

  const [alertList, setAlerts] = useState(alerts);

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {renderAlertsTable(alertList)}
        <Button color="secondary" startIcon={<AddIcon />} onClick={() => setShowDialog(true)}>
          Agregar
        </Button>
      </Box>
      <Snack show={showSnack} setShow={() => setShowSnack(false)} message={message} />
      <AlertDialog showDialog={showDialog} setShowDialog={() => setShowDialog(false)}>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid item xs={12} sm={12}>
            <FormControl sx={{ width: 500 }}>
              <TextField id="alertaText" label="Observación" name="alertaText" multiline rows={4} />
            </FormControl>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Guardar
          </Button>
        </Box>
      </AlertDialog>
    </Container>
  );
}
