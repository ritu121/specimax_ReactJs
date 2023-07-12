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
import VMSheader from './vmsheader';
import Logo from "../../assets/images/logo.png"
import './style.css'

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '16px',
  textAlign: 'center',
  fontWeight: 900,
  '@media (min-width:600px)': {
    fontSize: '16px',
    fontWeight: 900,

  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
};

theme.typography.h2 = {
  backgroundColor: '#457B9D',
  color: 'white',
  fontSize: '16px',
  padding: '10px',
  borderRadius: '8px',
  fontWeight: 500,
  marginTop: '20px',

  '@media (min-width:600px)': {
    fontSize: '14px',
  },
}


// const useStyles = makeStyles(() => ({
//   inputRoot: {
//     borderRadius: "10px !important",
//     backgroundColor: "white",
//     padding: "0 5px",
//     boxShadow:
//       "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
//     "& .MuiOutlinedInput-input": {
//       padding: "14px !important",
//     },
//   },
//   buttoRoot: {
//     borderColor: "#707070 !important;",
//     color: "#202E43 !important;",
//     borderRadius: "8px !important;",
//     fontSize: "16px  !important;",
//     textTransform: "none !important;",
//     padding: "0px 30px !important;",
//     margin: "5px !important",
//     marginRight: "15px !important;",
//     "&:hover": {
//       backgroundColor: " #42505C !important;",
//       color: "white !important",

//     },
//   },
// }));




export default function induction() {



  return (
    <Grid sx={{ width: '100%', display: 'flex', justifyContent: "center", }}>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '60%' }}>


        <ThemeProvider theme={theme}>


          {/* <div className='fex2'>
            <div><img height='80px' width='80px' src={Logo}></img></div>
            <div>bar</div>
          </div> */}

          <VMSheader/>
              
            
          <Typography component="h6" variant="h5" sx={{ fontWeight: 600, fontFamily: 'Poppins' }}>Induction</Typography>

          <Typography component='h6' varient='' className='doc'>Please read below document & Proceed</Typography>

          <Button variant="outlined" className='buttoRootA'>
            Safety Induction (Mandatory)
          </Button>
          <Button variant="outlined" className='buttoRootA'>
            Emergency Procedure (Mandatory)
          </Button>
          <Button variant="outlined" className='buttoRootA'>
            Site Information
          </Button>
          <Button variant="outlined" className='buttoRootA'>
            Site Risks & Hazards
          </Button>
          <Button variant="outlined" className='buttoRootA'>
            Traffic Management Plan
          </Button>
          <Button variant="outlined" className='buttoRootA'>
            Evacuation Program
          </Button>
          <Button variant="outlined" className='buttoRootA'>
            Asbestos Register
          </Button>
          <Button variant="outlined" className='buttoRootA'>
            Site Operating Procedures
          </Button>
          <Button variant="outlined" className='buttoRootA'>
            Team Information
          </Button>
          <Typography component='h6' varient='' className='doc'>Your next Induction due is on 20-05-2024</Typography>

          <Typography component='h6' varient='' className='confirm'><input type='checkbox'></input>I confirm I have read and/or have access to above documents</Typography>

          <Button variant="outlined" className='buttoRootA'>
            Proceed
          </Button>
        </ThemeProvider>

      </Box>
    </Grid>
  )
}

