import { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Typography,
    FormControl, InputLabel, MenuItem, Select, TextField,TextareaAutosize
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




export default function compCheckOut() {



    return (
        <Grid sx={{ width: '100%', display: 'flex', justifyContent: "center", }}>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '60%' }}>

                <VMSheader/>
                <Typography component="h6" variant="h5" sx={{ margin: '20px' ,fontWeight:800 , fontFamily:'Poppins' }}>Check Out</Typography>
                <Typography component="h6" variant="h6" sx={{ fontWeight:500,fontSize:'12px',color:'#202E43', fontFamily:'Poppins' }}>Compete Check Out</Typography>

                <Typography component='h6' varient='' className='visit'>Please answer below questions to complete Check Out</Typography>



                <Typography>
                    
                    <div>
                        <p className='ques'> Have you suffered any injury or near miss?</p>
                        <Button className='backbtn'>Yes</Button>< Button className='backbtn'>No</Button>
                    </div>
                    <div>
                        <p className='ques'> Have you completed all the required tasks?</p>
                        <Button className='backbtn'>Yes</Button>< Button className='backbtn'>No</Button>
                    </div>
                    <div>
                        <p className='ques'>Is there a reportable issue? Select one from below</p>
                        <Button className='backbtn'>Defect</Button>< Button className='backbtn'>Critical Defect</Button>
                        < Button className='backbtn'>Non Critical Defect</Button>< Button className='backbtn'>Non Conformance</Button>
                    </div>
                    <div>
                        <p className='ques'>Update Task Status</p>
                        <Button className='backbtn'>Completed</Button>< Button className='backbtn'>Partially Completed</Button>
                        < Button className='backbtn'>Reschedule</Button> < Button className='backbtn'>On Hold</Button>
                    </div>
                    <div className='cardA shadow' >
                    <Typography component='h6' varient='' className='txt'>Enter Comments</Typography>
                    <TextareaAutosize 
                    size="md" 
                    name="Size" 
                    maxRows={30}
                    aria-label="Note"
                    minRows={3}
                    minColumns={6} 
                    style={{ minWidth: '90%', fontSize: 12, padding: 5, fontFamily: "Poppins,Helvetica,Arial" }}
                    fullWidth
                    placeholder="Task completion notes including Defect, Injury etc." />
                    </div>
                    <div className='cardB' >

                        <input type='file'></input>

                    </div>
                   
                   <div><Button className='submitBtn' >Submit</Button></div>
                   
                </Typography>



            </Box>
        </Grid>
    )
}

