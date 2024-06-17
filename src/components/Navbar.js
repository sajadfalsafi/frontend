import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Button, Box, Container, Menu, MenuItem } from '@mui/material';
import ContactForm from './ContactForm';
import Logo from './Logo';

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get('https://sajadf.pythonanywhere.com/navbar/')
      .then(response => {
        console.log('Navbar response:', response.data); // Print entire response data to console
        if (Array.isArray(response.data)) {
          setMenuItems(response.data);
          console.log('Menu items set:', response.data);
        } else {
          console.log('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching the navbar data:', error);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmenuOpen = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.parent === null) {
        const subItems = menuItems.filter(subItem => subItem.parent === item.id);
        if (subItems.length > 0) {
          return (
            <div key={item.id}>
              <Button
                color="inherit"
                onMouseEnter={handleSubmenuOpen}
                aria-controls="submenu"
                aria-haspopup="true"
              >
                {item.title}
              </Button>
              <Menu
                id="submenu"
                anchorEl={submenuAnchorEl}
                keepMounted
                open={Boolean(submenuAnchorEl)}
                onClose={handleSubmenuClose}
                MenuListProps={{
                  onMouseLeave: handleSubmenuClose,
                }}
              >
                {subItems.map(subItem => (
                  <MenuItem key={subItem.id} onClick={handleSubmenuClose}>{subItem.title}</MenuItem>
                ))}
              </Menu>
            </div>
          );
        } else {
          return <Button key={item.id} color="inherit">{item.title}</Button>;
        }
      }
      return null;
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', color: '#000000', boxShadow: 'none', borderBottom: '1px solid #E0E0E0' }}>
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              {renderMenuItems(menuItems)}
            </Box>
            <Box>
              <Button variant="outlined" sx={{ color: '#1976d2', borderColor: '#1976d2' }} onClick={handleOpen}>Project request</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ContactForm open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Navbar;
