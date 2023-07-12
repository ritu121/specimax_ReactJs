import React, { useEffect, useState } from "react";
import {
  Box, Link, Button, Dialog, Skeleton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
  TextField,
  TextareaAutosize
} from "@mui/material";
import PageTitle from "../../common/PageTitle";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from "@mui/material/TablePagination";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { useDispatch, useSelector } from "react-redux";
import { selectSiteInspection } from "../../../features/sites/sitesSlice";
// import Select from 'react-select';
// import MenuItem from '@mui/material/MenuItem';


import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { toast } from "react-toastify";

import { Controller, useForm } from "react-hook-form";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { red } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";
import { getAPI, postAPI } from "../../network";
import Loader from "../../common/Loader";
import { checkAuthority, tableHeader, tableData, formatDate, fullName, tablebtn } from "../../utils";
import "./index.css";
import { validation } from "../../utils";

const styles = {
  minWidth: "90%"
}

export default function RiskAssessment() {
  const navigateTo = useNavigate();
  const { ids } = useParams();
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(false)

  const [assessment, setAssessment] = useState([])
  const [all, setAll] = useState([])
  const [category, setCategory] = useState([])
  const [siteId, setSiteId] = useState('')
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10)

  const [assessName, setAssessName] = useState('')
  const toastObj = { position: toast.POSITION.TOP_RIGHT };


  const [options, setOptions] = useState([])
  const [quesArr, setQuesArr] = useState([])
 const[ choices ,setChoices]=useState([{
  questionid:'',
  cat:'',
  subCat:'',
  inherit:'',
  impact:'',
  like:'',
  rating:'',
  note:'',
  media:''
 }])
 console.log("choices*************",choices)
  





 


  useEffect(() => {
    getCategoryQuestions()
    getCategoryOtion()

  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editCat = (e, id) => {
    e.preventDefault();
    clearAll();
    let data = assessment.filter(item => item.id === id)[0];
    console.log("DATA----", data)
    setOptions(prevState => ({
      ...prevState,
      category: [],
      subcategory: [],
      riskInherent: [],
      likelihood: [],
      impact: [],
      riskRating: '',
      notes: '',
    }))
  }


  const SubmitForm = async (e) => {
    // setQuesArr(current=>[...current,{question:options}])

    // console.log(quesArr,":::::::::::quesArr")
    e.preventDefault()

    if (validation('array', 'Fields', options)) {
      return
    }

    const payload = {
      'riskAssessmentCategoryId': ids,
      "siteId": "6364c763dab738df842f2cbb",
      "questions": options
    }
    console.log("PAYLOAD_______:::::::::::::::::::::", payload)



    setLoader(true)
    let data = await postAPI(`/risk-assessment-report`, payload)
    // console.log("data post-----------///////", data)
    navigateTo('/custom/reports')

    setLoader(false)



  };


  const clearAll = () => {
    setOptions({
      category: '',
      subcategory: '',
      riskInherent: '',
      likelihood: '',
      impact: '',
      riskRating: '',
      notes: '',
      categoryError: false,
      subcategoryError: false,
      riskIdentifiedError: false,
      likelihoodError: false,
      impactError: false,
      riskRatingError: false
    })
  }


  const getCategoryQuestions = async () => {

    setLoader(true)
    let data = await getAPI(`/risk-assessment/category-question/by-category/${ids}`);
    // console.log('URL LINK','/user/reports' + generateUrl(dSId, dSDate, dEDate))

    if (data) {
      setAssessment(data)
      setAssessName(data[0].riskAssessmentCategoryId.name)
    }
    setLoader(false)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const getCategoryOtion = async () => {
    setLoader(true)

    let data = await getAPI(`/risk-assessment/category-question/by-category/6409c1f94cd9a6340cab18a1`)

    if (data) {

    }
    setLoader(false)
  }


  const addAns = () => {

    if ( validation('empty', 'All fields of Answer',  choices.questionid)) {
      return;
     }
     else if ( validation('empty', 'All fields of Answer',  choices.cat)) {
      return;
     }
     else if ( validation('empty', 'All fields of Answer',  choices.subCat)) {
      return;
     }
     else if ( validation('empty', 'All fields of Answer',  choices.like)) {
      return;
     }
     else if ( validation('empty', 'All fields of Answer',  choices.impact)) {
      return;
     }
     else if ( validation('empty', 'All fields of Answer',  choices.rating)) {
      return;
     }
     else if ( validation('empty', 'All fields of Answer',  choices.note)) {
      return;
     }
     else if ( validation('empty', 'All fields of Answer',  choices.media)) {
      return;
     }
    setOptions(obj => [...obj, { questionId: choices.questionid, category: choices.cat, subCategory:choices.subCat,riskIdentified:choices.inherit,
      likelihood:choices.like,impact:choices.impact,rating:choices.rating,note:choices.note,media:choices.media}])
    
    setChoices(prevState => ({
      ...prevState,
      questionid:'',
      cat: '',
      subCat: '',
      inherit: '',
      like: '',
      impact:'',
      rating: '',
      note: '',
      media:''
    }))

    
    toast.success('Response Save Successfully',toastObj);
    
  
  }

  


  return (


    <Box sx={{ height: "inherit" }}>


      <Loader loader={loader} />
      <PageTitle title="Risk Assessment Forms" subTitle={assessName} />
    
        <Box display="flex" sx={{ my: "4rem" }}>
          <TableContainer component={Paper} sx={{ mx: "0.8rem" }} >
            <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
              <TableHead >
                <TableRow className="table-header">
                  <TableCell align="left" component="th" sx={{ width: '30px' }}>Sr No.</TableCell>
                  <TableCell align="left" component="th" sx={tableHeader}>Question</TableCell>
                  <TableCell align="left" component="th" sx={{ tableHeader, width: '10rem' }}>Risk Category</TableCell>
                  <TableCell align="left" component="th" sx={{ tableHeader, width: '10rem' }}>Risk Sub-Category</TableCell>
                  <TableCell align="center" component="th" sx={tableHeader}>Inherent Risk</TableCell>
                  <TableCell align="center" component="th" sx={tableHeader}>Likelihood</TableCell>
                  <TableCell align="center" component="th" sx={tableHeader}>Impact Type</TableCell>
                  <TableCell align="center" component="th" sx={tableHeader}>Rating</TableCell>
                  <TableCell align="center" component="th">Notes</TableCell>
                  <TableCell align="center" component="th">Media</TableCell>
                  <TableCell align='center' component="th"> Upload</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  assessment.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" sx={tableData}>
                        {index}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item?.question}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        <FormControl sx={{ m: 1, width: "90%" }}>
                          <Select
                            // value={props.selectedItem}
                            onChange={(v) => {
                              setChoices(prevState => ({
                                ...prevState,
                                cat:v.target.value,
                                questionid:item.id
                            }))
                              

                            }}
                            displayEmpty
                            lable='category'
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                          >

                            {
                              item?.category.map((item, index) => (
                                <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="left" sx={tableData}>


                        <FormControl sx={{ m: 1, width: "90%" }}>

                          <Select
                            // value={props.selectedItem}
                            onChange={(v) => {
                              setChoices(prevState => ({
                                ...prevState,
                                subCat : v.target.value,
                            }))
                            
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                          >

                            {
                              item?.subCategory.map((item, i = 1) => (
                                <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>

                      </TableCell>
                      <TableCell align="left" sx={tableData}>


                        <FormControl sx={{ m: 1, width: "90%" }}>
                          <Select
                            // value={props.selectedItem}
                            onChange={(v) => {
                             
                              setChoices(prevState => ({
                                ...prevState,
                                inherit : v.target.value,
                            }))
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                          >
                            {
                              item.riskIdentified.map((item, index) => (
                                <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>



                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        <FormControl sx={{ m: 1, width: "90%" }}>
                          <Select
                            // value={props.selectedItem}
                            onChange={(v) => {
                              setChoices(prevState => ({
                                ...prevState,
                                like : v.target.value,
                            }))
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                          >

                            {
                              item.likelihood.map((item, index) => (
                                <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        <FormControl sx={{ m: 1, width: "90%" }}>
                          <Select
                            // value={props.selectedItem}
                            onChange={(v) => {
                            
                              setChoices(prevState => ({
                                ...prevState,
                                impact : v.target.value,
                            }))
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                          >
                            {
                              item.impact.map((item, index) => (
                                <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="left" sx={{ tableData, width: 'Auto' }}>

                        <FormControl sx={{ m: 1, width: "90%" }}>
                          <Select
                            // value={props.selectedItem}
                            onChange={(v) => {
                             
                              setChoices(prevState => ({
                                ...prevState,
                                rating:v.target.value
                            }))
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                          >
                            {
                              item.rating.map((item, index) => (
                                <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>

                        {/* {item.rating == 'High' &&
                        <Button style={{backgroundColor:'red', color:"White"}}>High</Button>
                          }
                          {
                            item.rating == "Medium" &&
                            <Button style={{backgroundColor:"yellow", color:"White"}}> Low</Button>
                            
                          }
                          {
                            item.rating == "Low" &&
                            <Button style={{backgroundColor:"green", color:"White"}}> Low</Button>
                            
                          } */}
                      </TableCell>
                      <TableCell align="left" sx={{ tableData, width: 'Auto' }}>
                        <TextareaAutosize
                          maxRows={30}
                          aria-label="Note"
                          placeholder="Write Note here"
                          minRows={3}
                          minColumns={6}
                          onChange={(v) => {
                            setChoices(prevState => ({
                              ...prevState,
                              note:v.target.value
                          }))
                          }}

                          style={{ minWidth: '90%', fontSize: 12, padding: 5, fontFamily: "Poppins,Helvetica,Arial" }}

                          fullWidth
                        />

                      </TableCell>
                      <TableCell sx={{ tableData, width: '30 rem !importatnt' }}>
                        <TextField
                          name="upload-photo"
                          type="file"
                          onChange={(v) => {
                            setChoices(prevState => ({
                              ...prevState,
                              media:v.target.value
                          }))
                          }}

                          style={{ minWidth: '105px !important' }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className='grid m-5' item xs={12} align="right">
                          <button align="right" className={`text-white text-base w-1/2 rounded-3xl py-2 px-10 btn-bg-green `} variant="contained" onClick={addAns}>Save</button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colspan={10} sx={tableData} direction="column" justifyContent="left">

                    {/* <Link href="#" underline="none" >
                      <div className="custom-table-cell">
                        <span className="add-title">Add Questions</span>
                        <AddCircleIcon className="add-icon" fontSize="medium" />
                      </div>
                    </Link> */}
                    <Button
                      onClick={SubmitForm}
                      sx={{
                        float: "right",
                        mt: 2,
                        backgroundColor: "#42505C",
                        color: "white",
                        px: 5,
                        "&:hover": {
                          backgroundColor: "#343636",
                        },
                      }}
                      variant="contained"
                    >
                      Submit Form
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>


            </Table>
          </TableContainer>


        </Box>

      
    </Box>

  );
}


