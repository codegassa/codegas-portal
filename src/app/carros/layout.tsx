'use client';
import React, { useContext, useEffect, ReactElement } from 'react';
import { Container, Grid, Box } from '@mui/material';
import { redirect, useRouter } from 'next/navigation';
import {DataContext} from "../context/context"

 
const LayoutRevisiones = ({ children }: { children: ReactElement }): ReactElement => {
  const { user } = useContext(DataContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/'); // Redirige a la página de inicio si no hay usuario
    }
  }, [user, router]); // Depende de `user` y `router`

  return(
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: 'auto',
        overflow: 'auto',
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }} component="section">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default LayoutRevisiones
 