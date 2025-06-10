'use client';
import React, { useState, useContext, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {Container, Typography, Card, CardContent, Grid, Box, Stack, IconButton} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataContext } from '../context/context';
import URL from '../utils/url';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';

const theme = createTheme();

export default function Reports() {
  const { nombre }: any = useContext(DataContext);
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);

  const informes = useMemo(() => [
    { key: 'all', text: "Todos Usuarios", desc: "Listado completo de todos los usuarios." },
    { key: 'administradores', text: "Usuarios corporativos", desc: "Usuarios con rol administrativo." },
    { key: 'clientes', text: "Clientes", desc: "Usuarios que actúan como clientes." },
    { key: 'conductores', text: "Conductores", desc: "Conductores activos registrados." },
    { key: 'pedidos/all', text: "Trazabilidad", desc: "Historial de pedidos y movimientos." },
    { key: 'no_entregados', text: "Pedidos no entregados", desc: "Pedidos pendientes de entrega." },
    { key: 'pedidos/entregado', text: "Facturación", desc: "Pedidos entregados para facturación." },
    { key: 'vehiculos', text: "Vehículos", desc: "Estado y datos de vehículos." },
    { key: 'tanques', text: "Tanques", desc: "Información sobre tanques registrados." },
    { key: 'revisiones', text: "Revisiones", desc: "Historial de revisiones técnicas." },
  ], []);

  const handleExport = async (key: string) => {
    if (!start || !end) {
      alert("Selecciona fechas de inicio y fin");
      return;
    }

    const fechaInicio = start.format('YYYY-MM-DD');
    const fechaFin = end.format('YYYY-MM-DD');
    const url = `${URL}/informe/${key}/${fechaInicio}/${fechaFin}/${nombre}`;
    //console.log('Ruta de descarga:',url);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `informe-${key}-${fechaInicio}-${fechaFin}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exportando el archivo:", error);
      alert("No se pudo descargar el informe.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ pt: 4, pb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 2 }}>
              <DatePicker label="Fecha Inicio" value={start} onChange={(value) => setStart(dayjs(value))} />
              <DatePicker label="Fecha Final" value={end} onChange={(value) => setEnd(dayjs(value))} />
            </Stack>
          </LocalizationProvider>
        </Box>

        <Grid container spacing={2}>
          {informes.map(({ key, text, desc }, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  p: 1.5,
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 1.5 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Box display="flex" alignItems="center">
                        <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {text}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {desc}
                      </Typography>
                    </Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleExport(key)}
                      title="Descargar informe"
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}