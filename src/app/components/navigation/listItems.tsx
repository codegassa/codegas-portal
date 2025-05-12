
import * as React from 'react';
import { ListItemIcon, ListItemButton, ListItemText } from '@mui/material/';
import {
  Dashboard, Map, People, AssignmentTurnedIn, PropaneTank,
  VerifiedUser, BorderColor, FireTruck, ShoppingBag
} from '@mui/icons-material/';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const menuItems = [
  { link: "/zonas", text: "Zonas", icon: <Map /> },
  { link: "/tanques", text: "Tanques", icon: <FireTruck /> },
  { link: "/revisiones", text: "Revisiones", icon: <VerifiedUser /> },
  { link: "/vehiculos", text: "Vehiculos", icon: <ShoppingBag /> },
  { link: "/informes", text: "Informes", icon: <AssignmentTurnedIn /> },
  { link: "/crear-usuario", text: "Crear Usuario", icon: <People /> },
  { link: "/crear-pedido", text: "Crear Pedido", icon: <BorderColor /> },
  { link: "/crear-tanque", text: "Crear Tanque", icon: <PropaneTank /> },
  { link: "/order", text: "Pedidos", icon: <Dashboard /> }
];

export const MainListItems = () => {
  const pathname = usePathname();
  console.log('Ruta actual listItems:', pathname);

  return (
    <>
      {menuItems.map(({ text, icon, link }) => (
        <Link href={link} key={link} style={{ textDecoration: 'none' }}>
          <ListItemButton
            selected={pathname === link}
            sx={{
              color: pathname === link ? '#1976d2' : '#666565',
              backgroundColor: pathname === link ? '#e3f2fd' : 'transparent',
              '&:hover': {
                backgroundColor: '#bbdefb',
              },
            }}
          >
            <ListItemIcon sx={{ color: pathname === link ? '#1976d2' : '#666565' }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </Link>
      ))}
    </>
  );
};
