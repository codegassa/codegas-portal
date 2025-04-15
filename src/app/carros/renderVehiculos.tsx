import { fetchVehiculos } from '../vehiculos/fetchVehiculo';
import Vehiculos from './vehiculos';

export const RenderVehiculos = async () => {
    const carro = await fetchVehiculos(); // Obtención de los datos
    return <Vehiculos carro={carro} />; // Renderizado del componente con los datos
};
  