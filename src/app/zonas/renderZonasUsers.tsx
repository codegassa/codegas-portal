'use client'
import React, { useEffect, useState } from 'react';
import { fetchZonasByUser } from '../store/fetch-zona';
import RenderTable from './table';

export const RenderZonasUsers = ({ limit, page, idZone, type, search, newValue }: any) => {
  const [zona, setZona] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchZonasByUser(limit, page, idZone, type, search, newValue);
      setZona(result);
    };
    fetchData();
  }, [limit, page, idZone, type, search, newValue]);

  return <RenderTable zona={zona} />;
};
