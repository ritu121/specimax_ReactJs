import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Skeleton,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import TableContainer from "@mui/material/TableContainer";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { TextField, FormControl, } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { red } from "@mui/material/colors";
import { useNavigate, useLocation } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import "./style.css";
import Loader from "../../../common/Loader";
import { getAPI, postAPI } from "../../../network";
import { validation } from "../../../utils";
const useStyles = makeStyles(() => ({

  buttoRoot: {
    width: "85px !important",
    borderColor: "#707070 !important;",
    color: "#202E43 !important;",
    borderRadius: "8px !important;",
    fontSize: "18px  !important;",
    textTransform: "none !important;",
    padding: "2px 2px !important;",
    marginRight: "15px !important;",
    "&:hover": {
      backgroundColor: " #42505C !important;",
      color: "white !important",
    },
  },

}));





export default function SiteFormPage() {
  const navigate = useNavigate();
  // const { loading, error, data } = useSelector(selectSiteInspectionForm);
  const { siteId, repId, inspId } = useParams();
  const [loader, setLoader] = useState(false)
  const [forms, setForms] = useState([])
  const [option, setOptions] = useState([{
    answer: '',
    comment: ''
  }]);
  const [answer, setAnswer] = useState('');
  const [comments, setComments] = useState('');
  const [media, setmedia] = useState('');
  const [question, setQuestionId] = useState('');

  const [response, setResponse]=useState([]);


  const toastObj = { position: toast.POSITION.TOP_RIGHT };
  // console.log("ReportTypeId",inspId)





  const classes = useStyles();


  const onSubmit = async () => {
    
    if(answer && comments && question){
      alert("Please save the answer before proceed to next")
     }
     else if ( validation('array', 'Answer', response)) {
      console.log("::::::::::::empty fields:::::::::::::::::::")
      return;
     }
     if(answer && comments && question){
      alert("Please save the answer before proceed to next")
     }else{
      const payload = {
        'reportTypeId': repId,
        'siteId': siteId,
        'questions': response
      }
      setLoader(true)
      let data = await postAPI(`/reports`, payload)
      if (data) {
        getSitesInspectionForm()
      }
     }
      
    
      
      // setLoader(false)
      // dispatch(addQuestions({ ...form, reportType: siteId }));
      // handleClose();
      // dispatch(getSitesInspectionForm({ reportType: siteId }));
      // reset();
    
    
   
  };

  useEffect(() => {
    getSitesInspectionForm()
    getReport()

  }, []);

  const getReport = async () => {
    setLoader(true)
    const data = await getAPI('/report-questions');
    if (data) {
    }

    setLoader(false)
  }

  const getSitesInspectionForm = async () => {
    setLoader(true)
    let data = await getAPI(`/report-questions?inspectionId=${inspId}`)
    if (data) {
      setForms(data)
    }
    setLoader(false)
  }
  const changeOption = () => {
   
    if(answer && comments && question){
       alert("Please save the answer before proceed to next")
    }

  }



  const OnSave = () => {
    //  setAnswer(current=>[...current,{option}])
    if ( validation('empty', 'Answer', answer)) {
      return;
     }
     
    response.push({ questionId:question,  answer:answer,  comment: comments , media:media})
    if (response.length>0){
      toast.success('Response Save Successfully',toastObj);
    }
    setComments('')
    setQuestionId('')
    setAnswer('')
    setmedia('')
    
    // setOptions([{}])
  }



  console.log(response, "::::::::::::::::::::::response")


  return (
    <Box sx={{ height: "inherit" }}>
      <Loader loader={loader} />
      <PageTitle
        title="Site View"
        subTitle="Submit Form"
        headerTitle="Site Inspection"
      />
      {
        forms.length>0 ?(
          <Box
          Box
          display="flex"
          ml={4}
          flexDirection="column"
          rowGap={10}
          mb="20%"
        >
  
          <div>
            {
              forms.map((item, index) => (
                <Paper elevation={3} p={3} mt={2}>
                  <Box p={3}>
                    <Typography
                      sx={{ mt: 1, mb: 2 }}
                      component="div"
                    >{item.question}
                    </Typography>
                    <div sx={{ display: 'flex' }}>
                      <FormControl sx={{ minWidth: '20%' }}>
                        <InputLabel id="label">Select Answer</InputLabel>
                        <Select
                          id='answer'
                          labelId="label"
                          label="Select Answer"
                          // value={props.selectedItem}
                          onChange={(e) => {
                            changeOption()
                            setAnswer(e.target.value)
                            setQuestionId(item.id)
                          }}
                          inputProps={{ 'aria-label': 'Without label' }}
                          style={{ borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor: "#707070" }}
                        >
                          <MenuItem value='YES'><div>Yes</div></MenuItem>
                          <MenuItem value='NO'><div>No</div></MenuItem>
                          <MenuItem value='NA'><div>NA</div></MenuItem>
                        </Select>
                      </FormControl>
                      <TextareaAutosize
                        maxRows={100}
                        aria-label="Comment"
                        placeholder="Comment"
                        minRows={5}
                        // defaultValue={shift.key}
                        onChange={(event) => {
                          setComments(event.target.value)
                        }}
                        style={{ width: '20%',marginRight:10, marginLeft: 20, fontSize: 16, padding: 10, fontFamily: "Poppins,Helvetica,Arial" }}
                        // error={shift.keyError}
                        fullWidth
                      />
                     <TextField
                          name="upload-photo"
                          type="file"
                          onChange={(event) => {
                            setmedia(event.target.value)
                          }}
                        />
                      <Button variant="contained" style={{margin:'20px'}} onClick={OnSave}>Save</Button>
                    </div>
  
  
                  </Box>
                </Paper>
              ))
            }
  
  
  
  
            <FormControl
              sx={{
                my: 1,
                minWidth: "100%",
                display: "flex !important",
                columnGap: "20px",
                flexDirection: "row !important",
                flexWrap: "wrap !important",
                justifyContent: "center",
              }}
            >
              <Button variant="outlined" className={classes.buttoRoot} onClick={onSubmit} >
                Submit
              </Button>
  
              <Button variant="outlined" className={classes.buttoRoot} onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </FormControl>
          </div>
  
        </Box>
        ):(
         <div style={{textAlign:'center'}}> <h3>No Questions Added</h3></div>
        )
      }
     
    </Box>
  );
}
