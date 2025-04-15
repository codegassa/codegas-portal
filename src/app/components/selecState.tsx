import React, {useState,useMemo} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const STATE = [
    "activo", 
    "espera", 
    "innactivo", 
    "noentregado",
]
  export function SelectState({newEstado, setNewEstado}: any) {
  // Memoización de la lista de estados para evitar recrearla en cada renderizado
  const memoizedState = useMemo(() => STATE, []);

  // Validar y manejar el cambio de estado
  const handleChange = (event: SelectChangeEvent) => {
    setNewEstado(event.target.value as string);
  };
  // Si no hay un valor válido en newEstado, podemos asignar un valor por defecto
  const initialEstado = memoizedState.includes(newEstado) ? newEstado : memoizedState[1];

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Estado"
          value={initialEstado}   //Usamos initialEstado como valor inicial
          onChange={handleChange}
        >
          {memoizedState.map((estado) => (
            <MenuItem value={estado} key={estado}>
              {estado}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}