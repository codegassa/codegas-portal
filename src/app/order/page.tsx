import React, { lazy, useMemo} from 'react';
import InputSearch from "../components/search/search";

// Establecemos un límite fijo para las órdenes
//const limit = 10;

// Cargar RenderOrder de manera diferida (lazy loading)
const RenderOrder = lazy(() => import('./RenderOrder'));

const Order = ({ searchParams }: any) => {
  const { page, search, newValue, limit, idUser, acceso} = searchParams;

  const parsedLimit = useMemo(() => {
    const num = Number(limit);
    return !isNaN(num) && num > 0 ? num : 10;
  }, [limit]);
  // Memoizar page y search para evitar cálculos innecesarios
  const pageMemo = useMemo(() => page, [page]);
  const searchMemo = useMemo(() => search, [search]);


  return (
    <>
      <InputSearch />
      {idUser && (
          <RenderOrder
            idUser={idUser}
            acceso={acceso}
            limit={parsedLimit}
            search={searchMemo}
            page={pageMemo}
            newValue={newValue}
          />
      )}
    </>
  );
};
export default Order