import { RenderCrearPedido } from "./render-crear-pedido";
import type { ParamsProps } from "./crear-pedido.types";

const ACCESS = 'clientes';
const LIMIT = 100;

export default function CreatePedido({ searchParams }: ParamsProps) { 
    let { page , search, idUser } = searchParams;
    page = page || 0
    search = search ?? undefined
    
    return  RenderCrearPedido(({ search, page, limit: LIMIT, access: ACCESS, idUser }))
}