'use client'
import React, { useContext, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline, Box, Toolbar, List, Typography, Divider, IconButton,ListItemText, ListItemButton} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {Logout} from '@mui/icons-material';
import {MainListItems} from './listItems';
import {DataContext} from '../../context/context'
import {redirect} from 'next/navigation'

const drawerWidth = 190;

interface AppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: open
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? drawerWidth : theme.spacing(7),
  width: open
    ? `calc(100% - ${drawerWidth}px)`
    : `calc(100% - ${theme.spacing(7)})`,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: open ? drawerWidth : theme.spacing(7),
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: open
          ? theme.transitions.duration.enteringScreen
          : theme.transitions.duration.leavingScreen,
      }),
      boxSizing: 'border-box',
      overflowX: 'hidden',
    },
  })
);
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#002586',
    },
    secondary: {
      main: '#3A66B1',
    },
  },
});

export default function Nav({children}: {children: React.ReactNode}) {
  const [open, setOpen] = useState(true);
  const {user, closeSesion}: any = useContext(DataContext);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const LogOut = async () => {
    try {
      await closeSesion();
      redirect('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{pr: '22px'}}>
            <Typography
              component="h3"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 4, ml: 2 }}
            >
             Gestión de Pedidos Logistica CODETRACK
            </Typography>
            <Typography component="h6" color="inherit" noWrap>
              {user?.email}
            </Typography>
          </Toolbar>
        </AppBar>
        {user && (
        <Drawer variant="permanent" open={open}>
        <Box sx={{height: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Box>
          <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', px:2}}>
          <img src={open ? '/images/logocode.webp' : '/images/codeBlue.png'}
               width={open ? 140 : 26}
               alt='Logo'
               style={{ cursor: 'pointer' }}
               onClick={toggleDrawer}
            />
          </Toolbar>
          <Divider />
          <List component="nav">
          <List component="nav" >
            <MainListItems />
          </List>
          </List>
           </Box>
           <Box>
           <Divider />
           <List component="nav">
            <ListItemButton onClick={LogOut}>
              <Logout sx={{ mr: 1 }} />
              {open && <ListItemText secondary="Cerrar sesión" />}
            </ListItemButton>
            </List>
            </Box>
            </Box>
          </Drawer>)}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[500],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>  
    </ThemeProvider>
    
  );
}