export interface ParamsProps {
    searchParams: {
      page?: number;
      idUser?: number;
      search?: string | undefined;
    };
}
   
export type RenderPedidoProps = {
  page: number;
  limit: number;
  access: string;
  search?: string | undefined;
  idUser?: number;
}

export interface Pedido {
  total: number;
  _id: string;
  codt: string;
  razonSocial: string;
  direccion: string;
  zona: string;
  fechasolicitud: string;
  fechaentrega?: string;
  estado: string;
  placa?: string;
  isCheked?: boolean;
}
