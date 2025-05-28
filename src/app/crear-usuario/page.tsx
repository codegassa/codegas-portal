import React from 'react';
import RenderUsers from './renderUsers';
import type { ParamsProps } from './crear-usuario.types';

const ACCESS = 'administradores';
const LIMIT = 20;

export default function SignUp({ searchParams }: ParamsProps) {
  const search = searchParams.search ?? undefined;
  const page = Number(searchParams.page) || 0;
  const userId = searchParams.userId ?? undefined;

  return (
        <>
      {RenderUsers({ search: search, page: page, limit: LIMIT, access: ACCESS, userId: userId })}
    </>
  );
}
