'use client';
import { useEffect, useState } from 'react';
import {fetchRevisiones} from '../store/fetch-revisiones'
import RenderTable from './table'

interface Props {
  limit: number;
  page: number;
  search: string;
}

export const RenderRevisiones = ({ limit, page, search }: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoaded(false);
      const result = await fetchRevisiones(limit, page, search);
      setData(result);
      setLoaded(true);
    };
    loadData();
  }, [limit, page, search]);

  if (!loaded) return null;
  return <RenderTable revision={data} />;
};