'use client'
import React, { useEffect, useState, useMemo } from 'react';
import { Paper, InputBase, IconButton, MenuItem, FormControl, Select, Box, debounce, SelectChangeEvent} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const filtroOpciones = [
  { label: 'En espera', key: 'estado', value: 'espera' },
  { label: 'Sin Entregar', key: 'fechaentrega', value: 'null' },
  { label: 'Sin Asignar', key: 'carroid', value: 'null' },
  { label: 'Pedidos mañana', key: 'fechasolicitud', value: 'manana' } // esto se transforma luego
];

export default function InputSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const acceso = searchParams.get('acceso');

  const [searchText, setSearchText] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  // Obtener fecha dia siguiente.
  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today); // copiar la fecha
    tomorrow.setDate(tomorrow.getDate() + 1); // modificar la copia
    return tomorrow.toISOString().split('T')[0]; // retorna "YYYY-MM-DD"
  };

  // Cargar desde localStorage
  useEffect(() => {
    const savedText = localStorage.getItem('searchText');
    const savedFilter = localStorage.getItem('selectedFilter');
    if (savedText) setSearchText(savedText);
    if (savedFilter) setSelectedFilter(savedFilter);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchText', searchText);
    localStorage.setItem('selectedFilter', selectedFilter);
  }, [searchText, selectedFilter]);

  const buildQuery = (text: string, filtro: string) => {
    const filterObj: Record<string, string> = {};
    const option = filtroOpciones.find(f => f.label === filtro);
    if (option) {
      const key = option.key;
      const value = option.value === 'manana' ? getTomorrowDate() : option.value;
      filterObj[key] = value;
    }

    const params = new URLSearchParams();
    if (text) params.set('search', text);
    Object.entries(filterObj).forEach(([key, value]) => {
      params.set(key, value);
    });
    if (idUser) params.set('idUser', idUser);
    if (acceso) params.set('acceso', acceso);
    params.set('page', '1');
    return `${pathname}?${params.toString()}`;
  };

  const debouncedSearch = useMemo(() => debounce((text: string, filtro: string) => {
        if (text.length >= 4 || text === '') {
          const query = buildQuery(text, filtro);
          router.push(query);
        }
      }, 500),
    [pathname, idUser, acceso]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value, selectedFilter);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    const filtro = event.target.value;
    setSelectedFilter(filtro);
    const query = buildQuery(searchText, filtro);
    router.push(query);
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedFilter('');
    localStorage.removeItem('searchText');
    localStorage.removeItem('selectedFilter');
  
    const params = new URLSearchParams();
    params.set('page', '1');
    params.set('search', ''); // 👈 esto asegura que tu tabla no se quede sin query
  
    if (idUser) params.set('idUser', idUser);
    if (acceso) params.set('acceso', acceso);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', flex: 1 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <IconButton type="submit" sx={{ p: '4px' }}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <Select
          displayEmpty
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="">Todos</MenuItem>
          {filtroOpciones.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton onClick={clearFilters}>
        <ClearIcon />
      </IconButton>
    </Box>
  );
}
