import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  FormControl,
  Typography,
  IconButton,
  Toolbar, AppBar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import header from './vmsheader';
import Logo from "../../assets/images/logo.png"
import './style.css'



export default function Vmsheader() {

  const [open, setOpen] = useState(false);




  const toggleDrawer = () => {
    setOpen(!open);
  };



  return (

    <Toolbar className='fex2'>
      <img height='80px' width='80px' src={Logo}></img>

      { open ?
        <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
:
<div>cross</div>
      }
      
    </Toolbar>

  )
}
