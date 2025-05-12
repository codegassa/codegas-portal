'use client'
import React, { useState, useContext, useCallback } from 'react';
import { Avatar, RadioGroup, FormControlLabel, Radio,Breadcrumbs, Typography, Button, Grid, Card, CardContent
        } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { Person } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { Snack } from "../components/snackBar";
import { addCarPedido } from "../store/fetch-pedido";
import { DataContext } from "../context/context";

export interface VehiculoProps {
  _id: number;
  placa: string;
  centro: string;
  conductor: { nombre: string };
}

export default function VehiculosDialog({ carro }: any) {
  const { idUser } = useContext(DataContext);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const placas = searchParams.get('placa') || "";
  const date = searchParams.get('date');
  const sortedData = [...carro].sort((a, b) => a.placa.localeCompare(b.placa));

  const asignCar = useCallback(async (_id: number, placa: string) => {
    const idPedidoArray = placas.split(",").filter(value => value !== "");
    try {
      await Promise.all(idPedidoArray.map(async (e) => {
        const { status } = await addCarPedido(e, _id, date, idUser);
        if (status) {
          setShowSnack(true);
          setMessage(`Carro ${placa} agregado!`);
         // router.back()
        }
      }));
    } catch (error) {
      console.error('Error al asignar el carro', error);
      setShowSnack(true);
      setMessage('Hubo un error al asignar el carro.');
    }
  }, [placas, date, idUser]);
  const [carroActivo, setCarroActivo] = useState<number | null>(null);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ px: 2, py: 1 }}>
        <Button variant="contained" size="small" onClick={() => router.back()}>
          Pedidos
        </Button>
        <Typography variant="caption" color="text.secondary">
          Pedido N:&nbsp;
          {placas.includes("%2C")
            ? placas.split("%2C").filter(Boolean).join(" / ")
            : placas}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={2} padding={2}>
        {sortedData.map(({ _id, placa, centro, conductor }: VehiculoProps) => (
          <Grid item xs={12} sm={6} md={4} key={_id}>
            <Card
              variant="outlined"
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                p: 0.5,
                gap: 3,
                borderRadius: 2,
                transition: 'all 0.3s ease-in-out',
                backgroundColor: carroActivo === _id ? '#e3f2fd' : '#f9f9f9', // azul claro
                border: carroActivo === _id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                opacity: carroActivo === _id ? 1 : 0.85,
                '&:hover': { transform: 'scale(1.01)' }
              }}
            >
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <Person fontSize="small" />
              </Avatar>
              
              <CardContent sx={{ p: 0, flex: 1 }}>
                <Typography variant="subtitle2">{conductor?.nombre}</Typography>
                <Typography variant="caption" color="text.secondary">
                Placa: <strong>{placa}</strong>  · ID: {_id} · Centro: {centro}
                </Typography>
              </CardContent>
              <RadioGroup
                onChange={() => {
                  asignCar(_id, placa);
                  setCarroActivo(_id);
                }}
              >
              <FormControlLabel
                value={_id}
                control={
                  <Radio
                    size="small"
                    checked={carroActivo === _id}
                    onChange={() => {
                      asignCar(_id, placa);
                      setCarroActivo(_id);
                    }}
                  />
                }
                label=""
              />
              </RadioGroup>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snack show={showSnack} setShow={() => setShowSnack(false) }  message={message} />
    </>
  );
}