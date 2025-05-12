import {getUsers} from '../store/fetch-user' 
import {getPuntos} from '../store/fetch-punto'
import CrearPedido from './create-pedido'
import type {RenderPedidoProps} from "./crear-pedido.types"

export const RenderCrearPedido = async function RenderCrearPedido({ page, limit, access, search, idUser }: RenderPedidoProps) {
  const user = await getUsers(page, limit, access, search);

  let puntos = { puntos: null };
  if (idUser) {
    try {
      puntos = await getPuntos(idUser);
    } catch (error) {
      console.error(`Fallo al obtener puntos del cliente con id ${idUser}`, error);
    }
  }

  return <CrearPedido user={user} puntos={puntos.puntos} />;
};