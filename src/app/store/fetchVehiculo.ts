import URL from '../utils/url' 

export const fetchVehiculos = async () => {
    try {
        const response = await fetch(`${URL}/veh/vehiculo/no_eliminados/30`, {cache: 'no-store'});
        
        const {carro} = await response.json();
        return carro;
    } catch (error) {
        console.error(error);
        return []
    }
};