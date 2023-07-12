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




export default function visit() {



    return (
        <Grid sx={{ width: '100%', display: 'flex', justifyContent: "center", }}>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '60%' }}>

                    <VMSheader/>
                
                    <Typography component="h6" variant="h5" sx={{margin:'20px' ,fontWeight:600 ,fontFamily:'Poppins'}}>Reason for Visit</Typography>

                    <Typography component='h6' varient='' className='visit'>Please select the reason for your Visit</Typography>

                    <FormControl fullWidth className='m-20'>
                        <InputLabel id="demo-simple-select-label">Select Reason</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={}
                            label="Select Reason"
                            // onChange={handleChange}
                            sx={{borderRadius:'10px',boxShadow:'0px 2px 6px rgba(66, 80, 92, 0.3)' }}
                           
                        >
                            <MenuItem value={10}>Meeting</MenuItem>
                            <MenuItem value={20}>Demo1</MenuItem>
                            <MenuItem value={30}>Demo2</MenuItem>
                        </Select>
                    </FormControl>


                    <Typography component="h6" variant="h5" sx={{margin:'20px'}}>Notify Host</Typography>

                    <Typography component='h6' varient='' className='visit'>Please enter the Host email to notify them about your visit</Typography>

                    <TextField id="email" label="Host Email"  sx={{borderRadius:'10px',boxShadow:'0px 2px 6px rgba(66, 80, 92, 0.3)' }} variant="outlined" />

                    <Button variant="outlined" sx={{marginTop:'20px !important'}} className='buttoRootA'>
                    Notify Host 
                    </Button>
              

            </Box>
        </Grid>
    )
}

