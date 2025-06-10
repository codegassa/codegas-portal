
import React, {useContext} from 'react';
import { ListItemIcon, ListItemButton, ListItemText } from '@mui/material/';
import { Dashboard, Map, People, AssignmentTurnedIn, PropaneTank,
  VerifiedUser, BorderColor, FireTruck, ShoppingBag } from '@mui/icons-material/';
import Link from 'next/link'
import { usePathname} from 'next/navigation';
import {DataContext} from '../../context/context'

const menuItems = [
  { link: "/zonas", text: "Zonas", icon: <Map />, roles: ["comercial"] },
  { link: "/tanques", text: "Tanques", icon: <FireTruck />, roles: ["adminTanque", "despacho"] },
  { link: "/revisiones", text: "Revisiones", icon: <VerifiedUser />, roles: ["adminTanque", "despacho"] },
  { link: "/carros", text: "Vehiculos", icon: <ShoppingBag />, roles: ["comercial"] },
  { link: "/informes", text: "Informes", icon: <AssignmentTurnedIn />, roles: ["adminTanque"] },
  { link: "/crear-usuario", text: "Crear Usuario", icon: <People />, roles: ["comercial"] },
  { link: "/crear-pedido", text: "Crear Pedido", icon: <BorderColor />, roles: ["despacho","veos","comercial"] },
  { link: "/crear-tanque", text: "Crear Tanque", icon: <PropaneTank />, roles: ["adminTanque"] },
  { link: "/order", text: "Pedidos", icon: <Dashboard />, roles: ["despacho","veo","comercial"] }
];

export const MainListItems = () => {
  const pathname = usePathname();
  const {acceso}: any = useContext(DataContext)

  return (
    <>
      {menuItems.filter(item => {
          return (!item.roles || acceso === 'admin' || item.roles.includes(acceso));
        })
        .map(({ text, icon, link }) => (
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
