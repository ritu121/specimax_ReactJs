/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import VMSheader from './vmsheader';

import Logo from "../../assets/images/logo.png"

import './style.css'



export default function checkout() {

    return (

        <>


            <Grid sx={{ width: '100%', display: 'flex', justifyContent: "center", }}>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '60%' }}>

                    <VMSheader/>
                    <Typography component="h6" variant="h5" sx={{ margin: '20px',fontWeight:600 , fontFamily:'Poppins'}}>My History</Typography>
                    
                    <Typography component="h6" variant="h5" sx={{ marginTop: '30px',width: '100%'}}>
                        <div className='cardC'>
                            <div className="fex2">
                                <div>Arrival Date :</div>
                                <div>27-05-2023</div>
                            </div>
                           
                            <div className="fex2">
                                <div>Arrival Time :</div>
                                <div>09:00 am</div>
                            </div>
                            
                            <div className="fex2">
                                <div>Time on Site :</div>
                                <div>03:40 hrs</div>
                            </div>
                        </div>
                    </Typography>
                    <Typography sx={{ marginTop: '30px',width: '100%'}}>
                        <div><Button className="btnCheckOut">Check Out</Button></div>
                    </Typography>

                </Box>
            </Grid>








        </>


    )
}

