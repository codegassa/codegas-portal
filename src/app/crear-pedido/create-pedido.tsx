'use client'
import React, { useState, useContext, useCallback } from 'react';
import {Avatar, Box, Button, FormControl, Container, CssBaseline, InputLabel, Grid, MenuItem, Select, TextField, Typography, SelectChangeEvent, Autocomplete} from '@mui/material';
import BorderColor from '@mui/icons-material/BorderColor';
import {Snack} from "../components/snackBar"
import {forma, mes, dia1, dia2, diaSemana, frecuencia} from "../utils/pedido_info"
import {createPedido} from "../store/fetch-pedido"
import { usePathname, useRouter } from 'next/navigation';
import {Date} from "../components/date"
import moment from 'moment';
import {DataContext} from '../context/context'


export default function CrearPedido({user, puntos}: any) {
  const {idUser: usuarioCrea}: any = useContext(DataContext)
  const router = useRouter();
  const pathname = usePathname();

  const [usuarioId, setUsuarioId] = useState('');
  const [search, setSearch] = useState('');
  const [puntoId, setPuntoId] = useState('');
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    forma: null,
    frecuencia: null,
    dia1: null,
    dia2: null
  });
  const [date, setDate] = useState('')
  const handleChangeSelect = useCallback((event: any, value: any) => {
    event.preventDefault();
    setUsuarioId(value._id as string);
    router.push(`${pathname}?search=${search}&idUser=${value._id}`, undefined);

    if (event.key === 'Enter') {
      setSearch(event.target.value);
      router.push(`${pathname}?search=${event.target.value}`, undefined);
    }
  }, [pathname, search, router]);
  
  const handleChangePunto = useCallback((event: SelectChangeEvent) => {
    setPuntoId(event.target.value as string);
  }, []);

  const handleChange = useCallback((prop: string, value: string | null) => {
    setForm((prevForm) => ({ ...prevForm, [prop]: value }));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    
    if(!newData.forma || !newData.usuarioId || !newData.puntoId ) alert("Llena los campos obligatorios")
    saveData(newData)
  };
  
  const saveData = async (data: any) => {
    const {status} = await createPedido(data)
    if (status) {
      setShowSnack(true)
      setMessage("Pedido Guardado con exito")
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <BorderColor />
        </Avatar>
        <Typography component="h1" variant="h5">
          Nuevo Pedido
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="forma">Forma</InputLabel>
                <Select
                  required
                  name="forma"
                  labelId="forma"
                  id="forma"
                  value={form?.forma}
                  label="Forma"
                  onChange={({target})=>handleChange('forma', target.value)}
                >
                  {
                    forma.map(({value, label})=> <MenuItem value={value} key={value}>{label}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>
            {
              (form?.forma && form?.forma!=="lleno")
              &&<Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={form?.forma === 'monto' ?'cantidadPrecio' :'cantidadKl'}
                  label={form?.forma === 'monto' ?'cantidadPrecio' :'cantidadKl'}
                  type={form?.forma === 'monto' ?'cantidadPrecio' :'cantidadKl'}
                  id={form?.forma === 'monto' ?'cantidadPrecio' :'cantidadKl'}
                />
              </Grid>
            }
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
              <Date value={date} setValueDate={setDate} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <TextField
                  id="Observaciones"
                  label="Observaciones"
                  name="observaciones"
                  multiline
                  rows={3}
                />
              </FormControl>
            </Grid> 
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Autocomplete
                  sx={{ width: 400 }}
                  freeSolo
                  id="usuarioId"
                  disableClearable
                  options={user}
                  getOptionLabel={(option) => option.razon_social?? ""}
                  onChange={handleChangeSelect}
                  // onClose={()=>alert("close")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Buscar Usuarios..."
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        // onKeyDown: searchUser,
                      }}
                    />
                  )}
                />
            </FormControl>
          </Grid> 
              {
                puntos && puntos.length!==0
                &&<Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="puntoId">Punto</InputLabel>
                    <Select
                      required
                      labelId="puntoId"
                      id="puntoId"
                      name="puntoId"
                      value={puntoId}
                      label="Punto"
                      onChange={handleChangePunto}
                    >
                      {
                          puntos.map(({_id, direccion}: any)=> <MenuItem value={_id} key={_id}>{direccion}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                </Grid> 
              }
              {
                puntos && puntos.length===0
                &&<p>este usuario no tiene Puntos</p>
              }
          
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="forma">Frecuencia</InputLabel>
                  <Select
                    required
                    name="frecuencia"
                    labelId="frecuencia"
                    id="frecuencia"
                    value={form?.frecuencia}
                    label="Frecuencia"
                    onChange={({target})=>handleChange('frecuencia', target.value)}
                  >
                    {
                      frecuencia.map(({value, label})=> <MenuItem value={value} key={value}>{label}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>

              {
                form?.frecuencia==='mensual'
                ?<Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="forma">Dia</InputLabel>
                    <Select
                      required
                      name="dia1"
                      labelId="dia1"
                      id="dia1"
                      value={form?.dia1}
                      label="Dia"
                      onChange={({target})=>handleChange('dia1', target.value)}
                    >
                      {
                        mes.map(e=> <MenuItem value={e} key={e}>{e}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                </Grid>
                :form?.frecuencia==='quincenal'
                ?<>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <InputLabel id="forma">Dia 1</InputLabel>
                      <Select
                        required
                        name="dia1"
                        labelId="dia1"
                        id="dia1"
                        value={form?.dia1}
                        label="Dia 1"
                        onChange={({target})=>handleChange('dia1', target.value)}
                      >
                        {
                          dia1.map(e=> <MenuItem value={e} key={e}>{e}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <InputLabel id="forma">Dia 2</InputLabel>
                        <Select
                          required
                          name="dia2"
                          labelId="dia2"
                          id="dia2"
                          value={form?.dia2}
                          label="Dia 2"
                          onChange={({target})=>handleChange('dia2', target.value)}
                        >
                          {
                            dia2.map(e=> <MenuItem value={e} key={e}>{e}</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                :form?.frecuencia==='semanal'
                &&<Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <InputLabel id="forma">Dia 1</InputLabel>
                      <Select
                        required
                        name="dia1"
                        labelId="dia1"
                        id="dia1"
                        value={form?.dia1}
                        label="Dia 1"
                        onChange={({target})=>handleChange('dia1', target.value)}
                      >
                        {
                          diaSemana.map(({value, label})=> <MenuItem value={value} key={value}>{label}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                  </Grid>
              }
              
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} />
    </Container>
  );
}