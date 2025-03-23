'use client'
import {FC, useEffect, useContext} from "react"
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Breadcrumbs, Typography } from "@mui/material"
import Link from "next/link"
import {RenderVehiculos} from "./renderVehiculos"
import {DataContext} from "../../../context/context"

const Vehiculos: FC = ({params}: any) => {
  const {idPedido} = params 
  const {idUser} = useContext(DataContext)

  // const data = useMemo(() => {
  //   const idPedido = params.idPedido;

  //   if (idPedido.includes("%2C")) {
  //     return idPedido.split("%2C").filter((value) => value !== "");
  //   } else {
  //     return [idPedido];
  //   }
  // }, [params.idPedido]);

 ;
  return(
    <TableContainer component={Paper}>
      <Breadcrumbs aria-label="breadcrumb" sx={{padding: "15px"}}>
        <Link style={{color: "#ffffff"}}  href="/order">
          Pedido
        </Link>
        <Typography color="#a2a1a1"> Pedido N:  
          {
            idPedido.includes("%2C")
            ?idPedido.split("%2C").filter((value: any) => value !== "").map((e: any)=> `${e} / `)
            :idPedido
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
            <TableCell align="center">Nombres</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RenderVehiculos {...params} idUser= {idUser} />
        </TableBody>
      </Table>
    </TableContainer>   
  )  
}

export default Vehiculos