'use client';
import React, { useEffect, useMemo } from 'react';
import { Pagination, Stack } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function PaginationTable({ total }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const idUser = searchParams.get('idUser');
  const acceso = searchParams.get('acceso');

  let page = searchParams.get('page') ?? "1";  // Defaults to "1" if page is null or undefined
  page = page === "0" ? "1" : page;

  // Use useMemo to memoize the URL building logic
  const buildQueryParams = useMemo(() => {
    const params: Record<string, string> = { page };

    if (search) params.search = search;
    if (idUser) params.idUser = idUser;
    if (acceso) params.acceso = acceso;

    // Use URLSearchParams but only include valid parameters
    return new URLSearchParams(params).toString();
  }, [page, search, idUser, acceso]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // Replace the page parameter in the query string when changing pages
    const updatedQueryParams = buildQueryParams.replace(`page=${page}`, `page=${value}`);
    router.push(`${pathname}?${updatedQueryParams}`);
  };

  // Only change the route if needed (avoiding unnecessary redirects)
  useEffect(() => {
    if (page === "1") return; // Don't navigate if the page is already "1"
    router.push(`${pathname}?${buildQueryParams}`);
  }, [pathname, buildQueryParams]);

  return (
    <Stack spacing={3} sx={{ padding: 1 }}>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={Math.ceil(total / 10)}
        page={Number(page)}
        showFirstButton
        showLastButton
        onChange={handleChange}
      />
    </Stack>
  );
}