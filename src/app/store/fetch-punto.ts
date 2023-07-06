import URL from '../utils/url' 
 

export const getPuntos = async (id: any) => {
    try {
        const response = await fetch(`${URL}/pun/punto/byCliente/${id}`, {
            next: { revalidate: 100 } 
        });
        
        if(!response.ok){
            throw new Error(`Ruquest failed with status ${response.status}`)
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        return []
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


export const DeletePunto = async(_id: any) =>{
    const sendData = {_id}
    try {
        const response = await fetch(`${URL}/pun/punto`, {
            method: 'DELETE', 
            body: JSON.stringify(sendData),
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