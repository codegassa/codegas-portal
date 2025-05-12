import React, {useState,useMemo} from 'react';
import Box from '@mui/material/Box';
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
      <FormControl fullWidth size="small" variant="outlined">
         <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={initialEstado}   //Usamos initialEstado como valor inicial
          onChange={handleChange}
          sx={{
            borderRadius: 2,
            backgroundColor: '#f5f5f566',
            fontSize: 12,
            height: 36,
            paddingX: 0,}}
        >
          {memoizedState.map((estado) => (
            <MenuItem value={estado} key={estado}>
              {estado.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}