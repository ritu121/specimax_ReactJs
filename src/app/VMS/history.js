/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Grid, TextField, Typography, Link } from "@mui/material";

import Logo from "../../assets/images/logo.png"
import VMSheader from './vmsheader';

import './style.css'
import Vmsheader from "./vmsheader copy";



export default function history() {

    return (

        <>


            <Grid sx={{ width: '100%', display: 'flex', justifyContent: "center", }}>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '60%' }}>
                    <Vmsheader/>

                    <Typography component="h6" variant="h5" sx={{ margin: '20px' ,fontWeight:600 , fontFamily:'Poppins'}}>My History</Typography>
                    <Typography sx={{ width: '100%' }}>
                        <div className="names">
                            <div>Date & Time</div>
                            <div>Site Name</div>
                        </div>
                    </Typography>
                    <Typography component="h6" variant="h5" sx={{ marginTop: '30px',width: '100%'}}>
                        <div className='cardA'>
                            <div className="fex">
                                <div><p>27-05-2023 09:00 am</p></div>
                                <div>111 George St</div>
                            </div>
                            <hr></hr>
                            <div className="fex">
                                <div><p>27-05-2023 09:00 am</p></div>
                                <div>111 George St</div>
                            </div>
                            <hr></hr>
                            <div className="fex">
                                <div><p>27-05-2023 09:00 am</p></div>
                                <div>111 George St</div>
                            </div>
                        </div>
                    </Typography>

                </Box>
            </Grid>








        </>


    )
}

