'use client' 
import { Fragment, useEffect, useState } from 'react';
import { IconButton, TableRow, TableCell, Box, Collapse, Table, TableBody, TableHead, Typography, Button, TableContainer, Paper, Checkbox } from '@mui/material';
 
import {KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import Image from "next/image"
import moment from "moment"
import Link from 'next/link';
import {colors} from "../utils/colors"
import {Date} from "../components/date"
import {UpdateDatePedido, UpdateStatePedido} from "../store/fetch-pedido"
import {Snack} from "../components/snackBar"
import {AlertDialog} from "../components/alertDialog/alertDialog"
import {SelectState} from "../components/selecState"
import { PaginationTable } from "../components/pagination/pagination";

const {espera, noentregado, innactivo, activo, asignado, otro} = colors

const RenderPedidos = ({data, updateStatus, updateDate, setShowDialog, setImagenCerrar, addValues}: any) => {
  const [open, setOpen] = useState(false);
  return(
    data.map(({_id, codt, razon_social, cedula, direccion, creado, fechasolicitud, 
      fechaentrega, forma, kilos, valorunitario, placa, novedades, estado, entregado, imagencerrar}: any)=> {
        const [newEstado, setNewEstado] = useState(estado)
        const [newFechaEntrega, setFechaEntrega] = useState(fechaentrega)
      const background=newEstado=="espera" ?espera :newEstado=="noentregado" ?noentregado :newEstado=="innactivo" ?innactivo :newEstado=="activo" &&!placa && !entregado ?activo :newEstado=="activo" && !entregado ?asignado :otro
      return(
        <Fragment key={_id}>
          <TableRow
            key={_id}
            sx={{ 
              background
            }}
          >
            <TableCell align="center">
              <Checkbox
                onChange={()=>addValues(_id, fechaentrega)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </TableCell>
            <TableCell align="center">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </TableCell>
            <TableCell align="center" component="th">{_id}</TableCell>
            <TableCell align="center">{codt}</TableCell>
            <TableCell align="center">{razon_social}</TableCell>
            <TableCell align="center">
              {
                newFechaEntrega 
                ?moment(newFechaEntrega).format('YYYY-MM-DD')
                :<Date setValueDate={(e: any) =>{ updateDate(_id, e), setFechaEntrega(e)}} />
              }
            </TableCell>
            <TableCell align="center">
              <SelectState newEstado={newEstado} setNewEstado={(e: any)=>{setNewEstado(e), updateStatus(_id, e)}} />
            </TableCell>
            <TableCell align="center">
              <Button variant="contained">
                <Link href={`pedidos/${_id}/${moment(newFechaEntrega).format('YYYY-MM-DD')}`} style={{color: "#ffffff", textDecoration: 'none'}}>
                  {placa ?placa :"Sin Placa"}
                </Link>
              </Button>
            </TableCell>
            <TableCell align="center">
              {novedades &&<Button variant="contained">Si</Button>}
            </TableCell>
            <TableCell align="center">
              {imagencerrar &&<Button variant="contained" onClick={()=>{setShowDialog(true), setImagenCerrar(imagencerrar)}}>Si</Button>}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Datos adicionales
                  </Typography>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">F. Solicitud</TableCell>
                          <TableCell align="center">Solicitud</TableCell>
                          <TableCell align="center">Kilos</TableCell>
                          <TableCell align="center">Valor</TableCell>
                          <TableCell align="center">Cedula</TableCell>
                          <TableCell align="center">Direccion</TableCell>
                          <TableCell align="center">F Creación</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row" align="center">
                            {fechasolicitud}
                          </TableCell>
                          <TableCell align="center">{forma}</TableCell>
                          <TableCell align="center">{kilos}</TableCell>
                          <TableCell align="center">{valorunitario}</TableCell>
                          <TableCell align="center">{cedula}</TableCell>
                          <TableCell align="center">{direccion}</TableCell>
                          <TableCell align="center">{moment(creado).format('YYYY-MM-DD HH:mm')}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </Fragment>
      )
    })
  )
}
export default function RenderTable({data}: any) {
  const [valorWithArray, setValorWithArray] = useState<{ id: any; newFechaEntrega: any }[]>([]);
  const [newValorWithArray, setNewValorWithArray] = useState<string | undefined>();

  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [imagencerrar, setImagenCerrar] = useState();
  // const [newFechaEntrega, setFechaEntrega] = useState(fechaentrega)
  // const [newEstado, setNewEstado] = useState(estado)

  const addValues = (id: any, newFechaEntrega: any) => {
    const index = valorWithArray.some(({ id: _id }) => _id === id);
    if (!index) {
      setValorWithArray((state) => [...state, { id, newFechaEntrega }]);
    } else {
      setValorWithArray(valorWithArray.filter(({ id: _id }) => _id !== id));
    }
  };
  const updateDate = async (id: any, date: any) => {
    const {status} = await UpdateDatePedido(id, date)
    if (status) {
      setShowSnack(true)
      setMessage("Fecha Actualizada")
    }
  }
  
  const updateStatus = async (id: any, state: any) => {
    const {status} = await UpdateStatePedido(id, state)
    if (status) {
      setShowSnack(true)
      setMessage(`estado ${state} cambiado!`)
    }
  }
  useEffect(()=> {
    let data = ''
    for(let i=0; i<valorWithArray.length; i ++){
      data += valorWithArray[i].id
      data += ','
    }
    setNewValorWithArray(data)
  }, [valorWithArray])
  console.log(valorWithArray)
  return (
    <TableContainer component={Paper}>
      {
        newValorWithArray
        &&<Button variant="contained"  sx={{ marginTop: 1, marginLeft: 1 }}>
          <Link 
            href={`pedidos/${newValorWithArray}/${moment().format('YYYY-MM-DD')}`} 
            style={{
              color: "#ffffff", 
              textDecoration: 'none'
            }}
          >
            Vehiculos
          </Link>
        </Button>
      }
      
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">&nbsp;</TableCell>
              <TableCell align="center">&nbsp;</TableCell>
              <TableCell align="center">N pedido</TableCell>
              <TableCell align="center">Codt</TableCell>
              <TableCell align="center">Razon Social</TableCell>
              <TableCell align="center">F Entrega</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Placa</TableCell>
              <TableCell align="center">Obervacion</TableCell>
              <TableCell align="center">Imagen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {/* { data.map((row: any, index: any): any => <RenderPedidos key={index} {...row} addValues={addValues} />) } */}
           <RenderPedidos 
            data={data} 
            addValues={addValues} 
            updateDate={updateDate}
            updateStatus={updateStatus}
            setShowDialog={setShowDialog}
            setImagenCerrar={setImagenCerrar}
          />
        </TableBody>
      </Table>
      
      <PaginationTable total={data[0]?.total ?? 0} />
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} />
      <AlertDialog showDialog={showDialog} setShowDialog={()=>setShowDialog(false)}>
        {imagencerrar &&<Image src={imagencerrar} alt="codegas colombia" width={200} height={500}/> }
      </AlertDialog>
    </TableContainer>    
  )
  
}

