'use client';
import { useEffect, useRef, useState } from 'react';
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
  const [error, setError] = useState<string | null>(null);

  // Guardar props anteriores
  const prevProps = useRef<RenderOrderProps>({
    idUser: '',
    acceso: '',
    limit: 0,
    page: 0,
    search: '',
    newValue: '',
  });

  useEffect(() => {
    const propsChanged =
      prevProps.current.idUser !== idUser ||
      prevProps.current.acceso !== acceso ||
      prevProps.current.limit !== limit ||
      prevProps.current.page !== page ||
      prevProps.current.search !== search ||
      prevProps.current.newValue !== newValue;

    if (!propsChanged) return;

    const fetchOrders = async () => {
      try {
        const { pedidos, total: fetchedTotal } = await fetchPedido(idUser, page, search, acceso, limit, newValue);
        
        // Solo actualizar si los datos realmente cambiaron
        setOrders((prev) => {
          const sameLength = prev.length === pedidos.length;
          const sameData = sameLength && prev.every((p, i) => JSON.stringify(p) === JSON.stringify(pedidos[i]));
          if (sameData) return prev;
          return pedidos;
        });

        setTotal((prev) => (prev !== fetchedTotal ? fetchedTotal : prev));

        // Actualizar referencia de props previas
        prevProps.current = { idUser, acceso, limit, page, search, newValue };
      } catch (err) {
        setError('Error al obtener las órdenes');
      }
    };

    fetchOrders();
  }, [idUser, acceso, limit, page, search, newValue]);

  return <RenderTable orders={orders} total={total} />;
};

export default RenderOrder;