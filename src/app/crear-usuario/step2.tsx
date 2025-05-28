import React, { useState, useCallback } from 'react';
import {
  Box, Button, Container, CssBaseline, FormControl, Grid, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  MenuItem, Select, InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Snack } from '../components/snackBar';
import { AlertDialog } from '../components/alertDialog/alertDialog';
import { addPuntoUser } from '../store/fetch-punto';

const renderPunto = (puntos: any[]) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Dirección</TableCell>
          <TableCell>Zona</TableCell>
          <TableCell>Capacidad</TableCell>
          <TableCell>Observación</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {puntos.map(({ _id, direccion, nombrezona, capacidad, observacion }) => (
          <TableRow key={_id}>
            <TableCell>{direccion}</TableCell>
            <TableCell>{nombrezona}</TableCell>
            <TableCell>{capacidad}</TableCell>
            <TableCell>{observacion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default function Step4({ userId, zona, puntos }: { userId: any; zona: any[], puntos: any[] }) {
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [selectedZona, setSelectedZona] = useState('');
  const [puntosList, setPuntosList] = useState(puntos);

  const handleZonaChange = useCallback((id: any) => {
    const label = zona.find(z => z._id === id)?.nombre || '';
    setSelectedZona(label);
  }, [zona]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const cleanText = (value: any) => String(value).toUpperCase().replace(/\s+/g, ' ');

    const newData = {
      direccion: cleanText(form.get('direccion')),
      capacidad: form.get('capacidad'),
      observacion: cleanText(form.get('observacion')),
      idZona: form.get('idZona'),
      idCliente: userId,
    };

    const { status } = await addPuntoUser(newData);
    if (status) {
      setShowSnack(true);
      setMessage('Ubicación Guardada con éxito');
      setShowDialog(false);
      setPuntosList(prev => [...prev, {
        direccion: newData.direccion,
        nombrezona: selectedZona,
        capacidad: newData.capacidad,
        observacion: newData.observacion,
      }]);
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {renderPunto(puntosList)}
        <Button color="secondary" startIcon={<AddIcon />} onClick={() => setShowDialog(true)}>
          Agregar
        </Button>
      </Box>
      <Snack show={showSnack} setShow={() => setShowSnack(false)} message={message} />
      <AlertDialog showDialog={showDialog} setShowDialog={() => setShowDialog(false)}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField fullWidth name="direccion" label="Dirección" /></Grid>
            <Grid item xs={12}><TextField fullWidth name="capacidad" label="Capacidad Almacenamiento" /></Grid>
            <Grid item xs={12}><TextField fullWidth name="observacion" label="Observación Ingreso Vehículo" /></Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="idZona">Zonas</InputLabel>
                <Select name="idZona" label="Zona" onChange={(e) => handleZonaChange(e.target.value)}>
                  {zona.map(({ nombre, _id }) => (
                    <MenuItem key={_id} value={_id}>{nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </AlertDialog>
    </Container>
  );
}