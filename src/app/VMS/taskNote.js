import { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Typography,
    FormControl, InputLabel, MenuItem, Select ,TextField
} from "@mui/material";
import VMSheader from './vmsheader';
import './style.css'



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




export default function taskNote() {



    return (
        <Grid sx={{ width: '100%', display: 'flex', justifyContent: "center", }}>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '60%' }}>
                    <VMSheader/>

                    <Typography component="h6" variant="h5" sx={{margin:'20px',fontWeight:600 , fontFamily:'Poppins'}}>Tasks & Notifications</Typography>

                    <Typography component='h6' varient='' className='visit'>Please access the Task from table below</Typography>

                    


                    <Typography component="h6" variant="h5"  sx={{marginTop:'15px'}}>
                        <div className='cards'>
                            <div >
                                <p className='para'>Title : Secure perimeters doors</p>
                                <p className='para'>Site : 123 ABC, St</p>
                                <p className='para'>Due Date : 27-05-2023</p>
                                <p className='para'>Time Due : 09:00 am</p>
                                <p className='para'>Work Order No : WO123046</p>
                                <p className='para'>Description :Secure perimeter door..</p>
                            </div>
                            <div><Button className='buttoRootB'>Open</Button></div>
                        </div>
                    </Typography>

                    

                    <Typography component="h6" variant="h5"  sx={{marginTop:'15px'}} >
                        <div className='cards'>
                            <div >
                                <p className='para'>Title : Secure perimeters doors</p>
                                <p className='para'>Site : 123 ABC, St</p>
                                <p className='para'>Due Date : 27-05-2023</p>
                                <p className='para'>Time Due : 09:00 am</p>
                                <p className='para'>Work Order No : WO123046</p>
                                <p className='para'>Description :Secure perimeter door..</p>
                            </div>
                            <div><Button className='buttoRootB'>Open</Button></div>
                        </div>
                    </Typography>

                    <Typography component="h6" variant="h5" sx={{marginTop:'15px'}} >
                        <div className='cards'>
                            <div >
                                <p className='para'>Title : Secure perimeters doors</p>
                                <p className='para'>Site : 123 ABC, St</p>
                                <p className='para'>Due Date : 27-05-2023</p>
                                <p className='para'>Time Due : 09:00 am</p>
                                <p className='para'>Work Order No : WO123046</p>
                                <p className='para'>Description :Secure perimeter door..</p>
                            </div>
                            <div><Button className='buttoRootB'>Open</Button></div>
                        </div>
                    </Typography>
              

            </Box>
        </Grid>
    )
}

