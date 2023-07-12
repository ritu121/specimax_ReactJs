/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Grid,
  FormControl,
  Skeleton,
  Button,
  Alert
} from "@mui/material";
import { Link } from "react-router-dom";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BasicSelector from "../../common/Selector";
import TableFooter from "@mui/material/TableFooter";
import LocalDateSelector from "../../common/LocalDateSelector";
import PageTitle from "../../common/PageTitle";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader"
import { deleteAPI, getAPI } from "../../network";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CompanyContext } from "../../../context";
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlaceIcon from '@mui/icons-material/Place';
import EmptyTable from "../../common/EmptyTable";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthority, tableHeader, tableData, formatDate, timeFormat, formatDatePost } from "../../utils";
import "./style.css";
import { FilterList } from "@mui/icons-material";
import { getCompanies } from "../../../features/company/companyAPI";



export default function VisitorList() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [companyId] = useContext(CompanyContext)
  const [deleteId, setDeleteId] = useState('');
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [tasks, setTasks] = useState([])
  const [sites, setSites] = useState([])
  const [companies, setCompanies] = useState([])

  const [page, setPage] = useState(0);
  const [perPages, setPerPages] = useState([5, 10, 25, 50]);
  const [perPage, setPerPage] = useState(10)

  const [filter, setFilter] = useState({
    companyId: '',
    siteId: '',
    startDate: null,
    endDate: null
  })
  const taskData = []
  for (let j = 0; j < tasks.length; j++) {
    taskData.push(tasks[j].tasks)
  }


  const taskD = []
  for (let i = 0; i < taskData.length; i++) {
    taskD.push(taskData[i][0])
  }

  useEffect(() => {
    getTasks()
    getSites()
    getCompanies()
  }, []);

  const userType = localStorage.getItem('userType')


  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value)
    setPerPage(event.target.value)
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  // {console.log( checkAuthority('ADD_TASK') ? 'TRUE ---------' : "FALSE --------")}
  const getTasks = async (sId = null, sDate = null, eDate = null) => {

    sId = sId !== null ? sId : filter.siteId;
    eDate = eDate !== null ? eDate : filter.endDate;
    sDate = sDate !== null ? sDate : filter.startDate;

    var url = ''
    var start = true;
    if (sId !== '' && sId !== null) {
      url += (start ? '?' : '&') + `siteId=${sId}`
      start = false;
    }
    if (eDate !== '' && eDate !== null) {
      url += (start ? '?' : '&') + `taskDate=${formatDatePost(eDate)}`
      start = false;
    }
    if (sDate !== '' && sDate !== null) {
      url += (start ? '?' : '&') + `startDate=${formatDatePost(sDate)}`
      start = false;
    }
    setLoader(true)

    let data = await getAPI('/visitor-tasks' + url)
    if (data) {
      setTasks(data)
    }
    setLoader(false)
  }

  const getSites = async () => {
    setLoader(true)
    let data = await getAPI('/sites')
    if (data) {
      var arr = []
      for (var i = 0; i < data.length; i++) {
        var obj = data[i]
        obj['label'] = obj.name
        obj['value'] = obj._id
        arr.push(obj)
      }
      setSites(arr)
    }
    setLoader(false)
  }

  const getCompanies = async () => {
    setLoader(true)
    const data = await getAPI('/companies');
    if (data) {
      var arr = []
      for (var i = 0; i < data.length; i++) {
        var obj = data[i]
        obj['label'] = obj.name
        obj['value'] = obj._id
        arr.push(obj)
      }
      setCompanies(arr)
    }
    setLoader(false)
  }

  const deleteClick = (id) => {
    setDeleteId(id);
    setOpen(true)
  }

  const handleDelete = async (siteId = null) => {

    setLoader(true);
    let empty = await deleteAPI(`/tasks/${deleteId}`);
    if (empty) {
      setOpen(false);
      getTasks()

    }
    setLoader(false);
  }

  return (
    <Box>
      <Loader loader={loader} />
      <PageTitle title="Visitor Management" />
      
      <Box ml={5}>
        <FormControl
          sx={{
            width: "100%",
          }}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ width: "100%" }}
          >
            <div><b>Current Date Visitor Overview</b></div>
            
           
          </Box>
          <Grid sx={{ my: "1rem", justifyContent: 'space-around', alignItems: 'center' }} container spacing={3} width={"100%"}>

            <Grid sx={{ padding: '10px !important', m: '10',fontWeight:'500', borderRadius: '5px !important', boxShadow: ' 0px 2px 4px 3px rgba(0, 0, 0, 0.08)' }}>
             <PeopleAltIcon/> 71 Total Visitors
            </Grid>
            <Grid sx={{ padding: '10px !important', m: '10',fontWeight:'500', borderRadius: '5px !important', boxShadow: '0px 2px 4px 3px rgba(0, 0, 0, 0.08)' }}>
            <PeopleAltIcon/> 53 Active Visitors
            </Grid>
            <Grid sx={{ padding: '10px !important', m: '10',fontWeight:'500', borderRadius: '5px !important', boxShadow: '0px 2px 4px 3px rgba(0, 0, 0, 0.08)' }}>
            <PeopleAltIcon/> 86 Auto Check Out
            </Grid>
            <Grid sx={{ padding: '10px !important', m: '10',fontWeight:'500', borderRadius: '5px !important', boxShadow: '0px 2px 4px 3px rgba(0, 0, 0, 0.08)' }}>
            <PlaceIcon/> 9 Location Mismatch
            </Grid>

          </Grid>
          {/* 
          <Grid sx={{ my: "1rem", justifyContent: 'space-between !important', alignItems: 'center' }} container spacing={3} width={"100%"}>
            <Grid>
              <b>Task Completed</b>
            </Grid>
            {
              checkAuthority('ADD_TASK') && userType == 'company' ?

                <Grid item xs={6} md={6} lg={4} sx={{ my: 2 }}>
                  <Link
                    to="/company/tasks/create"
                    style={{
                      backgroundColor: "grey",
                      color: "white",
                      padding: 15,
                      fontWeight: 600,
                      borderRadius: 5,
                      textDecoration: "none",
                    }}
                  >
                    Create Task
                  </Link>
                </Grid> :
                <Grid item xs={6} md={6} lg={4} sx={{ my: 2 }}>
                  <Link
                    to="/tasks/create"
                    style={{
                      backgroundColor: "grey",
                      color: "white",
                      padding: 15,
                      fontWeight: 600,
                      borderRadius: 5,
                      textDecoration: "none",
                    }}
                  >
                    Add Task
                  </Link>
                </Grid>
            }

          </Grid> */}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%",mt:'1rem' }}
          >
            <div><b>Visitor Register</b></div>
            
           <div>
           <Button variant="contained" style={{ backgroundColor: "grey" }} sx={{ height: 50, m:2 }} 
           onClick={(e) => {
            navigateTo('/visitor_task')
          }}>
              <AddCircleIcon /> &nbsp; &nbsp;
              Add Visitor
            </Button>
           <Button variant="contained" style={{ backgroundColor: "grey" }} sx={{ height: 50, m:2 }} >
              <GetAppRoundedIcon /> &nbsp; &nbsp;
              Export
            </Button>
           </div>
          </Box>


          <Grid sx={{ my: "1rem" }} container spacing={3} width={"100%"}>


            {
              checkAuthority('VIEW_TASKS') &&
              <>
                <Grid item xs={6} md={6} lg={2}>

                  <BasicSelector
                    disableAll={true}
                    options={companies}
                    selectorHight={"53px"}
                    value={filter.companyId}
                    name={"Select Company"}
                    selectorWidth={"100%"}
                    onChange={(e) => {

                      setFilter({
                        ...filter,
                        CompanyId: e.target.value
                      })
                      getTasks(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={2}>

                  <BasicSelector
                    disableAll={true}
                    options={sites}
                    selectorHight={"53px"}
                    value={filter.siteId}
                    name={"Select Site"}
                    selectorWidth={"100%"}
                    onChange={(e) => {

                      setFilter({
                        ...filter,
                        siteId: e.target.value
                      })
                      getTasks(e.target.value)
                    }}
                  />
                </Grid>

                <Grid item xs={6} md={6} lg={4}>
                  <LocalDateSelector
                    title="Start Date "
                    value={filter.startDate}

                    onChange={(date) => {
                      setFilter({
                        ...filter,
                        startDate: date
                      })
                      getTasks(null, date, null)
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={4}>
                  <LocalDateSelector
                    title="End Date "
                    value={filter.endDate}

                    onChange={(date) => {
                      setFilter({
                        ...filter,
                        endDate: date
                      })
                      getTasks(null, null, date)
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={2}>

                  <BasicSelector
                    disableAll={true}
                    options={companies}
                    selectorHight={"53px"}
                    value={filter.email}
                    name={"Visitor Email"}
                    selectorWidth={"100%"}
                    onChange={(e) => {

                      setFilter({
                        ...filter,
                        email: e.target.value
                      })
                      getTasks(e.target.value)
                    }}
                  />
                </Grid>

              </>
            }

          </Grid>
        </FormControl>
        {
          checkAuthority('VIEW_TASKS') &&
          <Box display="flex" sx={{ my: "3rem" }}>
            <TableContainer component={Paper}>

              <Table
                sx={{ minWidth: "auto" }}
                aria-label="custom pagination table"
                className="responsive-table"
              >
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell align="left" component="th" sx={tableHeader}>
                      Date
                    </TableCell>
                    <TableCell align="left" component="th" sx={tableHeader}>
                      Site Name
                    </TableCell>
                    <TableCell align="left" component="th" sx={tableHeader}>
                      Name
                    </TableCell>
                    <TableCell align="left" component="th" sx={tableHeader}>
                      Company
                    </TableCell>
                    <TableCell align="left" component="th" sx={tableHeader}>
                      Email
                    </TableCell>
                    <TableCell align="left" component="th" sx={tableHeader}>
                      Phone
                    </TableCell>
                    <TableCell align="center" component="th" sx={tableHeader}>
                      Check In
                    </TableCell>
                    <TableCell align="center" component="th" sx={tableHeader}>
                      Check Out
                    </TableCell>
                    <TableCell align="center" component="th" sx={tableHeader}>
                     Purpose
                    </TableCell>
                    <TableCell align="center" component="th" sx={tableHeader}>
                    Check In Location
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>


                  {taskD.slice(page * perPage, page * perPage + perPage).map((task, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" sx={tableData}>
                        {/* {console.log(item,"====item=====")} */}
                        {new Date(task?.startDate).toLocaleDateString("en-uk", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {task?.siteId?.name}
                      </TableCell>
                      <TableCell align="left"sx={tableData}>
                       {task?.title}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                        {task?.companyId?.name}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                      {task?.assignedUser?.name}
                      </TableCell>
                      <TableCell align="left" sx={tableData}>
                      {task?.assignedUser?.phone}
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

                  ))}

                  {
                    tasks.length === 0 &&
                    <EmptyTable colSpan={6} />
                  }
                </TableBody>
                <TableFooter>
                  <TableRow >

                    <TablePagination
                      align="right"
                      rowsPerPageOptions={perPages}
                      colSpan={7}
                      count={taskD.length}
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

      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
        <DialogTitle sx={{ mb: 4, textAlign: "center" }}>Delete Task</DialogTitle>

        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 2, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >

            <h3 style={{ textAlign: 'left', fontWeight: 'bold' }}>Do you want's to delete this task</h3>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mx: 4 }}>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
          <Button onClick={() => setOpen(false)} variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
