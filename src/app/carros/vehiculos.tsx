'use client'
import react, {useState, useContext, useCallback} from 'react';
import {FormControl, Avatar, RadioGroup, ListItemAvatar, FormControlLabel, Radio, 
  Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Breadcrumbs, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import {Person} from '@mui/icons-material';
import Button from '@mui/material/Button';
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
  
  const asignCar = useCallback(async (_id: number, placa: string) => {
    const idPedidoArray = placas.split(",").filter(value => value !== "");
    try {
      await Promise.all(idPedidoArray.map(async (e) => {
        const { status } = await addCarPedido(e, _id, date, idUser);
        if (status) {
          setShowSnack(true);
          setMessage(`Carro ${placa} agregado!`);
        }
      }));
    } catch (error) {
      console.error('Error al asignar el carro', error);
      setShowSnack(true);
      setMessage('Hubo un error al asignar el carro.');
    }
  }, [placas, date, idUser]);

    // Renderiza cada vehículo en la tabla
  const RenderVehiculos = ({ data }: { data: VehiculoProps[] }) => (
      <>
        {data.map(({ _id, placa, centro, conductor }) => (
          <TableRow key={_id}>
            <TableCell component="th" scope="row" align="center">
              <FormControl>
                <RadioGroup
                  aria-labelledby="radio-button-group"
                  name="controlled-radio-buttons-group"
                  onChange={() => asignCar(_id, placa)}
                  onClick={() => router.back()}
                >
                  <FormControlLabel value="select" control={<Radio />} label="" />
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
        ))}
      </>
   );
  return (
    <>
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
            ?placas.split("%2C").filter(value => value !== "").map((e: any)=> `${e} / `)
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
          <RenderVehiculos data={carro} />
        </TableBody>
      </Table>
    </TableContainer>   

      
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} />
    </>
  );
}
