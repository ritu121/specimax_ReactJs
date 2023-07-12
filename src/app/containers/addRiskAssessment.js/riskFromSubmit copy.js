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
import { selectSiteInspection } from "../../../features/sites/sitesSlice";
import Select from 'react-select';
import MenuItem from '@mui/material/MenuItem';

import { Controller, useForm } from "react-hook-form";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { red } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { getAPI, postAPI } from "../../network";
import Loader from "../../common/Loader";
import { checkAuthority, tableHeader, tableData, formatDate, fullName, tablebtn } from "../../utils";
// import "./index.css";


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
  const [categoryId, setCategoryId] = useState('');
  const [question, setQuestion] = useState('');
  const [catId, setCatId] = useState('')
  const [subCatId, setSubcatId] = useState('')
  const [riskInherentId, setRiskInerentId] = useState('')
  const [likelihoodId, setLikehoodId] = useState('')
  const [impactId, setimpactId] = useState('')
  const [categoryOptions, setCategoryOptions] = useState([])
  const [subCatOptions, setSubCatOptions] = useState([])
  const [likelihoodOption, setLikelihoodOption] = useState([])
  const [impactOption, setImpactOption] = useState([])
  const [inherentIption, setInherentIption] = useState([])
  const [questionError, setQuestionError] = useState(false)
  const [assessName, setAssessName] = useState('')
  const [options, setOptions] = useState({
    category: [],
    subcategory: [],
    riskInherent: [],
    likelihood: [],
    impact: [],
    riskRating: '',
    notes: '',
    categoryError: false,
    subcategoryError: false,
    riskIdentifiedError: false,
    likelihoodError: false,
    impactError: false,
    riskRatingError: false
  })

  const ratings = [
    { label: 'HIGH', value: "High" },
    { label: 'LOW', value: "Low" },
    { label: 'MEDIUM', value: "Medium" },
  ]

  useEffect(() => {

    getAssessmentCategory()
    getCategoryQuestions()
    getCategoryOtion()
    getCatoptions()
    getSubCatoptions()
    getlikeoptions()
    getImpactoptions()
    getInherentoptions()
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

    var Cat = options.category.map((item) => {
      return item.value
    });
    var SubCat = options.subcategory.map((item) => {
      return item.value
    });
    var riskIn = options.riskInherent.map((item) => {
      return item.value
    });
    var impact = options.impact.map((item) => {
      return item.value
    });
    var likeli = options.likelihood.map((item) => {
      return item.value
    });

    const payload = {
      'riskAssessmentCategoryId': ids,
      'question': question,
      'choices': [
        {
          'choiceId': catId,
          'options': Cat
        },
        {
          'choiceId': subCatId,
          'options': SubCat
        },
        {
          'choiceId': riskInherentId,
          'options': riskIn
        },
        {
          'choiceId': impactId,
          'options': impact
        },
        {
          'choiceId': likelihoodId,
          'options': likeli
        }
      ]
    }
    console.log("PAYLOAD_______", payload)

    setLoader(true)
    let data = await postAPI(`/risk-assessment/category-question`, payload)
    // console.log("data post-----------///////", data)
    if (data) {
      handleClose();
      getCategoryQuestions()

    }
    setLoader(false)

  };


  const clearAll = () => {
    setOptions({
      category: [],
      subcategory: [],
      riskInherent: [],
      likelihood: [],
      impact: [],
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
      for (let i = 0; i <= data.length; i++) {
        if (data[i].id == "640881950cad11228cffcbb9") {

          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setCategoryOptions(outputs)
          setCatId('640881950cad11228cffcbb9')
        }
      }
    }
    setLoader(false)

  }
  const getSubCatoptions = async () => {
    setLoader(true)

    let data = await getAPI(`/risk-assessment-question-choice`)
    if (data) {
      for (let i = 0; i <= data.length; i++) {

        if (data[i].id == "6409c1f94cd9a6340cab18a1") {

          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setSubCatOptions(outputs)
          setSubcatId("6409c1f94cd9a6340cab18a1")
        }
      }
    }
    setLoader(false)

  }
  const getlikeoptions = async () => {
    setLoader(true)

    let data = await getAPI(`/risk-assessment-question-choice`)
    if (data) {
      for (let i = 0; i <= data.length; i++) {
        if (data[i].id == "640af24a4cd9a6340cab23f3") {
          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setLikelihoodOption(outputs)
          setLikehoodId("640af24a4cd9a6340cab23f3")
        }
      }
    }
    setLoader(false)
  }


  const getImpactoptions = async () => {
    setLoader(true)

    let data = await getAPI(`/risk-assessment-question-choice`)
    if (data) {

      for (let i = 0; i <= data.length; i++) {
        if (data[i].id == "640af2214cd9a6340cab23ea") {
          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setImpactOption(outputs)
          setimpactId("640af2214cd9a6340cab23ea")
        }
      }
    }
    setLoader(false)
  }


  const getInherentoptions = async () => {
    setLoader(true)
    let data = await getAPI(`/risk-assessment-question-choice`)
    if (data) {
      for (let i = 0; i <= data.length; i++) {
        if (data[i].id == "64088d21bf3520097071d9b5") {
          let outputs = data[i].options.map((item) => ({
            id: item._id,
            label: item.name,
            value: item._id

          }))
          setInherentIption(outputs)
          setRiskInerentId("64088d21bf3520097071d9b5")
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



  // const handleNavigateForm = (id, repId, inspId) => {
  //   console.log("-----------------------------------------", id, repId.inspId)
  //   navigate(`${window.location.pathname}/form/${id}/${repId}/${inspId}`);
  // }

  return (


    <Box sx={{ height: "inherit" }}>


      <Loader loader={loader} />
      <PageTitle title="Risk Assessment Forms" subTitle={assessName} />
      {
        checkAuthority('ADD_ASSESSMENT_FORM') &&
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
                  <TableCell align="center" component="th" sx={tableHeader}>Edit</TableCell>
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
                        {item?.choices.map((data, i = 0) => (
                          <>
                            {data?.choiceId.name == "Category" &&

                              <FormControl sx={{ m: 1, width: "90%" }}>
                                <Select
                                  // value={props.selectedItem}
                                  // onChange={props.changeItem}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                                >
                                  <MenuItem value="">
                                    <div className="selectitem">{Select}</div>
                                  </MenuItem>
                                  {
                                    data.options.map((item, index) => (
                                      <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                    ))
                                  }
                                </Select>
                              </FormControl>
                            }
                          </>
                        ))}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item?.choices.map((data, i = 0) => (
                          <>
                            {data?.choiceId.name == "Subcategory" &&
                              data?.options.map((item, i) => (
                                <span style={{ border: "1px solid gray", padding: "2px", margin: "2px" }}>{item?.name}</span>
                              ))
                            }
                          </>
                        ))}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item?.choices.map((data, i = 0) => (
                          <>
                            {data?.choiceId.name == "Inherent Risk" &&
                              data?.options.map((item, i) => (
                                <span style={{ border: "1px solid gray", padding: "2px", margin: "2px" }}>{item?.name}</span>
                              ))
                            }
                          </>
                        ))}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item?.choices.map((data, i = 0) => (
                          <>
                            {data?.choiceId.name == "Impact Type" &&
                              data?.options.map((item, i) => (
                                <span style={{ border: "1px solid gray", padding: "2px", margin: "2px" }}>{item?.name}</span>
                              ))
                            }
                          </>
                        ))}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item?.choices.map((data, i = 0) => (
                          <>
                            {data?.choiceId.name == "Likelihood" &&
                              data?.options.map((item, i) => (
                                <span style={{ border: "1px solid gray", padding: "2px", margin: "2px" }}>{item?.name}</span>
                              ))
                            }
                          </>
                        ))}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item?.rating}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item?.note}
                      </TableCell>
                      <TableCell align="center" sx={tablebtn}>

                        <Button variant="outlined" className="btn-div" color="info" sx={{ mx: 1 }} onClick={(e) => editCat(e, item?.id)}>
                          <EditIcon className="btn" />
                        </Button>

                        {/* <Button variant="outlined" className="btn-div" color="error" onClick={() => deleteCat(item?.id)}>
                        <DeleteIcon className="btn" />
                      </Button> */}

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
                <FormControl sx={{ minWidth: '97%', mt: 2 }}>

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
                    sx={{ borderColor: red[100] }}
                    error={questionError}

                  />
                </FormControl>
                <FormControl sx={{ minWidth: '97%', mt: 2 }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Risk Category</span>
                  <Grid item  >
                    <Select
                      onChange={(data) => {
                        setOptions(prevState => ({
                          ...prevState,
                          category: data,
                        }))
                      }}
                      isMulti
                      value={options.category}
                      error={options.categoryError}
                      name="RiskCategory"
                      className="basic-multi-select multiselect"
                      classNamePrefix="select"
                      options={categoryOptions}

                    />

                  </Grid>
                </FormControl>



                <FormControl sx={{ minWidth: '97%', mt: 2 }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Risk Sub-Category</span>
                  <Grid item >


                    <Select
                      onChange={(data) => {
                        setOptions(prevState => ({
                          ...prevState,
                          subcategory: data,
                        }))
                      }}
                      isMulti
                      value={options.subcategory}
                      error={options.subcategoryError}
                      name="RiskCategory"
                      className="basic-multi-select multiselect"
                      classNamePrefix="select"
                      options={subCatOptions}

                    />

                  </Grid>
                </FormControl>


                <FormControl sx={{ minWidth: '97%', mt: 5 }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Inherent Risk</span>
                  <Grid item  >

                    {/* <div className="zindex"> */}
                    <Select
                      onChange={(data) => {
                        setOptions(prevState => ({
                          ...prevState,
                          riskInherent: data,
                        }))
                      }}
                      isMulti
                      value={options.riskInherent}
                      error={options.riskInherentError}
                      name="InerentCategory"
                      className="basic-multi-select multiselect"
                      classNamePrefix="select"
                      options={inherentIption}
                    />

                    {/* </div> */}
                  </Grid>
                </FormControl>



                <FormControl sx={{ minWidth: '97%', mt: 5 }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Likelihood</span>
                  <Grid item >

                    {/* <div className="zindex"> */}

                    <Select
                      onChange={(data) => {
                        setOptions(prevState => ({
                          ...prevState,
                          likelihood: data,
                        }))
                      }}
                      isMulti
                      value={options.likelihood}
                      error={options.likelihoodError}
                      name="InerentCategory"
                      className="basic-multi-select multiselect"
                      classNamePrefix="select"
                      options={likelihoodOption}

                    />
                    {/* </div> */}
                  </Grid>
                </FormControl>

                <FormControl sx={{ minWidth: '97%', mt: 5 }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Impact Type</span>
                  <Grid item >

                    {/* <div className="zindex"> */}
                    <Select
                      onChange={(data) => {
                        setOptions(prevState => ({
                          ...prevState,
                          impact: data,
                        }))
                      }}
                      isMulti
                      value={options.impact}
                      error={options.impactError}
                      name="InerentCategory"
                      className="basic-multi-select multiselect"
                      classNamePrefix="select"
                      options={impactOption}
                    />
                    {/* </div> */}
                  </Grid>
                </FormControl>

                {/* <FormControl sx={{  minWidth : '97%', mt :5 }}>
        
             <span style={{fontWeight : 'bold', fontSize : 16, marginBottom : 5}}>Rating</span>
             <Select
                onChange={(data) => {
                  setOptions(prevState => ({
                        ...prevState,
                        riskRating: data,
                    }))
                 
                }}
                value={options.riskRating}
                error={options.riskRatingError}
                name="InerentCategory"
                className="basic-multi-select"
                classNamePrefix="select"
                options={ratings}
              />
              
          </FormControl> */}

                <FormControl sx={{ minWidth: '97%', mt: 2 }}>
                  <span style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Notes</span>
                  <Grid item >
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      onChange={(e) => {
                        setOptions({
                          ...options,
                          notes: e.target.value
                        })
                      }}
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


