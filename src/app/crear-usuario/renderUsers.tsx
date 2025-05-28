import { getUsers } from '../store/fetch-user';
import { fetchZonas } from '../store/fetch-zona';
import { getPuntos } from '../store/fetch-punto';

import SelectUser from './SelectUser';
import type { RenderUsersProps } from "./crear-usuario.types";

export default async function RenderUsers({ page, limit, access, search, userId }: RenderUsersProps) {
  const user = await getUsers(page, limit, access, search);
  const zona = await fetchZonas();

  const puntos = userId ? await getPuntos(userId) : { puntos: null };

  return <SelectUser data={user} zona={zona} userId={userId} puntos={puntos.puntos} />;
}