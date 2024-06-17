import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('https://sajadf.pythonanywhere.com/logo/')
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const logoData = response.data[0];
          setTitle(logoData.title);
          console.log('Logo title:', logoData.title); // Print title to console
        } else {
          console.log('Unexpected logo data format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching the logo data:', error);
      });
  }, []);

  return (
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
    </Link>
  );
};

export default Logo;
