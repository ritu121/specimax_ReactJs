/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import VMSheader from './vmsheader';

import Logo from "../../assets/images/logo.png"

import './style.css'



export default function vmsCheckIn() {
 
  return (
    
           <>
           

           <Grid sx={{ width: '100%', display: 'flex', justifyContent: "center", }}>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '60%' }}>

                  <VMSheader/>
                  <img width='200px' height='200px' src={Logo}></img>

                  <Typography component="h6" variant="h5" sx={{ margin: '20px',fontWeight:600 , fontFamily:'Poppins' }}><span className="thank">Thank you for Visiting!</span>
                  </Typography>
                  <Typography>
                  <div><Button className='btnRootqq'>Check In</Button></div>
                  </Typography>
               </Box>
            </Grid>

          
           
          
          
           
           
           
           </>
              

  )
}

