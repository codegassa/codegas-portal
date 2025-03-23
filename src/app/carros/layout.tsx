'use client';
import react, { ReactElement, useContext, useState } from 'react';
import { Container, Grid, Box, Paper} from '@mui/material';
import { redirect } from 'next/navigation';

import {DataContext} from "../context/context"

 
const LayoutRevisiones = ({children}: any): ReactElement => {
  const {user, login}: any = useContext(DataContext)
  if(!user) redirect('/')
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
          <Grid item xs={10}>
            {children}
          </Grid>
      </Container>
    </Box>
  )
}

export default LayoutRevisiones
 