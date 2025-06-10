import URL from '../utils/url' 
 

export const getPuntos = async (id: any) => {
    try {
      const response = await fetch(`${URL}/pun/punto/byCliente/${id}`, {
        next: { revalidate: 100 }
      });
  
      if (!response.ok) {
        console.error(`Fallo al obtener puntos del cliente con id ${id}. Código de estado: ${response.status}`);
        return { puntos: [] }; // Devolver estructura esperada
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error inesperado al obtener puntos:', error);
      return { puntos: [] }; // Fallback seguro
    }
  };

 
export const addPuntoUser = async(data: any) =>{ 
    try {
        const res = await fetch(`${URL}/pun/punto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: false };
  }
};