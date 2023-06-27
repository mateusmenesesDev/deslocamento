'use client';
import Link from 'next/link';
import { useState } from 'react';

import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MenuIcon from '@mui/icons-material/Menu';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { AppBar } from './AppBar';
import { Drawer } from './Drawer';
import { DrawerHeader } from './DrawerHeader';

export default function DrawerMenu({
  children
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const menuItens = [
    { text: 'Clientes', Icon: PersonOutlineIcon, url: 'clientes' },
    {
      text: 'Condutores',
      Icon: AirlineSeatReclineExtraIcon,
      url: 'condutores'
    },
    { text: 'Veículos', Icon: DirectionsCarIcon, url: 'veiculos' },
    { text: 'Deslocamentos', Icon: ModeOfTravelIcon, url: 'deslocamentos' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Deslocamento Naty
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{
                    opacity: open ? 1 : 0
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          {menuItens.map(({ text, Icon, url }) => (
            <Link
              href={url}
              key={url}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {<Icon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto',
          backgroundColor: '#F2F2F2'
          // minHeight: '100vh'
        }}
      >
        <DrawerHeader />
        <main>{children}</main>
      </Box>
    </Box>
  );
}
