'use client'
import React, { useContext, useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline, Box, Toolbar, List, Typography, Divider, IconButton,ListItemText} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {Menu, ChevronLeft, Logout} from '@mui/icons-material';
import {mainListItems} from './listItems';
import {DataContext} from '../../context/context'
import {redirect} from 'next/navigation'

const drawerWidth = 190;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: any) => {
  const transition = theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: open
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  });

  return {
    zIndex: theme.zIndex.drawer + 1,
    transition,
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    }),
  };
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => {
    const transition = theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: open
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    });

    return {
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: open ? drawerWidth : theme.spacing(5),
        transition,
        boxSizing: 'border-box',
        overflowX: open ? 'visible' : 'hidden',
        [theme.breakpoints.up('sm')]: {
          width: open ? drawerWidth : theme.spacing(7),
        },
      },
    };
  }
);
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Nav({children}: {children: React.ReactNode}) {
  const [open, setOpen] = useState(true);
  const [appBarWidth, setAppBarWidth] = useState('');
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const {user, closeSesion}: any = useContext(DataContext)
  const LogOut = async () =>{
    try {
      const response = await closeSesion()
      redirect('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const adjustedWidth = open ? screenWidth - 205 : screenWidth;
      setAppBarWidth(`${adjustedWidth}px`);
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);

  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" style={{ width: appBarWidth }}>
          <Toolbar
            sx={{
              pr: '22px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginLeft: '1px',marginRight: '30px',
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              component="h3"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 4 }}
            >
             Plataforma Gestión de Pedidos Logistica CODETRACK
            </Typography>
            <Typography
              component="h6"
              color="inherit"
              noWrap
            >
              {user?.email}
            </Typography>
           --
          </Toolbar>
        </AppBar>
        {user
        ?<Drawer variant="permanent" open={open}>
          <Toolbar>
            <img
              src='/images/logocode.webp'
              width={150}
              alt='Logo Codegas'
              onClick={toggleDrawer}/>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
          </List>
          {
               user
               ?<IconButton
                style={{color: "#666565", textDecoration: "none"}}
                onClick={LogOut}
                sx={{marginLeft: '8px'}}
              > 
                <Logout />
                 <ListItemText primary={'Cerrar'} />
              </IconButton> 
           : null}
        </Drawer>
        :null}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: 'auto',
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