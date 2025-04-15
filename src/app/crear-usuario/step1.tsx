'use client'
import React, {useState, useContext,useCallback} from 'react';
import { Box, Button, FormControl, Container, CssBaseline, InputLabel, Grid, MenuItem, Select, TextField, SelectChangeEvent} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import {Snack} from "../components/snackBar"
import {accesos, fields, tipos} from "../utils/users_info"
import {createUser} from "../store/fetch-user"
import {DataContext} from '../context/context'

// Definimos el tipo de severity
type SeverityType = 'error' | 'success' | 'warning' | 'info';

export default function Step1({data}: any) {
  const {createUserFirebase}: any = useContext(DataContext)
  const [idPadre, setIdPadre] = useState('');
  const router = useRouter();
  const pathname = usePathname()
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SeverityType>();
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setIdPadre(event.target.value as string);
  };

  const [newAcceso, setNewAcceso] = useState('')
  const [newTipo, setTipo] = useState('')
  const handleChange = useCallback((event: SelectChangeEvent) => {
    setNewAcceso(event.target.value as string);}, []);
  const handleTipo = useCallback((event: SelectChangeEvent) => {
    setTipo(event.target.value as string);}, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      // Convertir 'razon_social' y 'nombre' a mayúsculas y eliminar espacios/saltos de línea
        const razonSocial = (data.get('razon_social') as string)
          .toUpperCase()
          .replace(/\s+/g, ''); // Eliminar todos los espacios y saltos de línea
        const nombre = (data.get('nombre') as string)
          .toUpperCase()
          .replace(/\s+/g, ''); // Eliminar todos los espacios y saltos de línea

    try {
      const response = await createUserFirebase(data.get('email'));
      if (typeof response === 'string') {
        setSeverity("error")
        setShowSnack(true)
        setMessage("Este email ya existe")
        console.log('Error:', response);
      } else {
        const newData = {
          email: data.get('email'),
          cedula: data.get('cedula'),
          nombre: data.get('nombre'),
          celular: data.get('celular'),
          codMagister: data.get('codMagister'),
          razon_social: data.get('razon_social'),
          direccion_factura: data.get('direccion_factura'),
          codt: data.get('codt'),
          valorUnitario: data.get('valorUnitario'),
          acceso: data.get('acceso'),
          idPadre: idPadre,
          uid: response.uid
        };
        saveData(newData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const saveData = async (data: any) => {
    const {status, code} = await  createUser(data)
    if (status) {
      setShowSnack(true)
      setMessage("Usuario Guardado con exito")
      setSeverity("success")
      router.push(`${pathname}?userId=${code}`, undefined)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >    
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2
         }}>
          <Grid container spacing={1}>
            <Grid item xs={10} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="acceso">Acceso</InputLabel>
                <Select
                  name="acceso"
                  labelId="acceso"
                  id="acceso"
                  value={newAcceso}
                  label="Acceso"
                  onChange={handleChange}
                >
                  {
                    accesos.map(({value, label})=> <MenuItem value={value} key={value}>{label}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>
            
            {
              fields.map(({label, value, acceso}, key)=> {
                if (acceso === 'all' || acceso === newAcceso) {
                  return <Grid item xs={12} key={key}>
                    <TextField
                      required
                      fullWidth
                      name={value}
                      label={label}
                      type={value}
                      id={value}
                      autoComplete={value}
                    />
                  </Grid>
                }
              })
            }
            {
              newAcceso==="cliente"
              &&<Grid item xs={10} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="tipo">Tipo</InputLabel>
                    <Select
                      name="tipo"
                      labelId="tipo"
                      id="tipo"
                      value={newTipo}
                      label="Tipo"
                      onChange={handleTipo}
                    >
                      {
                        tipos.map(({value, label})=> <MenuItem value={value} key={value}>{label}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                </Grid>
            }
              <Grid item xs={10} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="idPadre">Vendedor</InputLabel>
                  <Select
                      labelId="idPadre"
                      id="idPadre"
                      value={idPadre}
                      label="Padre"
                      onChange={handleChangeSelect}
                    >
                    {
                        data.map(({_id, nombre}: any)=> <MenuItem value={_id} key={_id}>{nombre}</MenuItem>)
                    }
                    </Select>
                </FormControl>
              </Grid> 
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            Guardar Usuario
          </Button>
        </Box>
      </Box>
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} severity={severity} />
    </Container>
  );
}