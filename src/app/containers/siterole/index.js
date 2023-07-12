import React, {useEffect, useState} from "react";
import { Box, FormControl, Grid, Link,  FormLabel, Modal, Typography, Button} from "@mui/material";
import PageTitle from "../../common/PageTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Controller, useForm } from "react-hook-form";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { getAPI, postAPI , patchAPI, deleteAPI} from "../../network";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import BasicSelector from "../../common/Selector";

import { checkAuthority, formatDate, validation,tableHeader,tableData,tablebtn} from "../../utils";
import Loader from "../../common/Loader";
import EmptyTable from "../../common/EmptyTable";
import { Security } from "@material-ui/icons";

export default function Company() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState('');
  const [code, setCode] = useState('')
  const [typeError,setTypeError]=useState(false);
  const [editId, setEditId] = useState('');
  const [action, setAction] = useState('');
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({
    name :'',
    nameError : false,
  })

  const [page, setPage] = useState(0)
  const [perPages, setPerPages] = useState([5,10,25,50]);
  const [perPage, setPerPage] = useState(10)

  useEffect(() => {
    getRoles();
  },[]);

  const getRoles = async () => {
    setLoader(true)
    let data = await getAPI('/roles');
    if(data) {
        setRoles(data)
    }
    setLoader(false)
  }
  
  



 

  const editlicense = (e, id) => {
    e.preventDefault();
    setEditId(id)
    clearAll();
    let data = roles.filter(item => item.id === id)[0];
    console.log("DATA:::::::::::;",data)
    setRole(prevState => ({
        ...prevState,
        name : data?.name,
        nameError : false,
    }))

    // console.log(person)

    // getCities(data.country)
    setAction('edit');
    setOpen(true)
   
  }

  const deleteCompany = (id) => {
  
    setEditId(id);
    clearAll();
    setShow(true);
  }

  const clearAll = () => {
    setRole({
        name :'',
        nameError : false,
      })
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleShowClose = () => {
    setShow(false);
  }
  const addLicense = (e) => {
    e.preventDefault();
    setAction('add');
    clearAll();
    setOpen(true)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setRole(prevState => ({
        ...prevState,
        nameError: false,
        
    }))

    if(validation(null, 'Name', role.name)){
      setRole(prevState => ({
            ...prevState,
            nameError: true,
        }))
        return;
    }
   
    


    let payload = {
        name : role.name,
    }


    if(action === 'add'){
       setLoader(true)
       let data = await postAPI('/roles', payload)
      //  console.log(data,"data")
       if(data){
        getRoles()
        setOpen(false)
       }
       setLoader(false)
    }
    else{
        setLoader(true)
        let data = await patchAPI(`/roles/${editId}`, payload)
        if(data){
          getRoles()
         setOpen(false)
        }
        setLoader(false)
     }
  }

  const handleDelete = async() => {
    setLoader(true);
    let process = await deleteAPI(`/getlicense/${editId}`);
    setLoader(false);
    if(process){
      getRoles()
      setShow(false)
    }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

 
  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value)
    setPerPage(event.target.value)
    setPage(0);
  };


  return (
    <Box sx={{ height: "inherit" }}>
      <Loader loader={loader} />
      <PageTitle title="Secuber" subTitle="Roles" />
      {
        checkAuthority('ADD_ROLE')  &&
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{mx : 2}}
        >
            <Button variant="contained" style={{backgroundColor : "grey"}} sx={{ height: 50 }} onClick={addLicense}>
              <AddCircleIcon /> &nbsp; &nbsp;
            Add Role
            </Button>
        </Box> 
      }
      {
        checkAuthority('VIEW_ROLE') &&
        <Box display="flex" sx={{ my: "2rem" }}>
        <TableContainer component={Paper} sx={{ mx: "0.8rem" }}>
          <Table
            sx={{ minWidth: "auto" }}
            aria-label="custom pagination table"
            className="responsive-table"
          >
            <TableHead>
              <TableRow className="table-header" align="center">
                <TableCell align="left" component="th" sx={tableHeader}>
                  Role Name
                </TableCell>
                
                <TableCell align="center" component="th" sx={tableHeader} style={{width:'25rem'}} >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.slice(page * perPage, page * perPage + perPage).map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="left" sx={tableData}>
                    <Link to="#" underline="none" className="link-hover">
                     {item.name}
                    </Link>
                  </TableCell>
                  
      
                  <TableCell align="center" sx={tablebtn}>
                    {
                      checkAuthority('EDIT_ROLE') &&
                      <Button variant="outlined" className="btn-div" color="info" sx={{mx : 1}} onClick={(e) => editlicense(e,item?.id)}>
                        <EditIcon className="btn"/>
                      </Button>
                    }
                    {
                      checkAuthority('DELETE_ROLE') &&
                      <Button variant="outlined"  className="btn-div" color="error" onClick={() => deleteCompany(item?.id)}>
                        <DeleteIcon className="btn"/>
                      </Button>
                    }
                  </TableCell>
                  
                </TableRow>
              ))}
              {
                roles.length === 0 &&
                <EmptyTable colSpan={7} />
              }


            </TableBody>
            <TableFooter>
              <TableRow>
             
                <TablePagination
                    align="right"
                    rowsPerPageOptions={perPages}
                    colSpan={9}
                    count={roles.length}
                    rowsPerPage={perPage}
                    page={page}
                    SelectProps={{  
                        inputProps: {  
                        'aria-label': 'rows per page',
                        },
                        native: true, 
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    // ActionsComponent={TablePaginationActions}
                      />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      }
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle sx={{ mb: 4 , textAlign :"center" }}>{action === 'add' ? 'Add' : 'Edit'} Name</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 2, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
        

          <FormControl sx={{  minWidth : '100%', mx : 0, px :0 }}>
            <TextField 
              id="name" 
              label="Name" 
              variant="outlined" 
              type="text" 
              value={role.name}
              error={role.nameError}
              onChange={(data) => {
                setRole(prevState => ({
                    ...prevState,
                    name: data.target.value,
                }))
              }}
              fullWidth
              sx={{m : 0}}
            />
          </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{mb : 2 , mx : 4}}>
          <Button onClick={handleSubmit} variant="contained">{action === 'add' ? 'Submit' : 'Update'}</Button>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>


      {/* delete Modal */}
      <Dialog open={show} onClose={handleShowClose} fullWidth={true}>
        <DialogTitle sx={{ mb: 4 , textAlign :"center" }}>Delete License</DialogTitle>
        
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 2, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >

            <h3 style={{textAlign : 'left', fontWeight :'bold'}}>Do you want's to delete this license </h3>
          </Box>
        </DialogContent>
        <DialogActions sx={{mb : 2 , mx : 4}}>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
          <Button onClick={handleShowClose} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
