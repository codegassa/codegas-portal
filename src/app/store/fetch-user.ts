import URL from '../utils/url' 
 
export const getUsers = async (start: number, limit: number, access: number, search: any) => {
    const safeSearch = typeof search === 'string' && search !== 'undefined' ? search : '';
    try {
        
        const response = await fetch(`${URL}/users/acceso/${limit}/${start}/${access}/${safeSearch}`, {
            next: { revalidate: 10 } 
        });

        if(!response.ok){
            throw new Error(`Ruquest failed with status ${response.status}`)
        }
        const {user} = await response.json();

        return user;
    } catch (error) {
        console.error(error);
        return []
    }
};

export const getUserByUid = async (uid: any) => {
    try {
        const response = await fetch(`${URL}/users/uid/${uid}`, {
            next: { revalidate: 10 } 
        });
        if(!response.ok){
            throw new Error(`Ruquest failed with status ${response.status}`)
        }
        const user = await response.json();
        
        return user;
    } catch (error) {
        console.error(error);
        return []
    }
};

export const createUser = async(date: any) =>{
    try {
        const response = await fetch(`${URL}/users`, {
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

 