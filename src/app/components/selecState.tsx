import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const STATE = [
    "activo", 
    "espera", 
    "innactivo", 
    "noentregado"
]

export function SelectState({newEstado, setNewEstado}: any) {

  const handleChange = (event: SelectChangeEvent) => {
    setNewEstado(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newEstado}
          label="Estado"
          onChange={handleChange}
        >
          {
            STATE.map(e=> <MenuItem value={e} key={e}>{e}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
  );
}