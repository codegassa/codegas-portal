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
