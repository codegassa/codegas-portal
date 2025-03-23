'use client'
import react, {Fragment, useState, useContext} from 'react';
import {FormControl, Avatar, RadioGroup, ListItemAvatar, FormControlLabel, Radio, 
  Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Breadcrumbs, Typography } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {Person} from '@mui/icons-material';
import Button from '@mui/material/Button';
import Link from "next/link"
import { blue } from '@mui/material/colors';
import {Snack} from "../components/snackBar"
import {addCarPedido} from "../store/fetch-pedido"
import {DataContext} from "../context/context"

export interface VehiculoProps {
  _id: number;
  placa: string;
  centro: string;
  conductor: {
    nombre: string;  
  };
}

export default function VehiculosDialog({carro}: any) {
   const {idUser} = useContext(DataContext)
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter()
  const searchParams = useSearchParams();
  const placas = searchParams.get('placa') || "";
  const date = searchParams.get('date');
  
  const asignCar = async (_id: any, placa: any) => {
    const idPedidoArray = placas.split(",").filter((value: any) => value !== "");
    await Promise.all(idPedidoArray.map(async (e: any) => {
      const { status } = await addCarPedido(e, _id, date, idUser);
      if (status) {
        setShowSnack(true)
        setMessage(`Carro ${placa} agregado!`)
      }
    }));
  }
  const RenderVehiculos = ({data}: any) => {
    return data.map(({_id, placa, centro, conductor}: VehiculoProps)=>{
      return(
        <TableRow key={_id}>
          <TableCell component="th" scope="row" align="center">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={()=>asignCar(_id,placa)}
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
        </TableRow>
      )
    })

  }
  return (
    <Fragment>
       <TableContainer component={Paper}>
      <Breadcrumbs aria-label="breadcrumb" sx={{padding: "10px"}}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={() => router.back()}
          >
            Pedidos
          </Button>
        <Typography color="#a2a1a1"> Pedido N:  
          {
            placas.includes("%2C")
            ?placas.split("%2C").filter((value: any) => value !== "").map((e: any)=> `${e} / `)
            :placas
          } 
        </Typography>
      </Breadcrumbs>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">&nbsp;</TableCell>
            <TableCell align="center">Avatar</TableCell>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Placa</TableCell>
            <TableCell align="center">Centro</TableCell>
            <TableCell align="center">Nombre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RenderVehiculos data={carro} asignCar={asignCar}  />
        </TableBody>
      </Table>
    </TableContainer>   

      
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} />
    </Fragment>
  );
}
