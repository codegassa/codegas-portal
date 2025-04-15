import React, { lazy, useMemo} from 'react';
import InputSearch from "../components/search/search";

// Establecemos un límite fijo para las órdenes
const limit = 10;

// Cargar RenderOrder de manera diferida (lazy loading)
const RenderOrder = lazy(() => import('./RenderOrder'));

const Order = ({ searchParams }: any) => {
  const { page = 0, search, newValue, idUser, acceso } = searchParams;

  // Memoizar page y search para evitar cálculos innecesarios
  const pageMemo = useMemo(() => page, [page]);
  const searchMemo = useMemo(() => search, [search]);


  return (
    <>
      {/* Componente de búsqueda */}
      <InputSearch search={searchMemo} />

      {/* Solo renderizar RenderOrder si idUser está presente */}
      {idUser && (
          <RenderOrder
            idUser={idUser}
            acceso={acceso}
            limit={limit}
            search={searchMemo}
            page={pageMemo}
            newValue={newValue}
          />
      )}
    </>
  );
};
export default Order