'use client'
import react, { useState} from 'react';
import {Button, Avatar, List, ListItemAvatar, Checkbox, TableCell, TableRow} from '@mui/material';
import {Person, Add} from '@mui/icons-material';
import {addCarPedido} from "../store/fetch-pedido"
import { blue } from '@mui/material/colors';
import {Snack} from "../components/snackBar"
export interface VehiculoProps {
  _id: number;
  placa: string;
  // onClose: (value: string) => void;
  centro: string;
  conductor: Object;
}

export default function VehiculosDialog({_id, placa, centro, conductor, idPedido, date}: any) {
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");

  const asignCar = async () => {
    const {status} = await addCarPedido(idPedido, _id, date, 2)
    if (status) {
      setShowSnack(true)
      setMessage(`Carro ${placa} agregado!`)
    }
  }
  return (
    <>
      <TableRow>
        Esta es vehiculos
        <TableCell component="th" scope="row" align="center">
          <Checkbox
            // checked={checked}
            onChange={asignCar}
            inputProps={{ 'aria-label': 'controlled' }}
            />
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
      </TableRow>
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} />
    </>
  );
}