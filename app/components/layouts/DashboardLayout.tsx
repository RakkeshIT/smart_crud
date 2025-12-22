'use client';

import * as React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { useUser, useClerk } from '@clerk/nextjs';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import Link from 'next/link';

const DRAWER_WIDTH_OPEN = 200;
const DRAWER_WIDTH_CLOSED = 50;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#4B0082' }} /> },
  { text: 'Orders', icon: <ShoppingCartIcon sx={{ color: '#4B0082' }} /> },
  { text: 'Reports', icon: <BarChartIcon sx={{ color: '#4B0082' }} /> },
];

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(true);
  const {user} = useUser();
  const  {signOut} = useClerk();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const MenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Header */}
    <AppBar
  position="fixed"
  sx={{
    zIndex: (theme) => theme.zIndex.drawer + 1,
    bgcolor: 'white',
    color: 'black',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
  }}
>
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    {/* Left: Title + Drawer Toggle */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" noWrap>
        My Dashboard
      </Typography>

      <IconButton
        sx={{
          backgroundColor: 'rgba(75,0,130,0.3)',
          borderRadius: '10px',
          ml: 2,
          '&:hover': { backgroundColor: 'rgba(75,0,130,0.7)' },
        }}
        onClick={() => setOpen(!open)}
      >
        <MenuRoundedIcon />
      </IconButton>
    </Box>

    {/* Right: Profile Avatar */}
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ p: 0 }} // remove extra padding
      >
        <Avatar src={user?.imageUrl} sx={{ width: 32, height: 32 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem><Link href="/client/profile">Profile</Link></MenuItem>
        <MenuItem onClick={() => signOut({redirectUrl: '/login'})}>Logout</MenuItem>
      </Menu>
    </Box>
  </Toolbar>
</AppBar>


      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          '& .MuiDrawer-paper': {
            width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
    <Box
  component="main"
  sx={{
    flexGrow: 1,
    pt: 10,           // space below AppBar
    px: 3,            // left + right spacing
    pb: 3,            // bottom spacing
    transition: 'all 0.9s ease',
  }}
>
  <Box
    sx={{
      maxWidth: '100%',
      mx: 'auto',
      bgcolor: '#fafafa',
      borderRadius: 2,
      p: 3,
    }}
  >
    {children}
  </Box>
</Box>

    </Box>
  );
}
