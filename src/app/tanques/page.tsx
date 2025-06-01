'use client'
import React, { ReactElement } from 'react';
import { RenderTanques } from './renderTanques'; 
import InputSearch from "../components/search/search"

const Tanque = ({ searchParams }: any): ReactElement => {
  const limit = parseInt(searchParams?.limit) || 10;
  const page = parseInt(searchParams?.page) || 1;
  const search = searchParams?.search || '';

  return (
    <>
          <InputSearch />
          <RenderTanques
            limit={limit}
            page={page}
            search={search}
          />
    </>
  )
}

export default Tanque 