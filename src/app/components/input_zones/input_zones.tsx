'use client';
import React, { ReactElement, useState, useCallback } from 'react';
import { MenuItem, Select, Button, Grid, Paper, InputBase } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { InputZonaProps } from "./input_zona_props";

const PaperContent = ({ children }: { children: React.ReactNode }) => (
  <Paper
    elevation={3}
    sx={{p: 1, display: 'flex', alignItems: 'center', width: '100%', borderRadius: 2, transition: 'all 0.3s ease', boxShadow: '0px 2px 8px rgba(0,0,0,0.06)',
      '&:hover': {boxShadow: '0px 4px 12px rgba(0,0,0,0.12)'},
    }}
  >
    {children}
  </Paper>
);

const InputZones = ({ onSend }: { onSend: (data: InputZonaProps) => void }): ReactElement => {
  const [data, setData] = useState<InputZonaProps>({ typeValue: 'porcentaje', replace: 0, valor: 0 });

  const handleChange = useCallback((
    prop: keyof InputZonaProps,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const value = prop === 'typeValue' ? event.target.value : Number(event.target.value);
    setData(prev => ({ ...prev, [prop]: value }));
  }, []);

  const handleSend = useCallback(() => {
    onSend(data);
  }, [data, onSend]);

  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <PaperContent>
              <InputBase
                fullWidth
                placeholder="Reemplaza Vlr unitario"
                onChange={(e) => handleChange('replace', e)}
                sx={{
                  fontSize: '0.875rem', // Reducir tamaño de letra
                  padding: '1px', // Ajustar padding
                }}
              />
            </PaperContent>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Select
              value={data?.typeValue || 'porcentaje'}
              onChange={(e) => handleChange('typeValue', e)}
              fullWidth
              displayEmpty
              sx={{
                fontSize: '0.875rem', // Reducir tamaño de letra
                padding: '1px', // Ajustar padding
                py:'0.2px',
                bgcolor: 'background.paper',
              }}
            >
              <MenuItem value="porcentaje">Porcentaje</MenuItem>
              <MenuItem value="replace">Reemplazar</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={3}>
            <PaperContent>
              <InputBase
                fullWidth
                placeholder={data?.typeValue === "porcentaje" ? "% Vlr en porcentaje" : "$ Vlr a sumar o restar"}
                onChange={(e) => handleChange('valor', e)}
                sx={{
                  fontSize: '0.875rem', // Reducir tamaño de letra
                  padding: '1px', // Ajustar padding
                }}
              />
            </PaperContent>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                height: '38px',
                fontSize: '0.875rem', // Reducir tamaño de la letra
              }}
              onClick={handleSend}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InputZones;