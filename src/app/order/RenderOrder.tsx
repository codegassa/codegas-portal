'use client'
import { useEffect, useState } from 'react';
import { fetchPedido } from '../store/fetch-pedido';
import RenderTable from './table';

interface RenderOrderProps {
  idUser: string;
  acceso: string;
  limit: number;
  page: number;
  search: string;
  newValue: string;
}

const RenderOrder = ({ idUser, acceso, limit, page, search, newValue }: RenderOrderProps) => {
  const [orders, setOrders] = useState<any[]>([]);  // Aquí guardamos los datos de las órdenes
  const [loading, setLoading] = useState(true);  // Para manejar el estado de carga
  const [error, setError] = useState<string | null>(null);  // Para manejar errores

  // Usamos useEffect para hacer la solicitud cuando el componente se monte
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);  // Iniciamos el estado de carga
        //setError(null);   Limpiamos cualquier error previo

        const orderData = await fetchPedido(idUser, page, search, acceso, limit, newValue);
        setOrders(orderData);  // Establecemos los datos obtenidos
        console.log("Lista Data",orderData)
      } catch (err) {
        setError('Error al obtener las órdenes');
        console.error(err);
      } finally {
        setLoading(false);  // Terminamos el estado de carga
      }
    };
    fetchOrders();  // Llamamos a la función de obtención de datos
  }, [idUser, acceso, limit, page, search, newValue]);  // Dependencias para volver a ejecutar cuando alguno de estos cambie

  // Mientras se cargan los datos o si hay un error, mostramos mensajes de estado
  if (loading) {
    return <div >Preparando la información para su visualización</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return <RenderTable orders={orders} />;  // Renderizamos la tabla con los datos obtenidos
};
export default RenderOrder;
