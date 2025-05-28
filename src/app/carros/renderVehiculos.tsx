'use client';
import { useEffect, useState } from 'react';
import { fetchVehiculos } from '../store/fetchVehiculo';
import Vehiculos from './vehiculos';


export const RenderVehiculos = () => {
  const [carro, setCarro] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchVehiculos();
      setCarro(data);
    };
    fetchData();
  }, []);

  return <Vehiculos carro={carro} />;
};
  