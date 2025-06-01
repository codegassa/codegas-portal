'use client'
import React, { ReactElement } from 'react';
import { RenderRevisiones } from './renderRevisiones'; 
import InputSearch from "../components/search/search"

const Revisiones = ({ searchParams }: any): ReactElement => {
  const limit = parseInt(searchParams?.limit) || 10;
  const page = parseInt(searchParams?.page) || 1;
  const search = searchParams?.search || '';

  return (
    <>
      <InputSearch/>
      <RenderRevisiones
        limit={limit}
        page={page}
        search={search}
      />
    </>
  )
}

export default Revisiones
 