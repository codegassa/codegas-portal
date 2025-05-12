
import React, { useEffect, useMemo, useState } from 'react';
import { Pagination, Stack, FormControl, Select, MenuItem } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function PaginationTable({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Obtener los parámetros desde la URL
  const page = searchParams.get('page') ?? '1';
  const search = searchParams.get('search');
  const idUser = searchParams.get('idUser');
  const acceso = searchParams.get('acceso');
  const limit = searchParams.get('limit') ?? '10'; // Default a 10

  // Establecer el estado del límite en base a los parámetros de la URL
  const [selectedLimit, setSelectedLimit] = useState<string>(limit);

  // Generar la cadena de parámetros para la URL
  const buildQueryParams = useMemo(() => {
    const params: Record<string, string> = {
      page,
      limit: selectedLimit, // Usar el límite seleccionado
    };
    if (search) params.search = search;
    if (idUser) params.idUser = idUser;
    if (acceso) params.acceso = acceso;

    return new URLSearchParams(params).toString();
  }, [page, selectedLimit, search, idUser, acceso]);

  // Manejo del cambio de página
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const updatedParams = new URLSearchParams(buildQueryParams);
    updatedParams.set('page', value.toString());
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  // Manejo del cambio de límite
  const handleLimitChange = (event: any) => {
    const newLimit = event.target.value as string;
    setSelectedLimit(newLimit); // Actualizar el estado del límite seleccionado

    // Actualizar los parámetros de la URL con el nuevo límite y resetear la página
    const updatedParams = new URLSearchParams(buildQueryParams);
    updatedParams.set('limit', newLimit);
    updatedParams.set('page', '1'); // Resetear la página a la 1
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  useEffect(() => {
    if (page === '1') return;
    router.push(`${pathname}?${buildQueryParams}`);
  }, [pathname, buildQueryParams]);

  return (
    <Stack spacing={2} sx={{ padding: 1 }} direction="row" alignItems="center" justifyContent="space-between">
      {/* Componente de Paginación */}
      <Pagination
        variant="outlined"
        shape="rounded"
        count={Math.ceil(total / Number(selectedLimit))}
        page={Number(page)}
        showFirstButton
        showLastButton
        onChange={handlePageChange}
      />

      {/* Selector de Límite */}
      <FormControl size="small">
        <Select
          value={selectedLimit}
          onChange={handleLimitChange}
        >
          {[10, 20, 30, 40].map((value) => (
            <MenuItem key={value} value={value.toString()}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}