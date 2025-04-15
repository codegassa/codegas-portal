'use client'
import React, {useState} from 'react';
 
import {Avatar, Box, Container, CssBaseline, Typography,  Stepper, Step, StepLabel, Button} from '@mui/material';
import People from '@mui/icons-material/People';
import Step1 from "./step1"
import Step2 from "./step2"


const steps = ['Información Cliente', 'Ubicación Entrega'];

export default function SelectUser({data, userId, zona, puntos}: any) {
  const [activeStep, setActiveStep] = useState(0);

  const RenderTitleSteper = () =>(
    <Stepper activeStep={activeStep}  sx={{ mt: 3 }}>
      {steps.map((label, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  )
  

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <RenderTitleSteper />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <People />
        </Avatar>
        <Typography component="h2" variant="h5">
          Nuevo Usuario
        </Typography>
        
        {
          activeStep===0
          ?<Step1 data={data} />
          :activeStep===1
          &&<Step2 userId={userId} zona={zona} puntos={puntos} />
        }


        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
          <Button onClick={()=>setActiveStep(activeStep-1)}>
            {activeStep>0 &&'Anterior'}
          </Button>
           
          <Button onClick={()=>setActiveStep(activeStep+1)}>
            {activeStep===0 && userId  &&'Siguiente'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}