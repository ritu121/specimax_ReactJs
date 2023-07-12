import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Skeleton,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { red } from "@mui/material/colors";
import PageTitle from "../../common/PageTitle";
import { tableHeader, tableData } from "../../utils";
import { selectSiteCheckpoints } from "../../../features/sites/sitesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addCheckpoints,
  getSiteCheckpoints,
  deleteCheckpoint
} from "../../../features/sites/sitesAPI";
import { Controller, useForm } from "react-hook-form";
import { deleteAPI, getAPI, postAPI } from "../../network";
import Loader from "../../common/Loader";
import images from '../../../assets/images/logo.png'

import QRCode from 'qrcode';



function SiteSettingsPage() {
  const [checkpoints, setCheckpoints] = useState([])
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch();
  const { siteId } = useParams();
  const [siteName, setSiteName] = useState('')
  const [open, setOpen] = React.useState(false);
  const userType = localStorage.getItem('userType')
  const [sites, setSites] = useState([])
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');


  useEffect(() => {
    getCheckpoints()
  }, [])

  const getCheckpoints = async () => {
    setLoader(true);
    let data = await getAPI(`/checkpoints?siteId=${siteId}`)

    if (data) {
      setCheckpoints(data);
    }
    setLoader(false)
  }


  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      latitude: "",
      longitude: "",
      siteId: siteId
    },
  });
  // console.log( name,"handle")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleShowClose = () => {
    setShow(false);
  }

  const onSubmit = async (form) => {

    setLoader(true)

    let data = await postAPI('/checkpoints', form)

    if (data) {
      handleClose();
      getCheckpoints()
      reset();
    }
    setLoader(false)
  };
  const deleteCheckpoints = async (id) => {
    setEditId(id)
    setShow(true)

  };

  const handleDelete = async () => {

    setLoader(true);
    let process = await deleteAPI(`/checkpoints/${editId}`)
    setLoader(false);
    if (process) {
      getCheckpoints();
      setShow(false)
    }
  }
  const generateQR = async (id) => {
    
    let dataUrl = await QRCode.toDataURL(id._id)

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1012;
    const ctx = canvas.getContext('2d');

    // Load the image and draw it on the canvas
    const image = new Image();
    image.onload = () => {
      // Calculate the aspect ratio of the image
      const aspectRatio = image.width / image.height;

      // Calculate the new dimensions of the image
      // let width = MAX_SIZE / 2;
      // let height = width / aspectRatio;
      // if (height > MAX_SIZE / 2) {
      //   height = MAX_SIZE / 2;
      //   width = height * aspectRatio;
      // }
      let width=180
      let height=180

      // Calculate the position of the image to center it on the canvas
      const ix = (width+150) / 2;
      const iy = (height+150) / 2; // updated y value to add margin bottom

      // Draw the resized image on the canvas
      ctx.drawImage(image, ix, iy, width, height);
      // Load the QR code image and draw it on the canvas
      const img = new Image();
      img.onload = () => {
        const x = (canvas.width - img.width) /2;
        const y = (canvas.height - img.height + 80)/2;
        ctx.drawImage(img, x, y);
        // Add the text to the canvas
        const text1 = `QR Code for ${id.name}`;
        const text2 = `Site Name :- ${getSiteName()}`;
        ctx.font = 'bold 25px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(text1, canvas.width / 2, y + img.height + 40);
        const text1Width = ctx.measureText(text1).width;
        ctx.fillText(text2, canvas.width / 2, y + img.height + 80, text1Width);


        // Convert the canvas to a PNG image and download it
        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `${id.name}_QR.png`;
        a.click();
      };
      img.src = dataUrl;
    };
    image.src = images;
  }

  useEffect(() => {
    dispatch(getSiteCheckpoints({ id: siteId }));
    getSite()
  }, []);

  const getSite = async () => {
    let url = userType === 'admin' ? '/sites' : '/company/sites';
    let data = await getAPI(url);
    if (data) {
      setSites(data)
    }
  }


  const getSiteName = () => {
    if (sites.length > 0) {
      let site = sites.filter((item) => item._id === siteId)[0];
      // setSiteName(site.name)
      return site.name + ', ' + site.address + ', ' + site.city?.name;

    }
    else {
      return '';
    }
  }

  return (
    <Box>
      <Loader loader={loader} />

      <PageTitle title="Sites View" subTitle={getSiteName()} />
      <Box display="flex" ml={2} flexDirection="column" rowGap={10} mb="20%">

        <Grid container justifyContent="center">
          <Grid item md={10}>
            <TableContainer component={Paper}>
              <Table
                aria-label="custom pagination table"
                className="responsive-table"
              >
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell
                      align="left"
                      component="th"
                      sx={tableHeader}
                      style={{ width: "65%" }}
                    >
                      Floor Number / Checkpoint
                    </TableCell>
                    <TableCell align="left" component="th" sx={tableHeader}>
                      Floor QR Code
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {console.log(siteId, "SITE++++++++++++++++++++++++++++++")}
                  {checkpoints.map((Checkpoint) => (
                    <TableRow key={Checkpoint.id}>
                      <TableCell
                        align="left"
                        sx={tableData}
                      >
                        {Checkpoint.name}
                        <span style={{ float: "right" }}>

                          <RemoveCircleIcon onClick={() => deleteCheckpoints(Checkpoint._id)} style={{ fontSize: '1rem' }} />

                        </span>
                      </TableCell>
                      <TableCell
                        align="left"

                        sx={tableData}
                        onClick={() => { generateQR(Checkpoint) }}
                      >
                        Download QR Code
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow key="last">
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: '1.2rem !important',
                        fontWeight: 500,
                        color: '#8593A8',
                        px: 3

                      }}

                    >
                      Add Floor
                      <span style={{ float: "right" }}>
                        <AddCircleIcon onClick={handleClickOpen} style={{ color: '#45445F', fontSize: '1rem' }} />
                      </span>

                    </TableCell>
                    <TableCell
                      align="left"
                      sx={tableData}
                    >

                      {/* Add QR Code Number */}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle align="center">Add Checkpoint</DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={2}
              mt={3}
              component="form"
            >
              <Grid item xs={12} display="flex">

                <Controller
                  name={"name"}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      type="text"
                      required
                      onChange={onChange}
                      value={value}
                      sx={{ borderColor: red[100] }}
                      error={!!errors.name}
                      helperText={errors.name ? errors.name?.message : null}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} display="flex">
                <Controller
                  name="latitude"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Latitude"
                      id="latitude"
                      variant="outlined"
                      name="latitude"
                      required
                      onChange={onChange}
                      value={value}
                      error={!!errors.latitude}
                      helperText={
                        errors.latitude ? errors.latitude?.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} display="flex">
                <Controller
                  name="longitude"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Longitude"
                      id="longitude"
                      variant="outlined"
                      name="longitude"
                      required
                      onChange={onChange}
                      value={value}
                      error={!!errors.longitude}
                      helperText={
                        errors.longitude ? errors.longitude?.message : null
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid
              container
              spacing={2}
              component="form"
              mx={2}
              mb={2}
            >
              <Grid item xs={12} justifyContent="flex-end" display="flex">

                <Button disabled={false} onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                  Submit
                </Button>&nbsp;&nbsp;
                <Button
                  disabled={false}
                  onClick={handleClose}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>

        {/* delete Modal */}
        <Dialog open={show} onClose={handleShowClose} fullWidth={true}>
          <DialogTitle sx={{ mb: 4, textAlign: "center" }}>Delete Checkpoint</DialogTitle>

          <DialogContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { my: 2, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >

              <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Do you want's to delete this checkpoint/floor</h3>
            </Box>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 4 }}>
            <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
            <Button onClick={handleShowClose} variant="outlined">Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default SiteSettingsPage;
