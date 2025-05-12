import { lucitana, openSans,dmSans } from './utils/fonts';
import Nav from './components/navigation/nav'
import {DataProvider} from './context/context';
import { Box, Hidden, Typography } from '@mui/material';
import Snack from './components/snackBar';
import { SetStateAction } from 'react';

export const metadata = {
  title: 'App codegas',
  description: 'Aplicación que tiene seguimiento de los pedidos',
}

export default function RootLayout({children}:{children: React.ReactNode}){
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`} style={{ margin: 0, padding: 0 }}>
        <DataProvider>
         <Box sx={{ height: '97.7vh', display: 'flex', flexDirection: 'column' }}>
            <Nav>
              {children}
            </Nav>
          </Box>
          <Box display="flex" justifyContent="center"
          sx={{
            bgcolor: '#F5F5F5',
            color: 'black',
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" sx={{ fontSize: '0.7rem'}}className='block md:hidden'>
            En espera de implementar
            </Typography>
        </Box> 
        </DataProvider>
      </body>
    </html>
  )
}
