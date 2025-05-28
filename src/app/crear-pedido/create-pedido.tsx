'use client'
import React, { useState, useContext, useCallback } from 'react';
import {Avatar, Box, Button, FormControl, Container, CssBaseline, InputLabel, Grid, MenuItem,
  Select, TextField, Typography, Autocomplete, Paper, Divider, SelectChangeEvent} from '@mui/material';
import BorderColor from '@mui/icons-material/BorderColor';
import { Snack } from "../components/snackBar";
import { forma, mes, dia1, dia2, diaSemana, frecuencia } from "../utils/pedido_info";
import { createPedido } from "../store/fetch-pedido";
import { usePathname, useRouter } from 'next/navigation';
import { Date } from "../components/date";
import moment from 'moment';
import { DataContext } from '../context/context';

export default function CrearPedido({ user, puntos }: any) {
  const { idUser: usuarioCrea}: any = useContext(DataContext);
  const router = useRouter();
  const pathname = usePathname();
  const [usuarioId, setUsuarioId] = useState('');
  const [search, setSearch] = useState('');
  const [puntoId, setPuntoId] = useState('');
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    forma: "",
    frecuencia: "",
    dia1: "",
    dia2: ""
  });

  const handleChange = useCallback((prop: string, value: string | null) => {
    setForm((prevForm) => ({ ...prevForm, [prop]: value }));
  }, []);

    const handleChangeSelect = (event: any, value: any) => {
    event.preventDefault();
    setUsuarioId(value._id as string);
    router.push(`${pathname}?search=${search}&idUser=${value._id}`, undefined)

    if(event.key === 'Enter') {
      setSearch(event.target.value)
      router.push(`${pathname}?search=${event.target.value}`, undefined)
    }

  }
  const handleChangePunto = (event: SelectChangeEvent) => {
    setPuntoId(event.target.value as string);
  };
const [date, setDate] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newData = {
      forma: data.get('forma'),
      cantidadKl: Number(data.get('cantidadKl')),
      cantidadPrecio: Number(data.get('cantidadPrecio')),
      fechaSolicitud: moment(date).format('YYYY-MM-DD'),
      usuarioId,
      puntoId: Number(data.get('puntoId')),
      observacion: data.get('observaciones'),
      usuarioCrea,
      frecuencia: data.get('frecuencia'),
      dia1: data.get('dia1'),
      dia2: data.get('dia2')
    };

if (!newData.forma || !newData.usuarioId || !newData.puntoId) {
  alert("Llena los campos obligatorios");
  return;
}
await saveData(newData);

  };
const saveData = async (data: any) => {
  const { status } = await createPedido(data);
  if (status) {
    setShowSnack(true);
    setMessage("Pedido Guardado con éxito");

    // Reset campos controlados por estado
    setForm({ forma: "", frecuencia: "", dia1: "", dia2: "" });
    setUsuarioId('');
    setSearch('');
    setPuntoId('');
  }
};

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 2, mt: 6, borderRadius: 5 }}>
        <Box display="flex" alignItems="center" gap={5} mb={3}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <BorderColor fontSize="small"/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear Nuevo Pedido
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="forma">Forma</InputLabel>
                <Select
                  name="forma"
                  size = "small"
                  value={form?.forma}
                  onChange={(e) => handleChange('forma', e.target.value)}
                  label="Forma"
                  required
                >
                  {forma.map(({ value, label }) => (
                    <MenuItem value={value} key={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {form.forma && form.forma != "lleno" && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  required
                  size = "small"
                  name={form.forma === 'monto' ? 'cantidadPrecio' : 'cantidadKl'}
                  label={form.forma === 'monto' ? 'Monto' : 'Cantidad (Kg)'}
                  type={form.forma === 'monto' ? 'Monto' : 'Cantidad (Kg)'}
                  id={form.forma === 'monto' ? 'Monto' : 'Cantidad (Kg)'}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={4}>
              <Date value={date} setValueDate={setDate} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="Observaciones"
                label="Observaciones"
                name="observaciones"
                fullWidth
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                freeSolo
                id="usuarioId"
                disableClearable
                inputValue={search}
                options={search.length >= 4 ? user : []}
                getOptionLabel={(option) => option.razon_social ?? ""}
                onInputChange={(e, value) => setSearch(value)}
                onChange={handleChangeSelect}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar usuario"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              />
            </Grid>

            {puntos && puntos.length!=0  
            && (<Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="puntoId">Punto</InputLabel>
                  <Select
                    name="puntoId"
                    labelId="puntoId"
                    value={puntoId}
                    label="Punto"
                    onChange={handleChangePunto}
                    required
                  >
                    {puntos.map(({ _id, direccion }: any) => (
                      <MenuItem value={_id} key={_id}>{direccion}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
             {
                puntos && puntos.length==0
                &&<p>este usuario no tiene Puntos</p>
              }

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="frecuencia">Frecuencia</InputLabel>
                <Select
                  name="frecuencia"
                  size="small"
                  value={form?.frecuencia}
                  displayEmpty
                  label="Frecuencia"
                  onChange={({target}) => handleChange('frecuencia', target.value)}
                >
                  {frecuencia.map(({ value, label }) => (
                    <MenuItem value={value} key={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {form.frecuencia === 'mensual' && (
              <Grid item xs={12} sm={6} md={4}>
                <SelectDia name="dia1" size="small" label="Día" items={mes} value={form.dia1} onChange={handleChange} />
              </Grid>
            )}

            {form.frecuencia === 'quincenal' && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <SelectDia name="dia1" size="small" label="Día 1" items={dia1} value={form.dia1} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <SelectDia name="dia2" size="small" label="Día 2" items={dia2} value={form.dia2} onChange={handleChange} />
                </Grid>
              </>
            )}

            {form.frecuencia === 'semanal' && (
              <Grid item xs={12} sm={6} md={4}>
                <SelectDia name="dia1" size="small" label="Día" items={diaSemana} value={form.dia1} onChange={handleChange} />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" size="large">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Snack show={showSnack} setShow={() => setShowSnack(false)} message={message} />
    </Container>
  );
}

function SelectDia({ name, label, items, value, onChange }: any) {
  return (
    <FormControl fullWidth>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        name={name}
        value={value || ''}
        label={label}
        onChange={(e) => onChange(name, e.target.value)}
      >
        {items.map((item: any) => (
          <MenuItem value={item.value || item} key={item.value || item}>
            {item.label || item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}