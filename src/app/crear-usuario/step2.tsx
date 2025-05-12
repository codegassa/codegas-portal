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
  MenuItem,
  Select,
  InputLabel
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
          <TableCell>Observacion</TableCell>
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
  const handleZonaChange = (id: any) => {
    const label = zona.find(zona => zona._id === id).nombre;
    setSelectedZona(label)
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newData = {
      direccion: data.get('direccion'),
      capacidad: data.get('capacidad'),
      observacion: data.get('observacion'),
      idZona: data.get('idZona'),
      idCliente: userId,
    };
    await saveData(newData);
  };

  const saveData = async (data: any) => {
    const { status } = await addPuntoUser(data);
    if (status) {
      setShowSnack(true);
      setMessage('Ubicación Guardada con éxito');
      setShowDialog(false);

      const updatedPunto = [...puntos, { direccion: data.direccion, nombrezona: selectedZona, capacidad: data.capacidad, observacion: data.observacion }];
      setPuntosList(updatedPunto);
    }
  };

  const [puntosList, setPuntosList] = useState(puntos);

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {renderPunto(puntosList)}
        <Button color="secondary" startIcon={<AddIcon />} onClick={() => setShowDialog(true)}>
          Agregar
        </Button>
      </Box>
      <Snack show={showSnack} setShow={() => setShowSnack(false)} message={message} />
      <AlertDialog showDialog={showDialog} setShowDialog={() => setShowDialog(false)}>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={10} sm={12}>
                <FormControl sx={{ width: 500 }}>
                <TextField id="direccion" label="Dirección" name="direccion"/>
                </FormControl>
            </Grid>
            <Grid item xs={10} sm={12}>
                <FormControl sx={{ width: 500 }}>
                <TextField id="capacidad" label="Capacidad Almacenamiento" name="capacidad"/>
                </FormControl>
            </Grid>
            <Grid item xs={10} sm={12}>
                <FormControl sx={{ width: 500 }}>
                <TextField id="observacion" label="Observacion Ingreso Vehiculo" name="observacion"/>
                </FormControl>
            </Grid>
            <Grid item xs={10} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="idZona">Zonas</InputLabel>
                <Select
                  labelId="idZona"
                  id="idZona"
                  label="Zona"
                  name="idZona"
                  onChange={(e) => {
                    handleZonaChange(e.target.value);
                  }}
                >
                  {
                    zona.map(({nombre, _id})=> <MenuItem value={_id} key={_id}>{nombre}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Guardar
            </Button>
          </Grid>
        </Box>
      </AlertDialog>
    </Container>
  );
}
