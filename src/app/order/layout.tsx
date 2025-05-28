'use client';
import { ReactElement, useContext, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataContext } from '../context/context';

const LoyoutRevisiones = ({ children }: { children: React.ReactNode }): ReactElement => {
  const { user, idUser, acceso }: any = useContext(DataContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const page = searchParams.get('page') ?? '0';
  const currentIdUser = searchParams.get('idUser');
  const currentAcceso = searchParams.get('acceso');

  // Redirige si no hay sesión iniciada
  if (!user) redirect('/');

  useEffect(() => {
    const shouldRedirect =
      (idUser && currentIdUser !== idUser) ||
      (acceso && currentAcceso !== acceso);

    if (shouldRedirect) {
      router.replace(`${pathname}?page=${page}&idUser=${idUser}&acceso=${acceso}&search=${search}`);
    }
  }, [idUser, acceso, currentIdUser, currentAcceso, page, pathname, router, search]);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[400],
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 1, mb: 1 }} component="section">
        <Grid item xs={10}>
          {children}
        </Grid>
      </Container>
    </Box>
  );
};

export default LoyoutRevisiones;