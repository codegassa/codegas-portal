'use client';
import react, { ReactElement, useContext, useEffect } from 'react';
import { Container, Grid, Box} from '@mui/material';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import {DataContext} from "../context/context"

 
const LoyoutRevisiones = ({children}: {children: React.ReactNode}): ReactElement => {
  const {user, idUser, acceso}: any = useContext(DataContext)
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let search = searchParams.get('search');
  const page = searchParams.get('page');
  
  useEffect(()=>{
    router.push(`${pathname}?page=${page ??0}&idUser=${idUser}&acceso=${acceso}&search=${search ?? ""}`);
    console.log('Cada cuanto se ejecuta esto?')
  }, [idUser])
  if(!user) redirect('/')
  return(
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: 'auto', //160vh
        overflow: 'auto',
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 1, mb: 1 }} component="section">
          <Grid item xs={10}>
            {children}
          </Grid>
      </Container>
    </Box>
  )
}

export default LoyoutRevisiones
 