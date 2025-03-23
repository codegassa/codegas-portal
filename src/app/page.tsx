'use client'
import React, { useContext, useEffect } from 'react';
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const {user, login}: any = useContext(DataContext)
  
  useEffect(()=>{
    if(user?.email) redirect('/order')
  }, [user])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const dataUser ={
      email: data.get('email'),
      password: data.get('password'),
    };
    signIn(dataUser)
  };

  const signIn = async (dataUser: any) =>{
    try {
      const response = await  login(dataUser)
      redirect('/order')
    } catch (error) {
      console.log(error)
    }
  }

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
            >
              Iniciar sesión
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