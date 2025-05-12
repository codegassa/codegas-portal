'use cliente'
import React, { ReactElement } from 'react';
import { RenderRevisiones } from './renderRevisiones'; 
import InputSearch from "../components/search/search"

const limit=10
const Revisiones = ({searchParams}: any): ReactElement => {
  let {page, search} = searchParams
  page = page || 0

  return (
    <>
      <InputSearch />
      {RenderRevisiones({limit, search, page}) }
    </>
  )
}

export default Revisiones
 