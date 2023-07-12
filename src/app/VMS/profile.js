import { useState } from 'react';

import {
  Box,
  Button,
  Grid,
  Typography,
  FormControl,
} from "@mui/material";
import Logo from "../../assets/images/logo.png"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@mui/styles";

const theme = createTheme();

theme.typography.cmt = {
  fontSize: '14px',
  textAlign: 'center',
  fontWeight: '400',
  color: '#96979C',
  fontFamily: 'Poppins',
  '@media (min-width:600px)': {
    fontSize: '14px',
    fontWeight: '400',
    color: '#96979C',
    fontFamily: 'Poppins',

  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
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




function profile() {



  return (
    <Grid sx={{ width: '100%', display: 'flex', justifyContent: "center", }}>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '60%' }}>
        <img width='200px' height='200px' src={Logo}></img>

        <ThemeProvider theme={theme}>
          <Typography component="h6" variant="h5" sx={{fontWeight:600 , fontFamily:'Poppins'}}>Your Profile</Typography>

          <Typography  component='h6' varient='' sx={{textAlign:'center'}}>Please enter details below to complete your profile</Typography>

          <TextField className="profile_font" id="outlined-basic" label="Name" variant="outlined" sx={{ padding: '2px', margin: '5px' }} />

          <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ padding: '2px', margin: '5px' }} />
          <TextField id="outlined-basic" label="Phone" variant="outlined" sx={{ padding: '2px', margin: '5px' }} />
          <TextField id="outlined-basic" label="Business Name" variant="outlined" sx={{ padding: '2px', margin: '5px' }} />
          <TextField id="outlined-basic" label="Position" variant="outlined" sx={{ padding: '2px', margin: '5px' }} />

          <Button variant="outlined" className='buttoRoot'>
            Upadte
          </Button>
          <Button variant="outlined" className='buttoRoot'>
            Proceed
          </Button>

        </ThemeProvider>

      </Box>
    </Grid>
  )
}

export default profile