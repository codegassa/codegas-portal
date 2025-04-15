'use client'
import React, { useContext, useEffect,useState } from 'react';
import { CssBaseline, Box, TextField, FormControlLabel, Typography, Avatar, Checkbox, Button, Grid, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { redirect } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {DataContext} from "./context/context"
import Link from 'next/link';

function Copyright(props: any) {
  return (
    <Typography variant="inherit" color="text.secondary" align="center" {...props}>
      <Link color="text.primary" href="https://codegascolombia.com/">
      Copyright © Codegas Colombia {new Date().getFullYear()}.
      </Link>  
    </Typography>
  );
}

// Tema por Defecto
const defaultTheme = createTheme();
// Tipos para los datos del usuario
interface UserData {
  email: string;
  password: string;
}
export default function SignIn() {
  const {user, login}: any = useContext(DataContext)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirigir si el usuario ya está autenticado
  useEffect(()=>{
    if(user?.email) redirect('/order')
  }, [user])

  // Manejo del envío del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
  
      // Validación del correo electrónico
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setErrorMessage('Por favor, ingrese un correo electrónico válido.');
        return;}

    const dataUser: UserData = { email, password };
    signIn(dataUser);
  };

  // Función para realizar el inicio de sesión
  const signIn = async (dataUser: UserData) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await login(dataUser);
      redirect('/order');
    } catch (error) {
      setErrorMessage('Hubo un error al iniciar sesión. Verifica tus credenciales.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h4">
            Iniciar Sesión
          </Typography>
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {errorMessage}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Mantener mi sesión abierta"
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Iniciar sesión'}
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="/">
                    ¿Recordar contraseña?
                </Link>
              </Grid>
              
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}