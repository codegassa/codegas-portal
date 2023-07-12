import URL from '../utils/url' 

export const fetchTanques = async (limit: any, start: any, search: any) => {
    start = start==0 ?0 :(start-1)*10
    try {
        const response = await fetch(`${URL}/tan/tanque/${limit}/${start}/${search}`, {cache: 'no-store'});
        if (response.status !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const {tanque} = await response.json();
        return tanque;
    } catch (error) {
        console.error(error);
        return [];
    }
};
 
 
export const getAlerts = async (idTanque: any) => {
    try {
        const response = await fetch(`${URL}/ale/alertaTanque/byTanque/${idTanque}`, {cache: 'no-store'});
        const {alerta} = await response.json();
        if (response.status !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return alerta;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createTanque = async(date: any) =>{
    try {
        const response = await fetch(`${URL}/tan/tanque`, {
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

export const addImagesTanque = async(date: any, id:number, type:string) =>{
 
    try {
        const response = await fetch(`${URL}/tan/tanque/images/${id}/${type}`, {
            method: 'PUT', 
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

export const addUserTanque = async(date: any) =>{
    try {
        const response = await fetch(`${URL}/tan/tanque/add-user`, {
            method: 'PUT', 
            body: JSON.stringify(date),
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }
        return data
    } catch (error){
        console.error(error)
        return []
    }
}

export const addAlert = async(date: any) =>{
    try {
        const response = await fetch(`${URL}/ale/alertaTanque`, {
            method: 'POST', 
            body: JSON.stringify(date),
            cache: 'no-store'
        });
        const data = await response.json();
       
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }
        
        return data
    } catch (error){
        console.error(error)
        return []
    }
}
