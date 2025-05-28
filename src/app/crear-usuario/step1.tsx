'use client';
import React, { useState, useContext, useCallback, useMemo } from 'react';
import {Box, Button, FormControl, Container, CssBaseline, InputLabel, Grid,
  MenuItem, Select, TextField, SelectChangeEvent
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { Snack } from "../components/snackBar";
import { accesos, fields, tipos } from "../utils/users_info";
import { createUser } from "../store/fetch-user";
import { DataContext } from '../context/context';

type SeverityType = 'error' | 'success' | 'warning' | 'info';

export default function Step1({ data }: any) {
  const { createUserFirebase }: any = useContext(DataContext);
  const [idPadre, setIdPadre] = useState('');
  const [newAcceso, setNewAcceso] = useState('');
  const [newTipo, setTipo] = useState('');
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<SeverityType>();
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = useCallback((setFn: React.Dispatch<React.SetStateAction<string>>) => 
    (event: SelectChangeEvent) => setFn(event.target.value), []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const cleanText = (value: any) => String(value).toUpperCase().replace(/\s+/g, '');

    const userPayload = {
      email: form.get('email'),
      cedula: form.get('cedula'),
      nombre: cleanText(form.get('nombre')),
      celular: form.get('celular'),
      codMagister: form.get('codMagister'),
      razon_social: cleanText(form.get('razon_social')),
      direccion_factura: cleanText(form.get('direccion_factura')),
      codt: form.get('codt'),
      valorUnitario: form.get('valorUnitario'),
      acceso: form.get('acceso'),
      idPadre,
    };

    try {
      const response = await createUserFirebase(userPayload.email);
      if (typeof response === 'string') {
        setSeverity("error");
        setMessage("Este email ya existe");
        setShowSnack(true);
      } else {
        const fullData = { ...userPayload, uid: response.uid };
        const { status, code } = await createUser(fullData);
        if (status) {
          setSeverity("success");
          setMessage("Usuario Guardado con éxito");
          setShowSnack(true);
          router.push(`${pathname}?userId=${code}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredFields = useMemo(() => (
    fields.filter(({ acceso }) => acceso === 'all' || acceso === newAcceso)
  ), [newAcceso]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="acceso">Acceso</InputLabel>
                <Select
                  name="acceso"
                  value={newAcceso}
                  label="Acceso"
                  onChange={handleSelect(setNewAcceso)}
                >
                  {accesos.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {filteredFields.map(({ label, value }) => (
              <Grid item xs={12} key={value}>
                <TextField required fullWidth name={value} label={label} id={value} />
              </Grid>
            ))}

            {newAcceso === "cliente" && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="tipo">Tipo</InputLabel>
                  <Select
                    name="tipo"
                    value={newTipo}
                    label="Tipo"
                    onChange={handleSelect(setTipo)}
                  >
                    {tipos.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>{label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="idPadre">Vendedor</InputLabel>
                <Select
                  value={idPadre}
                  label="Padre"
                  onChange={handleSelect(setIdPadre)}
                >
                  {data.map(({ _id, nombre }: any) => (
                    <MenuItem key={_id} value={_id}>{nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1 }}>
            Guardar Usuario
          </Button>
        </Box>
      </Box>
      <Snack show={showSnack} setShow={() => setShowSnack(false)} message={message} severity={severity} />
    </Container>
  );
}
