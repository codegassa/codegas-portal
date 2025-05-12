'use client' 
import { useEffect, useState } from 'react';
import { TableRow, TableCell, Checkbox, FormControl, InputLabel, InputAdornment, OutlinedInput, Paper, Table, TableBody, TableContainer, TableHead, Box, Tooltip, Typography, Grid } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {Snack} from "../components/snackBar"
import {ChangeValorUnitario, ChangeValorUnitarioAll, ChangeValorUnitarioSelected} from "../store/fetch-zona"
import { PaginationTable } from "../components/pagination/pagination";
import InputZones from '../components/input_zones/input_zones';

const RenderZonas = ({zona, updateValor, addValues}: any) => {
  const [valores, setValores] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Inicializar el estado con los valores de valorunitario
    const initialValues: { [key: string]: string } = {};
    zona.forEach(({ _id, valorunitario }: any) => {
      initialValues[_id] = valorunitario;
    });
    setValores(initialValues);
  }, [zona]);

  const handleInputChange = (e: any, _id: any) => {
    const { value } = e.target;
    // Actualizar el estado con el nuevo valor de valorunitario
    setValores(prevState => ({
      ...prevState,
      [_id]: value
    }));
  };

  const handleKeyDown = (e: any, idcliente: any, nombre: any) => {
    if (e.key === 'Enter') {
      updateValor(e, idcliente, nombre);
      e.preventDefault();  // Prevenir el comportamiento por defecto del Enter.
    }
  };

 
  return ( 
    zona.map(({_id, codt, razon_social, nombrezona, direccion, nombre, valorunitario, idcliente, isCheked}: any, index: any)=> {
    return (
      <TableRow key={index} sx={{p:2}}>
        <TableCell sx={{p: 1}}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Checkbox
            checked={isCheked  ?isCheked :false}
            onChange={(e)=>addValues(idcliente, valorunitario, _id, e)}
            inputProps={{ 'aria-label': 'controlled' }}/>
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ p:0.5, maxWidth: 140, whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <Tooltip title={nombrezona}>
                        <Typography variant="body2" sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            fontSize: '0.85rem',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>{nombrezona}
                        </Typography>
                      </Tooltip>
                    </TableCell>
        <TableCell align="left" sx={{ p:0.5,  maxWidth: 250, whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <Tooltip title={direccion}>
            <Typography variant="body2" sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                fontSize: '0.85rem',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>{direccion}
            </Typography>
          </Tooltip>
        </TableCell>
        <TableCell align="center" sx={{ p: 0.5}} width='30'>{codt}</TableCell>
          <TableCell align="left" sx={{ p: 0.5, maxWidth: 250, whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Tooltip title={razon_social}>
              <Typography variant="body2" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  fontSize: '0.85rem',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  }}> {razon_social}
              </Typography>
            </Tooltip>
          </TableCell>
          <TableCell align="left" sx={{ p: 0.5, maxWidth: 150, whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Tooltip title={nombre}>
              <Typography variant="body2" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  fontSize: '0.85rem',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  }}> {nombre}
              </Typography>
            </Tooltip>
          </TableCell>
        <TableCell sx={{ p: 0.5, maxWidth: 120, textOverflow: 'ellipsis' }}>
          <FormControl fullWidth sx={{ m: 0 }}>
          <OutlinedInput
              id={_id.toString()}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              value={valores[_id] || ''}
              onChange={(e) => handleInputChange(e, _id)}
              onKeyDown={(e) => handleKeyDown(e, idcliente, nombre)}
            />
          </FormControl>
        </TableCell>
      </TableRow>
    )})
  )
}
export default function RenderTable({zona}: any) {
  const [showSnack, setShowSnack] = useState(false);
  const [isCheked, setIsCheked] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [valorWithArray, setValorWithArray] = useState<{ _id: any; valorunitario: number; }[]>([]);
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const newValue = searchParams.get('newValue');
  const search = searchParams.get('search');


  const [newValorUnitario, setNewValorUnitario] = useState({})
  const [newZona, setNewZona] = useState(zona)

  useEffect(() => {
    setNewZona(zona)
  }, [zona, newValue])
  useEffect(() => {
    const {valor: value, replace, typeValue: type, allUsers}: any = newValorUnitario
    const typeValue = replace==0 ?value :replace
    const typeParams = replace==0 ?type :'replace'
 
    const data = valorWithArray.map(({_id, valorunitario}: any)=>{
      const newValue = type==="porcentaje" || type==undefined ? valorunitario +((valorunitario*Number(value))/100) : valorunitario+Number(value)
      const valorUnitario = replace==0 ?Math.round(parseFloat(newValue)) :Number(replace)
      return {
        _id,
        valorUnitario
      }
    })
   
    if( value || replace|| type) saveData(data, allUsers, typeParams, typeValue)
  }, [newValorUnitario])

  const saveData = async (data: any, allUsers: boolean, type: string, replaceParams: any) => {
    let status = false;
    if(allUsers) {
      const response =  await ChangeValorUnitarioAll(replaceParams, type)
      status= response.status
    }
    if(!allUsers){
      const response =  await ChangeValorUnitarioSelected(data)
      status= response.status
    }
 
    if (status) {
      setShowSnack(true)
      setMessage("Valor Unitario actualizado")
      setSeverity('success')
      setValorWithArray([])
      setIsCheked(false)
      router.push(`${pathname}?page=${page}&search=${search}&newValue=${replaceParams}`, undefined)
    }
    else if(!status){
      setMessage("Houston tenemos un problema")
      setSeverity('error')
    }
  }

  const addValuesAll = async (event: any) => {
    const data = newZona.map((e: any)=>{
      return{
        ...e,
        _id: e.idcliente,
        isCheked: event.target.checked
      }
    })
    
    if(event.target.checked) {setValorWithArray(data), setIsCheked(true)}
    if(!event.target.checked) {setValorWithArray([]), setIsCheked(false)}
    setNewZona(data)
  }
  const updateValor = async (event: any, idcliente: any, nombre: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const {status} = await ChangeValorUnitario(Number(event.target.value), idcliente)
      if (status) {
        setShowSnack(true)
        setMessage(`Valor Unitario Actualizado al cliente: ${nombre}`)
        setSeverity('success')
        
      }
    }
  }
  const addValues = (idCliente: any, valorunitario: number, id: any, event: any) => {
 
    const index = valorWithArray.some(({ _id }) => _id === idCliente);
    if (!index) {
      setValorWithArray((state) => [...state, {_id: idCliente, valorunitario}])
    }else{
      setValorWithArray(valorWithArray.filter(({_id})=> {return _id !== idCliente})) 
    }
   
    const updateZona = newZona.map((e: { _id: any; }) => {
      if (e._id === id) {
        return { ...e, isCheked: event.target.checked };
      }
      return e;
    });
  
    setNewZona(updateZona);
    
  } 
  const validateIfIsSelectd = (e: any) => {
    if(e.allUsers){
      setNewValorUnitario(e)
    } else {
      if(valorWithArray.length===0){
        setShowSnack(true)
        setMessage("Selecciona al menos una fila!!!")
        setSeverity('error')
      }else{
        setNewValorUnitario(e)
      }
    }
  }

  return(
    <TableContainer component={Paper}>

<Grid container alignItems="center" sx={{ borderBottom: '2px solid #ccc' }} >
         {/* Lado izquierdo: botones y selects */}
         <Grid item xs={12} sm={6}>
         <InputZones onSend={validateIfIsSelectd} />
          </Grid>
          {/* Lado derecho: paginación */}
          <Grid item xs={10} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PaginationTable total={zona[0]?.total ??0} />
            </Box>
          </Grid>
        </Grid>
      <Table  stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#fcfcfc'}}>
              <TableCell  sx={{px: 1, py:0}}>
                <Checkbox
                  checked={isCheked}
                  onChange={addValuesAll}
                  inputProps={{ 'aria-label': 'Seleccionar todos los clientes' }}
                />
              </TableCell>
              <TableCell align="left" sx={{ py: 0.5, maxWidth: 180 }}><strong>Zona</strong></TableCell>
              <TableCell align="left" sx={{ py: 0.5, maxWidth: 300 }}><strong>Dirección</strong></TableCell>
              <TableCell  align="center" sx={{ py: 0.5}}><strong>Codt</strong></TableCell>
              <TableCell align="left" sx={{ py: 0.5, maxWidth: 300 }}><strong>Razón Social</strong></TableCell>
              <TableCell align="left" sx={{ py: 0.5, maxWidth: 200 }}><strong>Nombre Completo</strong></TableCell>
              <TableCell align="left" sx={{ py: 0.5, maxWidth: 80 }}><strong>Valor Unitario</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <RenderZonas 
            zona={newZona} 
            updateValor={updateValor} 
            addValues={addValues} 
          />
        </TableBody>
      </Table>
      <Snack show={showSnack} setShow={()=>setShowSnack(false)} message={message} severity={severity} />
    </TableContainer>
  )
}

