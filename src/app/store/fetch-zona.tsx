import URL from '../utils/url' 

export const fetchZonasByUser = async (limit: any, page: any, idZona: any, type: any, search: any, newValue: any) => {
    const start = (page > 0) ? (page - 1) * limit : 1;
    try {
        const response = await fetch(`${URL}/users/zonas/${limit}/${start}/${idZona}/${type}/${search}`, {cache: 'no-store'});

        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error); 
        return []
    }
};
 
export const fetchZonas = async() =>{
    try {
        const response = await fetch(`${URL}/zon/zona`, {cache: 'no-store'});
         if(!response.ok){
            throw new Error(`Ruquest failed with status ${response.status}`)
        }
        const {zona} = await response.json();
        return zona
    } catch (error){
        console.error(error)
        return []
    }
}

export const ChangeValorUnitario = async(valor: any, idUser: any) =>{
    try {
        const response = await fetch(`${URL}/users/cambiarValor/${valor}/${idUser}`, {cache: 'no-store'});
        const data = await response.json();
        return data
    } catch (error){
        console.error(error)
    }
}

export const ChangeValorUnitarioAll = async(valorUnitario: any, type: any) =>{
    const newData = {
        valorUnitario,
        type
    }
    try {
        const response = await fetch(`${URL}/users/cambiarValorTodos`, {
            method: 'PUT', 
            body: JSON.stringify(newData),
            cache: 'no-store'
        });
        const dataReponse = await response.json();
        return dataReponse
    } catch (error){
        console.error(error)
    }
}

export const ChangeValorUnitarioSelected = async(data: any) =>{
    const newData = {
        seleccionados: data
    }
   
    try {
        const response = await fetch(`${URL}/users/cambiarValorSelected`, {
            method: 'PUT', 
            body: JSON.stringify(newData),
            cache: 'no-store'
        });
        const dataReponse = await response.json();
        return dataReponse
    } catch (error){
        console.error(error)
    }
}