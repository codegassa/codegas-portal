'use client';
import React, { ReactElement, useState } from 'react';
import { MenuItem, Select, Button, Grid, Paper, InputBase } from '@mui/material';

import { InputZonaProps } from "./input_zona_props";

const PaperContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid item xs={8} sm={2}>
      <Paper
        component="form"
        sx={{ p: '6px 4px', display: 'flex', alignItems: 'center', marginTop: 2, marginLeft: 2 }}
      >
        {children}
      </Paper>
    </Grid>
  )
}

const InputZones = ({ onSend }: { onSend: (data: InputZonaProps) => void }): ReactElement => {
  const [data, setData] = useState<InputZonaProps>({ typeValue: 'porcentaje', replace: 0, valor: 0 });

  const handleChange = (prop: keyof InputZonaProps, event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
    setData({ ...data, [prop]: Number(event.target.value) });
  }

  return (
    <div>
      <Grid container spacing={2}>
        <PaperContent>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="reemplazar valor unitario ..."
            onChange={(e) => handleChange('replace', e)}
          />
        </PaperContent>
        <Grid item xs={12} sm={2}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={data?.typeValue || 'porcentaje'}
            onChange={(e: any) => handleChange('typeValue', e)}
            label="Age"
            sx={{ marginLeft: 1, marginTop: 2, p: '0px', display: 'flex', alignItems: 'center', width: "100%" }}
          >
            <MenuItem value="porcentaje">Porcentaje</MenuItem>
            <MenuItem value="replace">Reemplazar</MenuItem>
          </Select>
        </Grid>
        <PaperContent>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={data?.typeValue === "porcentaje" ? "% valor en porcentaje" : "$ valor a sumar o restar"}
            onChange={(e) => handleChange('valor', e)}
          />
        </PaperContent>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            sx={{ marginTop: 2, p: '12px 12px' }}
            onClick={() => onSend(data)}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default InputZones;
