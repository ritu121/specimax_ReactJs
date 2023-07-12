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




export default function updateTask() {



    return (
        <Grid sx={{ width: '100%', display: 'flex', justifyContent: "center", }}>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '60%' }}>

                <VMSheader/>
                <Typography component="h6" variant="h5" sx={{ margin: '20px' ,fontWeight:600 , fontFamily:'Poppins'}}>Update Tasks</Typography>

                <Typography component='h6' varient='' className='visit'>Update the Task from field below</Typography>




                <Typography component="h6" variant="h5" sx={{ marginTop: '15px' }}>
                    <div className='cardA'>
                        <div className='mt'>
                            <p className='titlee para'>Task Name </p>
                            <p className='val para'>lorem ispsum</p>
                        </div>
                        <div className='mt'>
                            <p className='titlee para'>Client</p>
                            <p className='val para'>ABC</p>
                        </div>
                        <div className='mt'>
                            <p className='titlee para'>Site</p>
                            <p className='val para'>111 George St, Sydney NSW</p>

                        </div>
                        <div className='mt'>
                            <p className='titlee para'>Due Date</p>
                            <p className='val para'>12-05-2022</p>

                        </div>

                        <div className='mt'>
                            <p className='titlee para'>Vendor Name</p>
                            <p className='val para'>123 Security Services</p>

                        </div>
                        <div className='mt'>
                            <p className='titlee para'>Service Category</p>
                            <p className='val para'>Security Services</p>

                        </div>
                        <div className='mt'>
                            <p className='titlee para'>Work Order Number </p>
                            <p className='val para'>WO12345</p>

                        </div>
                        <div className='mt'>
                            <p className='titlee para'>Task Description</p>
                            <p className='val para'>Check extinguisher meet the AUS00123 standards.</p>

                        </div>
                        <div >
                            <p className='titlee para'>Assigned to</p>
                            <p className='val para'>Carlos</p>
                        </div>

                    </div>


                </Typography>

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
                    <Typography component='h6' varient='' className='txt'>Note</Typography>
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

