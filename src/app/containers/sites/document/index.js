import React, { useEffect, useState } from "react";
import {
  Box, Link, Button, Dialog, Skeleton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
// import { blue } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectSiteDocument } from "../../../../features/sites/sitesSlice";
import {
  getSiteDocument,
  siteDeleteDocument,
  siteSaveDocument,
} from "../../../../features/sites/sitesAPI";
import { TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import Image from 'material-ui-image';
import { useParams } from "react-router-dom"
import "./style.css";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { axiosInstance } from "../../../../utils/axiosSetup";
import { deleteAPI, getAPI, postAPI } from "../../../network";
import Loader from "../../../common/Loader";
import { checkAuthority, tableHeader, tableData, validation } from "../../../utils";

export default function SiteDocumentPage() {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false);
  const { siteId } = useParams();
  const dispatch = useDispatch();
  const [editId, setEditId] = useState('');
  // const { loading, error, data } = useSelector(selectSiteDocument);
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("");
  const [desc, setDesc] = useState("");
  const [docType, setDocType] = useState("");
  const [image, setImage] = useState("");
  const [documents, setDocuments] = useState([])
  const [loader, setLoader] = useState(false)
  const [sites, setSites] = useState([])

  const [view, setView] = useState(false);
  const [detail, setDetail] = useState({})



  const {
    // handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      docType: "",
      category: "",
      description: "",
      access: "",
      file: "",
    },
  });

  useEffect(() => {
    getSiteDocument()
    getSites()
  }, []);


  const viewGuide = (item) => {
    setDetail(item);
    setView(true)
  }

  const getSiteDocument = async () => {
    setLoader(true)
    let data = await getAPI(`/user/site-specific-induction?siteId=${siteId}`)
    if (data) {
      setDocuments(data)
    }
    setLoader(false)
  }

  const getSites = async () => {
    setLoader(true)
    let userType = localStorage.getItem('userType')
    let data = await getAPI(userType === 'admin' ? '/sites' : '/company/sites');
    if (data) {
      setSites(data)
    }
    setLoader(false)
  }

  const editGuide = (id) => {
    
    let document = documents.filter(item => item.id === id)[0];
    setCategory(document.category)
    setVisibility(document.visibility)
    setDesc(document.keyword)
    setDocType(document.title)
    setImage(document.document)
    setOpen(true)
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearAll()
    setOpen(false);

  };
  const handleShowClose = () => {
    clearAll()
    setShow(false);
  }
  const deleteCheckpoint = async (id) => {
    setEditId(id)
    setShow(true)

  };

  const handleDelete = async () => {

    setLoader(true);
    let process = await deleteAPI(`/user/site-specific-induction/${editId}`)
    if (process) {
      getSiteDocument()
      setShow(false)
      clearAll()
    }
    setLoader(false)
  }


  const onSave = async () => {

    if (validation(null, 'Category', category)) {

      return;
    }
    else if (validation(null, 'DocType', docType)) {

      return;
    }


    else if (validation(null, 'Description', desc)) {

      return;
    }
    else if (validation(null, 'Accessiblility', visibility)) {

      return;
    }


    else if (validation(null, 'Site', siteId)) {

      return;
    }


    var formData = new FormData();
    formData.append("category", category);
    formData.append("picture", image);
    formData.append("visibility", visibility);
    formData.append("title", docType);
    formData.append("keyword", desc);
    formData.append("siteId", siteId);



    setLoader(true)
    let data = await postAPI("user/site-specific-induction", formData)
    if (data) {
      getSiteDocument()
      handleClose()
      clearAll()
      return data;
    }
    setLoader(false)
    // let res = await axiosInstance.post("user/site-specific-induction", formData);
    // // dispatch(getSiteDocument({ siteId: siteId }));
    // setTimeout(() => {
    //   dispatch(getSiteDocument({ siteId: siteId }));

    // }, 10)

  };





  const onChangeImage = (event) => {
    event.preventDefault();
    const fileUpload = event.target.files[0];
    setImage(fileUpload);
  }

  const getSiteName = () => {
    if (sites.length > 0) {
      let site = sites.filter((item) => item._id === siteId)[0];
      return site.name + ', ' + site.address + ', ' + site.city?.name + ' / Site Documents'
    }
    else {
      return '';
    }
  }
  const clearAll = () => {
    setCategory('')
    setVisibility('')
    setDesc('')
    setDocType('')
    // setImage('')
  }

  const renderMedia =  (media, type, size = null) => {
   
    if(size === null){
        if(type.includes('image')){
            return <img src={media}  style={{height : 140}}/>;
            // return <img src="http://50.17.107.208:3004/uploads/picture-1663224658439.png"  style={{height : 140}}/>
        }
        else{
            return  <iframe
            id="video"
            width="200"
            heigh="200"
            src={media}
            frameBorder="0"
            allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        }
    }
    else{
        if(type.includes('image')){
            return <img src={media}  style={{width : '90%', height:"100%"}}/>;
            // return <img src="http://50.17.107.208:3004/uploads/picture-1663224658439.png"  style={{width : '100%'}}/>
        }
        else{
            return  <iframe
            id="video"
            width="1050" 
            height="500"
            // height={screen.availHeight}
            src={media}
            frameBorder="0"
            allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        }
    }
  }



  return (
    <Box sx={{ height: "inherit" }}>
      <Loader loader={loader} />
      <PageTitle title="Site View" subTitle={getSiteName()} />
      <Box display="flex" sx={{ my: "4rem" }}>
        {/* {error && <Alert severity="error">{error}</Alert>} */}
        {
          checkAuthority('VIEW_SITE_DOCUMENTS') &&
          <TableContainer component={Paper} sx={{ mx: "0.8rem" }} >
            <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
              <TableHead >
                <TableRow className="table-header">
                  <TableCell align="left" component="th" sx={tableHeader}>Category</TableCell>
                  <TableCell align="left" component="th" sx={tableHeader}>Document Type</TableCell>
                  <TableCell align="left" component="th" sx={tableHeader}>Description</TableCell>
                  <TableCell align="left" component="th" sx={tableHeader}>Upload File</TableCell>
                  <TableCell align="left" component="th" sx={tableHeader}>Accessible on App</TableCell>
                  <TableCell align="left" component="th" sx={tableHeader}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  documents.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" sx={tableData}>
                        
                          <div className="custom-table-cell" align="center">
                            <span className="add">{item.category}</span>
                            <RemoveCircleIcon className="add-icon" fontSize="medium" onClick={() => deleteCheckpoint(item.id)} />
                          </div>
                        
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item.title}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {item.keyword}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        <iframe
                          src={item.document}
                        />
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {/* <FormControl sx={{ m: 0, p : 0, width : "70%" }}>
                                    <Select
                                        value={selectedOption}
                                        onChange={changeOption}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        style={{borderRadius : 10, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderColor : "#707070", padding : "0px 10px", height : 40, backgroundColor : 'white'}}
                                        >
                                       
                                      
                                        {
                                            options.map((item, index) => (
                                                <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl> */}
                        {item.visibility ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="left" sx={{ textAlign: 'center', tableData }}>
                        <Button className="btn-div" variant="outlined" color="secondary" sx={{ mx: 1 }} onClick={(e) => viewGuide(item)}>
                          <VisibilityIcon className="btn" />
                        </Button>
                        <Button className="btn-div" variant="outlined" color="info" sx={{ mx: 1 }} onClick={(e) => editGuide(item?.id)}>
                          <EditIcon className="btn" />
                        </Button>
                        {
                          checkAuthority('DELETE_SITE_DOCUMENT') &&
                        <Button className="btn-div" variant="outlined" color="error" onClick={() =>  deleteCheckpoint(item?.id)}>
                          <DeleteIcon className="btn" />
                        </Button>
                        }
                      </TableCell>

                    </TableRow>
                  ))
                }
              </TableBody>
              {
                checkAuthority('ADD_SITE_DOCUMENT') &&
                <TableFooter>
                  <TableRow>
                    <TableCell sx={tableData} direction="column" justifyContent="center" onClick={handleClickOpen}>
                      <Link href="#" underline="none" >
                        <div className="custom-table-cell">
                          <span >Add Document</span>
                          <AddCircleIcon className="add-icon" fontSize="medium" />
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell align="left" sx={tableData}>
                    </TableCell>
                    <TableCell align="left" sx={tableData}>
                    </TableCell>
                    <TableCell align="left" sx={tableData}>
                    </TableCell>
                    <TableCell align="left" sx={tableData}>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              }

            </Table>
            {/* </div> */}
          </TableContainer>
        }
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Enter Details</DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              my={3}
              component="form"
            >

              <Grid item xs={9} justifyContent="center" display="flex">

                <TextField
                  fullWidth
                  select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  displayEmpty
                  labelId="category-label"
                  id="category"
                  label="Select Category"
                  error={errors.category}

                >

                  <MenuItem value={"HSW"}>HSW </MenuItem>
                  <MenuItem value={"Compliance"}>Compliance</MenuItem>
                  <MenuItem value={"Operational"}>Operational</MenuItem>
                  <MenuItem value={"General"}>General </MenuItem>
                  <MenuItem value={"Mandatory"}>Mandatory</MenuItem>
                  <MenuItem value={"Other"}>Other </MenuItem>
                </TextField>

              </Grid>
              <Grid item xs={9} justifyContent="center" display="flex">

                <TextField
                  type="text"
                  fullWidth
                  label="Document Type"
                  value={docType}
                  error={!!errors.description}
                  onChange={(e) => setDocType(e.target.value)}
                  placeholder="Document Type"
                  helperText={
                    errors.docType ? errors.docType?.message : null
                  }
                />

              </Grid>
              <Grid item xs={9} justifyContent="center" display="flex">

                <TextField
                  type="text"
                  fullWidth
                  label="Description"
                  value={desc}
                  error={!!errors.description}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description"
                  helperText={errors.description ? errors.description?.message : null}
                />

              </Grid>

              <Grid item xs={9} justifyContent="center" display="flex">

                <TextField
                  fullWidth
                  select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  displayEmpty
                  label="Accessible on APP"
                  error={errors.category}>

                  <MenuItem value={"true"}>Yes </MenuItem>
                  <MenuItem value={"false"}>No</MenuItem>

                </TextField>

              </Grid>
              <Grid item xs={9} justifyContent="center" display="flex">

                <label>Upload file</label>
                <div>
                  <Button>
                    <input name="file" type="file" onChange={onChangeImage} />
                  </Button>
                </div>

              </Grid>
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
                <Button onClick={() => onSave(category, visibility, image, docType, desc)}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>

        {/* delete Modal */}
        <Dialog open={show} onClose={handleShowClose} fullWidth={true}>
          <DialogTitle sx={{ mb: 4, textAlign: "center" }}>Delete Site Document</DialogTitle>

          <DialogContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { my: 2, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >

              <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Do you want's to delete this Document</h3>
            </Box>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 4 }}>
            <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
            <Button onClick={handleShowClose} variant="outlined">Cancel</Button>
          </DialogActions>
        </Dialog>


        <Dialog open={view} onClose={() => setView(false)} fullWidth={true} fullScreen={true}>
        <DialogTitle sx={{ mb: 4 , textAlign :"center" }}>Document Detail</DialogTitle>
        
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 2, width: '100%',height:'90% !important' },
            }}
            noValidate
            autoComplete="off"
          >
           {
            Object.keys(detail).length !== 0 &&
            <>
               <h3 style={{textAlign : 'left', fontWeight :'bold'}}>{detail.title}</h3>
               {detail?.document ? renderMedia(detail.document, detail.mediaType, 'full') : null}
            </>
           }
          </Box>
        </DialogContent>
        <DialogActions sx={{mb : 2 , mx : 4}}>
          <Button onClick={() => setView(false)} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>

      </Box>
    </Box>
  );
}


