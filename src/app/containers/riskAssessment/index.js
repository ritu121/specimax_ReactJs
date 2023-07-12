import React, { useEffect, useState } from "react";
import {
  Box, Link, Button, Dialog, Skeleton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
  TextField
} from "@mui/material";
import PageTitle from "../../common/PageTitle";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from "@mui/material/TablePagination";
import Table from '@mui/material/Table';
import InputLabel from '@mui/material/InputLabel';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { useDispatch, useSelector } from "react-redux";
// import { selectSiteInspection } from "../../../features/sites/sitesSlice";
// import Select from 'react-select';
// import MenuItem from '@mui/material/MenuItem';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';

import { Controller, useForm } from "react-hook-form";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { red } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { getAPI, postAPI } from "../../network";
import Loader from "../../common/Loader";
import { checkAuthority, tableHeader, tableData, formatDate, fullName, tablebtn } from "../../utils";
import "./index.css";


export default function RiskAssessment() {
  const { ids } = useParams();
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(false)

  const [assessment, setAssessment] = useState([])
  const [all, setAll] = useState([])
  const [category, setCategory] = useState([])
  const [siteId, setSiteId] = useState('')
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10)
  const [question, setQuestion] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([])
  const [subCatOptions, setSubCatOptions] = useState([])
  const [likelihoodOption, setLikelihoodOption] = useState([])
  const [impactOption, setImpactOption] = useState([])
  const [inherentIption, setInherentIption] = useState([])
  const [riskOption, setRiskOption] = useState([])
  const [questionError, setQuestionError] = useState(false)
  const [assessName, setAssessName] = useState('')

  const [rating, setRating] = useState([])
  const [impact, setImpact] = useState([])
  const [like, setLike] = useState([])
  const [inherent, setInherant] = useState([])
  const [cat, setCat] = useState([])
  const [subcat, setsubcat] = useState([])
  const [note, setNote] = useState([])


  const [options, setOptions] = useState({
    categoryError: false,
    subcategoryError: false,
    riskIdentifiedError: false,
    likelihoodError: false,
    impactError: false,
    riskRatingError: false
  })

  useEffect(() => {

    getAssessmentCategory()
    getCategoryQuestions()
    getCategoryOtion()
    getCatoptions()
    getSubCatoptions()
    getlikeoptions()
    getImpactoptions()
    getInherentoptions()
    getRatingOptions()
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearAll()
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
      riskRating: [],
      notes: '',
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setOptions(prevState => ({
      ...prevState,
      categoryError: false,
      subcategoryError: false,
      riskIdentifiedError: false,
      likelihoodError: false,
      impactError: false,
      riskRatingError: false,
      questionError: false,
      categoryIdError: false
    }))


    const payload = {
      'riskAssessmentCategoryId': ids,
      'question': question,
      'category': cat,
      'subCategory': subcat,
      'riskIdentified': inherent,
      'likelihood': like,
      'impact': impact,
      'rating': rating,
      'note': note
    }
    console.log("PAYLOAD_______", payload)

    setLoader(true)
    let data = await postAPI(`/risk-assessment/category-question`, payload)
    // console.log("data post-----------///////", data)
    if (data) {
      handleClose();
      getCategoryQuestions()
      clearAll()
    }
    setLoader(false)

  };


  const clearAll = () => {
    setQuestion('')
    setRating([])
    setImpact([])
    setLike([])
    setInherant([])
    setCat([])
    setsubcat([])
   setNote([])
    setOptions({
      categoryError: false,
      subcategoryError: false,
      riskIdentifiedError: false,
      likelihoodError: false,
      impactError: false,
      riskRatingError: false
    })
 
    console.log("options**************",options)
  }

  const getAssessmentCategory = async () => {
    setLoader(true)

    let process = await getAPI('/risk-assessment/category');

    if (process) {
      var categories = [];
      for (var i = 0; i < process.length; i++) {
        categories.push({ label: process[i].name, id: process[i].id })
      }

      setCategory(categories);
    }
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


  const getCatoptions = async () => {
    setLoader(true)

    let data = await getAPI(`/risk-assessment-question-choice`)
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == "640881950cad11228cffcbb9") {

          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setCategoryOptions(outputs)
        }
      }
    }
    setLoader(false)

  }
  const getSubCatoptions = async () => {
    setLoader(true)

    let data = await getAPI(`/risk-assessment-question-choice`)
    if (data) {
      for (let i = 0; i < data.length; i++) {

        if (data[i].id == "6409c1f94cd9a6340cab18a1") {

          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setSubCatOptions(outputs)
       
        }
      }
    }
    setLoader(false)

  }
  const getlikeoptions = async () => {
    setLoader(true)

    let data = await getAPI(`/risk-assessment-question-choice`)
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == "640af24a4cd9a6340cab23f3") {
          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setLikelihoodOption(outputs)
        }
      }
    }
    setLoader(false)
  }


  const getImpactoptions = async () => {
    setLoader(true)

    let data = await getAPI(`/risk-assessment-question-choice`)
    if (data) {

      for (let i = 0; i < data.length; i++) {
        if (data[i].id == "640af2214cd9a6340cab23ea") {
          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setImpactOption(outputs)
        }
      }
    }
    setLoader(false)
  }


  const getInherentoptions = async () => {
    setLoader(true)
    let data = await getAPI(`/risk-assessment-question-choice`)
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == "64088d21bf3520097071d9b5") {
          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setInherentIption(outputs)
        }
      }
    }
    setLoader(false)
  }


  const getRatingOptions = async () => {
    setLoader(true)

    let data = await getAPI(`/risk-assessment-question-choice`)
    if (data) {

      for (let i = 0; i < data.length; i++) {
        if (data[i].id == "64411816178e80384c5b4e42") {
          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setRiskOption(outputs)
        }
      }
    }
    setLoader(false)
  }





  const getCategoryOtion = async () => {
    setLoader(true)

    let data = await getAPI(`/risk-assessment/category-question/by-category/6409c1f94cd9a6340cab18a1`)

    if (data) {

    }
    setLoader(false)
  }


  return (


    <Box sx={{ height: "inherit" }}>


      <Loader loader={loader} />
      <PageTitle title="Risk Assessment Forms" subTitle={assessName} />
      {
        checkAuthority('SUBMIT_ASSESSMENT_FORM') &&
        <Box display="flex" sx={{ my: "4rem" }}>


          <TableContainer component={Paper} sx={{ mx: "0.8rem" }} >
            <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
              <TableHead >
                <TableRow className="table-header">
                  <TableCell align="left" component="th" sx={{ width: '30px' }}>Sr No.</TableCell>
                  <TableCell align="left" component="th" sx={tableHeader}>Question</TableCell>
                  <TableCell align="left" component="th" sx={tableHeader}>Risk Category</TableCell>
                  <TableCell align="left" component="th" sx={tableHeader}>Risk Sub-Category</TableCell>
                  <TableCell align="center" component="th" sx={tableHeader}>Inherent Risk</TableCell>
                  <TableCell align="center" component="th" sx={tableHeader}>Likelihood</TableCell>
                  <TableCell align="center" component="th" sx={tableHeader}>Impact Type</TableCell>
                  <TableCell align="center" component="th" sx={tableHeader}>Rating</TableCell>
                  <TableCell align="center" component="th" sx={tableHeader}>Notes</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {assessment
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" sx={tableData}>
                        {index}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item?.question}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item?.category.map((data, i = 0) => (
                          <span style={{ border: "1px solid gray", padding: "2px", margin: "2px" }}>{data?.name}</span>
                        ))
                        }
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                      {item?.subCategory.map((data, i = 0) => (
                          <span style={{ border: "1px solid gray", padding: "2px", margin: "2px" }}>{data?.name}</span>
                        ))
                        }
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                      {item?.riskIdentified.map((data, i = 0) => (
                          <span style={{ border: "1px solid gray", padding: "2px", margin: "2px" }}>{data?.name}</span>
                        ))
                        }
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                      {item?.likelihood.map((data, i = 0) => (
                          <span style={{ border: "1px solid gray", padding: "2px", margin: "2px" }}>{data?.name}</span>
                        ))
                        }
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                      {item?.impact.map((data, i = 0) => (
                          <span style={{ border: "1px solid gray", padding: "2px", margin: "2px" }}>{data?.name}</span>
                        ))
                        }
                      </TableCell>
                    <TableCell align="left" sx={tableData}>
                        {item?.rating.map((data, i = 0) => (
                          <span style={{ border: "1px solid gray", padding: "2px", margin: "2px" }}>{data?.name}</span>
                        ))
                        }
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item?.note}
                      </TableCell>

                    </TableRow>
                  ))
                }
              </TableBody>


              <TableFooter>
                <TableRow>
                  <TableCell colspan={2} sx={tableData} direction="column" justifyContent="left" onClick={handleClickOpen}>
                    <Link href="#" underline="none" >
                      <div className="custom-table-cell">
                        <span className="add-title">Add Questions</span>
                        <AddCircleIcon className="add-icon" fontSize="medium" />
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableFooter>


            </Table>
          </TableContainer>




          <Dialog open={open} onClose={handleClose}>
            <DialogTitle align="center">Add Risk Assessment Question</DialogTitle>
            <DialogContent height={"500px"}>
              <Grid
                container
                spacing={2}
                mt={3}
                component="form">
                <FormControl sx={{ minWidth: '90%', mt: 2, ml: 1.5 }}>

                  <TextField
                    fullWidth
                    label="Question"
                    variant="outlined"
                    type="text"
                    required
                    onChange={(e) => {
                      setQuestion(e.target.value)
                      // console.log(e.target.value,"value")
                    }}
                    value={question}
                    style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                    error={questionError}

                  />
                </FormControl>




                <FormControl sx={{ m: 1, width: "90%" }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Risk Category</span>
                  <Select
                    // value={props.selectedItem}
                    multiple
                    value={cat}
                    onChange={event => {
                      const value = event.target.value

                      setCat(
                        // On autofill we get a stringified value.
                        typeof value === 'string' ? value.split(',') : value,

                      );
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                  >
                
                    {
                      categoryOptions.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.label}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>





                <FormControl sx={{ m: 1, width: "90%" }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Risk Sub-Category</span>
                  <Select
                    multiple
                    value={subcat}
                    onChange={event => {
                      const value = event.target.value
                      setsubcat(
                        // On autofill we get a stringified value.
                        typeof value === 'string' ? value.split(',') : value,

                      );
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                  >
                    
                    {
                      subCatOptions.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.label}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>





                <FormControl sx={{ m: 1, width: "90%" }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Inherent Risk</span>
                  <Select
                    multiple
                    value={inherent}
                    onChange={event => {
                      const value = event.target.value

                      setInherant(
                        // On autofill we get a stringified value.
                        typeof value === 'string' ? value.split(',') : value,

                      );
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                  >
                  
                    {
                      inherentIption.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.label}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>




                <FormControl sx={{ m: 1, width: "90%" }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Likelihood</span>
                  <Select
                    multiple
                    value={like}
                    onChange={event => {
                      const value = event.target.value

                      setLike(
                        // On autofill we get a stringified value.
                        typeof value === 'string' ? value.split(',') : value,

                      );
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                  >
                    
                    {
                      likelihoodOption.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.label}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: "90%" }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Impact Type</span>
                  <Select
                    multiple
                    value={impact}
                    onChange={event => {
                      const value = event.target.value

                      setImpact(
                        // On autofill we get a stringified value.
                        typeof value === 'string' ? value.split(',') : value,

                      );
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                  >
                    
                    {
                      impactOption.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.label}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>


                <FormControl sx={{ m: 1, width: "90%" }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Rating</span>
                  <Select
                    multiple
                    value={rating}
                    onChange={event => {
                      const value = event.target.value
                      setRating(
                        // On autofill we get a stringified value.
                        typeof value === 'string' ? value.split(',') : value,

                      );
                    }}

                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                  >

                    {
                      riskOption.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.label}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: '90%', mt: 2, ml: 1.5 }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Notes</span>
                  <Grid item >
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      onChange={(e) => {
                        setNote(e.target.value)
                      }}
                      style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                      value={options.notes}
                      error={options.notesError}
                    // helperText={errors.description ? errors.description?.message : null}
                    />

                  </Grid>
                </FormControl>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                my={3}
                component="form"
              >
                <Grid item xs={7} justifyContent="space-around" display="flex">
                  <Button
                    disabled={false}
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={false} onClick={handleSubmit}>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        </Box>

      }
    </Box>

  );
}


