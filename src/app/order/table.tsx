import React,{useState, useEffect, useMemo, useCallback } from 'react';
import { TableRow, TableCell, Box, Collapse, Button, Checkbox, Table, TableBody, TableContainer, TableHead, Grid, Paper, FormControl, TextField, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import moment from "moment"
import dayjs from 'dayjs';
import { KeyboardArrowDown, KeyboardArrowUp, RefreshRounded, SettingsBackupRestore} from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {SelectState} from "../components/selecState"
import {colors} from "../utils/colors"
import {PaginationTable} from "../components/pagination/pagination";
import {UpdateDatePedido, UpdateStatePedido, sendNovedad, resetPedido} from "../store/fetch-pedido"
import {Date} from "../components/date"
import {Snack} from "../components/snackBar"
import {AlertDialog} from "../components/alertDialog/alertDialog"
import Image from "next/image"
import AlertConfirm from '../components/alertConfirm/alertConfirm';
import { Pedido } from '../crear-pedido/crear-pedido.types';
import MapIcon from '@mui/icons-material/Map';

interface RenderTableProps {
  orders: Pedido[];
  total:number;
}

const RenderTanques = ({_id, codt, razon_social, cedula, direccion, creado, fechasolicitud, isCheked, fechaentrega, forma, kilos, valorunitario,
   placa, observacion_pedido, estado, entregado, imagencerrar, addValues, zona, updateDate, updateStatus,coordenadas, setOpenConfirm}: any) => {  
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
  const background = useMemo(() => {
    if (estado === "activo" && !placa && !entregado) return colors.activo;
    if (estado === "activo" && placa && !entregado) return colors.asignado;
    if (estado === "activo" && entregado) return colors.otro;
    return colors[estado as keyof typeof colors] || colors.otro;
  }, [estado, placa, entregado]);
  console.log('En tabla de Order: ',_id)

  return (
    <> 
      <TableRow key={_id} sx={{p:2, background,}}>
            <TableCell sx={{p: 1}}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
              <Checkbox checked={isCheked || false} onChange={(e) => addValues(_id, e)}/>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
              </Box>
            </TableCell>
            <TableCell align="center"  width='20' component="th">{_id}</TableCell>
            <TableCell align="center"  width='30'>{codt}</TableCell>
            <TableCell align="left" sx={{ p: 0.5, maxWidth: 300, whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Tooltip title={razon_social}>
                <Typography variant="body2" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    fontSize: '0.75rem',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    }}> {razon_social}
                </Typography>
              </Tooltip>
            </TableCell>
            <TableCell align="left" sx={{ p:0.5,  maxWidth: 300, whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Tooltip title={direccion}>
                <Typography variant="body2" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    fontSize: '0.75rem',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>{direccion}
                </Typography>
              </Tooltip>
            </TableCell>
            <TableCell align="left" sx={{ p:0.5, maxWidth: 100, whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Tooltip title={zona}>
                <Typography variant="body2" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    fontSize: '0.75rem',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>{zona}
                </Typography>
              </Tooltip>
            </TableCell>
            <TableCell align="center" sx={{ p: 0.5}} width='110'>{fechasolicitud}</TableCell>
            <TableCell align="center" sx={{ p: 0.5}} width='150'>
              <Date setValueDate={(e: any) =>updateDate(e, _id)} value={fechaentrega}/>
            </TableCell>
            <TableCell align="center" sx={{ p: 0.5}}>
              <SelectState newEstado={estado} setNewEstado={(e: any)=>updateStatus(e, _id)} />
            </TableCell>
            <TableCell align="center" sx={{ p: 0.5}}>
              <Button variant="contained">
                <Link href={`carros?placa=${_id}&date=${fechaentrega ?moment(fechaentrega).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}`} style={{color: "#FFF", textDecoration: 'none'}}>
                  {placa ?placa :"Asignar"}
                </Link>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={12} style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 0, padding: 1 }}>
                  <TableContainer component={Paper} elevation={2}>
                    <Table sx={{ minWidth: 750}}>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5'}}>
                          <TableCell align="center" sx={{ py: 0.5}}>Tipo</TableCell>
                          <TableCell align="center" sx={{ py: 0.5}}>Kilos</TableCell>
                          <TableCell align="center" sx={{ py: 0.5}}>Valor</TableCell>
                          <TableCell align="center" sx={{ py: 0.5}}>Cedula</TableCell>
                          <TableCell align="center" sx={{ py: 0.5}}>F. Creación</TableCell>
                          <TableCell sx={{ py: 0.5, px: 1 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography align="center" variant="body2" sx={{ flexGrow: 1 }}>Obervación</Typography>
                            <Box>
                            {coordenadas?.x && coordenadas?.y && (
                                <Tooltip title="Ver Ubicación en Maps">
                                  <IconButton
                                    color="success"
                                    onClick={() =>window.open(`https://www.google.com/maps/search/?api=1&query=${coordenadas.x},${coordenadas.y}`,'_blank')}>
                                    <MapIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                              {imagencerrar &&<Tooltip title="Ver Remisión"><IconButton color="info" onClick={()=>setShowDialog(true)}><ImageIcon /></IconButton></Tooltip>}
                              {estado != "espera" &&<Tooltip title="Resetear Pedido"><IconButton color="error" onClick={() => setOpenConfirm(_id)}><SettingsBackupRestore /></IconButton></Tooltip>}
                            </Box>
                          </Box>
                        </TableCell>
                        </TableRow>
                        </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" sx={{ py: 0.5}}>{forma}</TableCell>
                          <TableCell align="center" sx={{ py: 0.5}}>{kilos}</TableCell>
                          <TableCell align="center" sx={{ py: 0.5}}>{valorunitario?.toLocaleString('es-CO', { style: 'currency', currency: 'COP',minimumFractionDigits: 0 })}</TableCell>
                          <TableCell align="center" sx={{ py: 0.5}}>{cedula}</TableCell>
                          <TableCell align="center" sx={{ py: 0.5}}>{moment(creado).format('YYYY-MM-DD HH:mm')}</TableCell>
                          <Tooltip title={observacion_pedido}>
                          <TableCell align="center" sx={{ py: 0.5}}>{observacion_pedido}</TableCell></Tooltip>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
         
          <AlertDialog showDialog={showDialog} setShowDialog={()=>setShowDialog(false)}>
            {imagencerrar &&<Image src={imagencerrar} alt="Codegas colombia" width={200} height={500}/> }
          </AlertDialog>
    </>
  )
}
RenderTanques.displayName = 'RenderTanques';

export default function RenderTable({ orders }: RenderTableProps) {
  console.log('En RenderTable Order',orders)
  const [valorWithArray, setValorWithArray] = useState<{ _id: string }[]>([]);
  const [newOrder, setNewOrder] = useState<Pedido[]>(orders);
  const [isCheked, setIsCheked] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [showDialogInnactivo, setShowDialogInnactivo] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [pedidoId, setPedidoId] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const newValue = searchParams.get('newValue');
  const idUser = searchParams.get('idUser') || '';
  const acceso = searchParams.get('acceso') || '';
  const search = searchParams.get('search') || 'undefined';
  const generateQueryString = useCallback((extra: Record<string, string>) => {
    const base = `?page=${page}&search=${search}&idUser=${idUser}&acceso=${acceso}`;
    const extraParams = Object.entries(extra).map(([key, val]) => `&${key}=${val}`).join('');
    return `${pathname}${base}${extraParams}`;
  }, [page, search, idUser, acceso, pathname]);

const newValorWithArray = useMemo(() => valorWithArray.map(e => e._id).join(','), [valorWithArray]);

  useEffect(() => {
    setNewOrder(orders);
  }, [orders, newValue]);

  const addValues = useCallback((id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setValorWithArray(prev => {
      const exists = prev.some(({ _id }) => _id === id);
      return exists ? prev.filter(({ _id }) => _id !== id) : [...prev, { _id: id }];
    });
    setNewOrder(prev => prev.map(order => order._id === id ? { ...order, isCheked: event.target.checked } : order));
  }, []);

  const addValuesAll = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const updatedOrders = newOrder.map(order => ({ ...order, isCheked: checked }));
    setValorWithArray(checked ? updatedOrders.map(({ _id }) => ({ _id })) : []);
    setIsCheked(checked);
    setNewOrder(updatedOrders);
  }, [newOrder]);

  const updateDate = async (date: Date, id?: string) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const data = id ? [{ _id: id, fechaentrega: formattedDate }] : valorWithArray.map(({ _id }) => ({ _id, fechaentrega: formattedDate }));
    const { status } = await UpdateDatePedido(data);
    if (status) {
      setShowSnack(true);
      setMessage('Fecha Actualizada');
      setIsCheked(false);
      setValorWithArray([]);
      router.push(generateQueryString({ newValue: (id || '') + formattedDate }));
    }
  };

  const updateStatus = async (estado: string, id?: string) => {
    const data = id ? [{ _id: id, estado }] : valorWithArray.map(({ _id }) => ({ _id, estado }));
    const { status } = await UpdateStatePedido(data);
    if (status) {
      setShowSnack(true);
      setMessage(`Estado cambiado a ${estado}`);
      setIsCheked(false);
      setValorWithArray([]);
      router.push(generateQueryString({ newValue: (id || '') + estado }));
    }
    if (estado === 'innactivo') {
      setShowDialogInnactivo(true);
      setPedidoId(id || '');
    }
  };

  const sendNovedadInnactivo = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const novedad = form.get('novedad') as string;
    const { status } = await sendNovedad({ novedad, pedidoId });
    if (status) {
      setShowSnack(true);
      setMessage('Novedad enviada!');
      setShowDialogInnactivo(false);
      setPedidoId('');
    }
  };

  const resetOrder = async () => {
    const { status } = await resetPedido(pedidoId);
    if (status) {
      setShowSnack(true);
      setMessage('Pedido Reseteado!');
      setOpenConfirm(false);
      setPedidoId('');
      router.push(generateQueryString({ newValue: pedidoId + '200' }));
    }
  };

  const handleOpenConfirm = (id: string) => {
    setOpenConfirm(true);
    setPedidoId(id);
  };

  return(
    <TableContainer component={Paper} sx={{ mt: 0.5 }}>
        <Grid container alignItems="center" sx={{ borderBottom: '2px solid #ccc' }} >
         {/* Lado izquierdo: botones y selects */}
         <Grid item xs={12} sm={6}>
         {valorWithArray.length > 0 && (
         <Grid container spacing={2} alignItems="center">
         <Grid item xs={6} sm={4}>
              <Button variant="contained">
              <Link
               href={`carros?placa=${newValorWithArray}&date=${moment().format('YYYY-MM-DD')}`}
               style={{color: "white",textDecoration: 'none' }}
               >
               Camiones
             </Link>
             </Button>
         </Grid>
         <Grid item xs={6} sm={4}>
          <Date setValueDate={updateDate} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <SelectState setNewEstado={updateStatus} />
        </Grid>
      </Grid>
      )}
    </Grid>
    {/* Lado derecho: paginación */}
    <Grid item xs={10} sm={6}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PaginationTable total={newOrder[0]?.total ?? 0} />
      </Box>
    </Grid>
  </Grid>

      <TableContainer  sx={{maxHeight: 'calc(100vh - 190px)', overflowY: 'auto', display: 'block'}}>
      <Table stickyHeader>
      <TableHead >
        <TableRow sx={{ backgroundColor: '#fcfcfc'}}>
           <TableCell sx={{px: 1, py:0}}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
              <Checkbox 
                checked={isCheked}
                onChange={addValuesAll}
                inputProps={{ 'aria-label': 'Seleccionar todos los pedidos' }}
                />
              <IconButton aria-label="expand row" size="small">
                 <RefreshRounded htmlColor='#ffffff'/>
              </IconButton>
              </Box>
            </TableCell>
          <TableCell align="center" sx={{ py: 0.5}} width={100}><strong>N° Pedido</strong></TableCell>
          <TableCell align="center" sx={{ py: 0.5}}><strong>Codt</strong></TableCell>
          <TableCell align="left" sx={{ py: 0.5, maxWidth: 300 }}><strong>Razón Social</strong></TableCell>
          <TableCell align="left" sx={{ py: 0.5, maxWidth: 250 }}><strong>Dirección</strong></TableCell>
          <TableCell align="center" sx={{ py: 0.5}}><strong>Zona</strong></TableCell>
          <TableCell align="center" sx={{ py: 0.5}}><strong>F. Solicitud</strong></TableCell>
          <TableCell align="center" sx={{ py: 0.5}}><strong>F. Entrega</strong></TableCell>
          <TableCell align="center" sx={{ py: 0.5}}><strong>Estado</strong></TableCell>
          <TableCell align="center" sx={{ py: 0.5}}><strong>Placa</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
            {newOrder.map((fila) => (
              <RenderTanques
                key={fila._id}
                {...fila}
                addValues={addValues}
                updateDate={updateDate}
                updateStatus={updateStatus}
                setOpenConfirm={handleOpenConfirm}
              />
            ))}
          </TableBody>
      </Table>
      </TableContainer>
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} />
       <AlertDialog showDialog={showDialogInnactivo} setShowDialog={() => setShowDialogInnactivo(false)}>
        <Box component="form" noValidate onSubmit={sendNovedadInnactivo}>
          <Grid item xs={12} sm={12}>
            <FormControl sx={{ width: 400 }}>
              <TextField id="novedad" label="Novedad" name="novedad" multiline rows={4} />
            </FormControl>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Guardar SI
          </Button>
        </Box>
      </AlertDialog>
      <AlertConfirm 
        openConfirm={openConfirm} 
        handleConfirm={()=>resetOrder()} 
        handleClose={()=>setOpenConfirm(false)} 
        title={`Seguro desea resetear el pedido ${pedidoId}?`} 
      />
    </TableContainer>
  )
}