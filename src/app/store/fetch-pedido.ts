import URL from '../utils/url' 

export const fetchPedido = async (idUser: any, start: any, search: string, acceso: string, limit: number, newValue: any) => {
        // Validar y asignar valores predeterminados si es necesario
        if (!idUser) {
            console.error("idUser no puede ser null o undefined");
            return [];
        }
        if (!acceso) {
            console.error("acceso no puede ser null o undefined");
            return [];
        }
    // Asegurarse de que 'search' y 'start' estén bien definidos
    search = search || '';  // Si search es undefined o null, asigna un valor vacío
    start = (start > 0) ? (start - 1) * 10 : 0; 
    const url = `${URL}/ped/pedido/todos/app/${idUser}/${limit}/${start}/${acceso}/${search}`;
    console.log('URL generada:', url);  // Log para asegurarse de que la URL es correcta
    try {
        const response = await fetch(url, {cache: 'no-store'});
        if (response.status !== 200) {
            const errorData = await response.json();  // Extraer detalles del error si es posible
            console.error(`Error en la respuesta: ${JSON.stringify(errorData)}`);
            throw new Error(`Request failed with status ${response.status}, ${JSON.stringify(errorData)}`);
        }
        const {pedido} = await response.json();
        return pedido;
    } catch (error) {
        console.error('Error en fetchPedido:', error);
        return []
    }
};
 
export const UpdateDatePedido = async(data: any) =>{
    const newData = {
        seleccionados: data
    }
    try {
        const response = await fetch(`${URL}/ped/pedido/asignarFechaEntrega`, {
            method: 'POST', 
            body: JSON.stringify(newData),
            cache: 'no-store'
        });
        const data = await response.json();
        return data
    } catch (error){
        console.error(error)
    }
}

export const addCarPedido = async(idPedido: any, idCar: any, date: any, idUser: any) =>{
    try {
        const response = await fetch(`${URL}/ped/pedido/asignarConductor/${idPedido}/${idCar}/${date}/${idUser}`, {cache: 'no-store'});
        const data = await response.json();
        return data
    } catch (error){
        console.error(error)
    }
}

export const UpdateStatePedido = async(data: any) =>{
    const newData = {
        seleccionados: data
    }
    try {
        const response = await fetch(`${URL}/ped/pedido/cambiarEstado`, {
            method: 'POST', 
            body: JSON.stringify(newData),
            cache: 'no-store'
        });
        const data = await response.json();
        return data
    } catch (error){
        console.error(error)
    }
}


export const createPedido = async(date: any) =>{
    try {
        const response = await fetch(`${URL}/ped/pedido`, {
            method: 'POST', 
            body: JSON.stringify(date),
            cache: 'no-store'
        });
        const data = await response.json();
        return data
    } catch (error){
        console.error(error)
    }
}

export const validatePedido = async(usuarioId: number, puntoId :number, ) =>{
    try {
        const response = await fetch(`${URL}/ped/pedido/today/${usuarioId}/${puntoId}`, {
            method: 'GET', 
            cache: 'no-store'
        });
        const data = await response.json();
        return data
    } catch (error){
        console.error(error)
    }
}


export const sendNovedad = async(data: any) =>{
    try {
        const response = await fetch(`${URL}/ped/pedido/novedad-innactivo`, {
            method: 'PUT', 
            body: JSON.stringify(data),
            cache: 'no-store'
        });
        const dataresponse = await response.json();
        return dataresponse
    } catch (error){
        console.error(error)
    }
}

export const resetPedido = async(idPedido: any) =>{
    console.log(idPedido)
    try {
        const response = await fetch(`${URL}/ped/pedido/reset/${idPedido}`, {
            method: 'GET', 
            cache: 'no-store'
        });
        const dataresponse = await response.json();
        return dataresponse
    } catch (error){
        console.error(error)
    }
}