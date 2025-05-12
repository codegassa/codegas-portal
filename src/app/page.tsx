'use client'
import React, { useContext, useEffect,useState } from 'react';
import { CssBaseline, Box, TextField, FormControlLabel, Typography, Checkbox, Button, Container, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { redirect } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {DataContext} from "./context/context"
import Link from 'next/link';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}{...props}>
      <Link href="https://codegascolombia.com/" color="inherit">
      Copyright © Codegas Colombia {new Date().getFullYear()}
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
      <Container component="main" maxWidth="xs" sx={{ height: '92vh', display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        <Box
          sx={{ 
            marginTop: 10,
            backgroundColor: 'background.paper',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
          >
          <Typography component="h1" variant="h5" align="center" gutterBottom color='#555'>
            Inicie sesión para continuar.
          </Typography>
            {errorMessage && (
            <Typography color="error" variant="body2" align="center" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
            )}        
          <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              startAdornment: (
                <Box component="span" sx={{ mr: 1 }}>
                  <AlternateEmailIcon color="action" fontSize="small" />
                </Box>
              ),
            }}
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
            InputProps={{
              startAdornment: (
                <Box component="span" sx={{ mr: 1 }}>
                  <LockOutlinedIcon color="action" fontSize="small" />
                </Box>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Mantener mi sesión abierta"
            color='#FFF'
            sx={{ mt: 1}}
          />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Iniciar sesión'}
            </Button>
            <Grid container sx={{ mt: 1, mb: 1 }}>
            <Grid item xs />
            <Grid item>
              <Link href="/forgot-password" passHref legacyBehavior>
                <Typography
                  variant="body2"
                  component="a"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Typography>
              </Link>
            </Grid>
          </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}