import { RenderCrearPedido } from "./render-crear-pedido";
import type { ParamsProps } from "./crear-pedido.types";

const ACCESS = 'clientes';
const LIMIT = 10;

export default function CreatePedido({ searchParams }: ParamsProps) {
let { page = '0', search, idUser } = searchParams;

const numericPage = parseInt(page, 10);
const numericIdUser = idUser ? parseInt(idUser, 10) : undefined;

return RenderCrearPedido({
  search,
  page: numericPage,
  limit: LIMIT,
  access: ACCESS,
  idUser: numericIdUser,
});
}
