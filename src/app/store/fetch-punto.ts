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

 
export const addPuntoUser = async(date: any) =>{
    try {
        const response = await fetch(`${URL}/pun/punto`, {
            method: 'POST', 
            body: JSON.stringify(date),
            cache: 'no-store'
        });
        const data = await response.json();
        if (response.status !==200) {
            throw new Error(`Request failed with status ${response.status}`)
        }
        return data
    } catch (error){
        console.error(error)
        return []
    }
}