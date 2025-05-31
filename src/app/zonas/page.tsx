'use client';
import React, { ReactElement } from 'react';
import { RenderZonasUsers } from './renderZonasUsers'; 
import InputSearch from "../components/search/search";

const idZone = 110;
const type = 'BySearch';

const Zona = ({ searchParams }: any): ReactElement => {
  const limit = parseInt(searchParams?.limit) || 10;
  const page = parseInt(searchParams?.page) || 1;
  const search = searchParams?.search || '';

  return (
    <>
      <InputSearch />
      <RenderZonasUsers
        limit={limit}
        page={page}
        search={search}
        idZone={idZone}
        type={type}
      />
    </>
  );
};

export default Zona;
