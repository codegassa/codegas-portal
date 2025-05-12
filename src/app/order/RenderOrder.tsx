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
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);  // Para manejar errores
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { pedidos, total } = await fetchPedido(idUser, page, search, acceso, limit, newValue);
        setOrders(pedidos);
        setTotal(total);
      } catch (err) {
        setError('Error al obtener las órdenes');
      }
    };
    fetchOrders();
  }, [idUser, acceso, limit, page, search, newValue]);
  
  return <RenderTable orders={orders} total={total} />;
};
export default RenderOrder;