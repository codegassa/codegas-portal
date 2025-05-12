'use cliente'
import React, { ReactElement } from 'react';
import { RenderZonasUsers } from './renderZonasUsers'; 
import InputSearch from "../components/search/search"

//const limit=10
const idZone=110
const type='BySearch'
const Zona = ({searchParams}: any): ReactElement => {
 const {limit,page,search} = searchParams

  return (
    <>
      <InputSearch />
      {RenderZonasUsers({limit, search, page, idZone, type})}
    </>
  )
}

export default Zona
 