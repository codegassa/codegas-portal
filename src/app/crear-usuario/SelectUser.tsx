'use client';

import React, { useState, useCallback } from 'react';
import {Avatar, Box, Button, Container, CssBaseline, Divider, Paper, Stack, Step, StepLabel, Stepper, Typography} from '@mui/material';
import People from '@mui/icons-material/People';
import Step1 from './step1';
import Step2 from './step2';

const steps = ['Información Cliente', 'Ubicación Entrega'];

interface Props {
  data: any;
  userId?: string;
  zona: any;
  puntos: any;
}

export default function SelectUser({ data, userId, zona, puntos }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = useCallback(() => setActiveStep((prev) => prev + 1), []);
  const handleBack = useCallback(() => setActiveStep((prev) => prev - 1), []);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 2, mt: 6, borderRadius: 5 }}>
        <Stack spacing={2}>
          {/* Título con ícono al lado */}
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
              <People fontSize="small" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Nuevo Usuario
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
               <StepLabel >{label}</StepLabel> 
              </Step>
              
            ))}
          </Stepper>

          <Box width="100%">
            {activeStep === 0 && <Step1 data={data} />}
            {activeStep === 1 && <Step2 userId={userId} zona={zona} puntos={puntos} />}
          </Box>

          <Box display="flex" justifyContent="space-between" width="100%" pt={1}>
            <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
              Anterior
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1 || !userId}
            >
              Siguiente
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}