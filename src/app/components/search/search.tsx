"use client"
import React, { useState } from 'react';

import {Paper, InputBase} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export default function InputSearch({search}: any) {
  const [url, setUrl] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const acceso = searchParams.get('acceso');
  const handleChangeUrl = (newUrl: any) => {
    newUrl = newUrl==="" ? undefined :newUrl
    if(pathname==="/order"){
      router.push(`${pathname}?page=1&search=${newUrl}&idUser=${idUser}&acceso=${acceso}`, undefined)
    } else {
      router.push(`${pathname}?page=1&search=${newUrl}`, undefined)
    }
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleChangeUrl(url);
    } 
  };
  const handleChange = (event: any) => {
    setUrl(event.target.value)
  };
    
 
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', margin: "8px 0" }}
    >
      <InputBase
        sx={{ ml: 2, flex: 2 }}
        placeholder="Palabra a buscar..."
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
        <IconButton type="button" sx={{ p: '8px' }} aria-label="search" onClick={()=>handleChangeUrl(url)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}