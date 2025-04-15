'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { FormControl, Avatar, RadioGroup, ListItemAvatar, FormControlLabel, TableCell, TableRow, Radio } from '@mui/material';
import { Person } from '@mui/icons-material';
import { addCarPedido } from "../../../store/fetch-pedido";
import { blue } from '@mui/material/colors';
import { Snack } from "../../../components/snackBar";

// Tipado de las props
interface VehiculoProps {
  _id: number;
  placa: string;
  centro: string;
  conductor: { nombre: string };
  idPedido: string;
  date: string;
  idUser: number;
}

const VehiculosDialog: React.FC<VehiculoProps> = ({ _id, placa, centro, conductor, idPedido, date, idUser }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");

  // UseCallback para evitar que la función se vuelva a crear en cada render
  const asignCar = useCallback(async () => {
    const idPedidoArray = idPedido.split("%2C").filter((value: string) => value !== "");

    // Usamos Promise.all para manejar las peticiones concurrentemente
    const results = await Promise.all(idPedidoArray.map(async (e: string) => {
      const { status } = await addCarPedido(e, _id, date, idUser);
      return status ? `Carro ${placa} agregado!` : null;
    }));

    // Filtramos y mostramos el primer mensaje de éxito
    const successMessage = results.filter(Boolean).shift();
    if (successMessage) {
      setShowSnack(true);
      setMessage(successMessage);
    }
  }, [idPedido, _id, date, idUser, placa]);

  useEffect(() => {
    if (showSnack) {
      const timer = setTimeout(() => {
        setShowSnack(false);
      }, 3000); // Mostrar el mensaje de snack por 3 segundos
      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [showSnack]);

  return (
    <TableRow>
      <TableCell component="th" scope="row" align="center">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            onChange={asignCar}
          >
            <FormControlLabel value="female" control={<Radio />} label="" />
          </RadioGroup>
        </FormControl>
      </TableCell>
      <TableCell align="center">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
            <Person />
          </Avatar>
        </ListItemAvatar>
      </TableCell>
      <TableCell align="center">{_id}</TableCell>
      <TableCell align="center">{placa}</TableCell>
      <TableCell align="center">{centro}</TableCell>
      <TableCell align="center">{conductor?.nombre}</TableCell>
      <Snack show={showSnack} setShow={() => setShowSnack(false)} message={message} />
    </TableRow>
  );
}