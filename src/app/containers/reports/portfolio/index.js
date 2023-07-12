import React, { useEffect, useState } from "react";
import { Box, Grid, FormControl, Button } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Table from '@mui/material/Table';
import InputLabel from '@mui/material/InputLabel';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import { Bar } from 'react-chartjs-2';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LocalDateSelector from "../../../common/LocalDateSelector";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import "./style.css";
import { getAPI } from "../../../network";
import Loader from "../../../common/Loader";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { checkAuthority, tableHeader, tableData, formatDate, fullName, tablebtn } from "../../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PorfolioReportPage() {
  const [loader, setLoader] = useState(false)
  const [sites, setSites] = useState([])
  const [vendor, setVendor] = useState([])
  const [role, setRole] = useState([])
  const [user, setUser] = useState([])
  const [complience, setComplience] = useState({})
  const [casualShift, setCasShift] = useState({})
  const [roster, setRoster] = useState({})
  const [log, setLogOverview] = useState({})
  const [tenancy, setTenancy] = useState({})
  const [tasks, setTasks] = useState({})
  const [defects, setDefects] = useState({})
  const [inspections, setInspections] = useState({})
  const [alarms, setAlarms] = useState({})

  const [report, setReport] = useState({
    siteId: '',
    vendorId: '',
    role: '',
    user: '',
  })
  const [shift, setShift] = useState({
    siteId: '',
    vendorId: '',
    role: '',
    user: '',
  })
  const [rosterShift, setRosterShift] = useState({
    siteId: '',
    vendorId: '',
    role: '',
    user: '',
  })
  const [shiftLog ,setShiftLog] = useState({
    siteId: '',
    vendorId: '',
    role: '',
    user: '',
  })
  const [ten ,setTen] = useState({
    siteId: '',
    vendorId: '',
    role: '',
    user: '',
  })
  const [task ,setTask] = useState({
    siteId: '',
    vendorId: '',
    role: '',
    user: '',
  })
  const [defect ,setDefect] = useState({
    siteId: '',
    vendorId: '',
    role: '',
    user: '',
  })
  const [inspection, setInspection] = useState({
    siteId: '',
    vendorId: '',
    role: '',
    user: '',
  })
  const [alarm, setAlarm] = useState({
    siteId: '',
    vendorId: '',
    role: '',
    user: '',
  })


  useEffect(() => {
    getSites()
    getvendor()
    getrole()
    getUser()
    getCompReports()
    getCShiftRep()
    getRoasterRep()
    getSLogRep()
    getTenancyRep()
    getTaskRep()
    getDefectsRep()
    getInspectionRep()
    getAlarmRep()
  }, [])





  const getSites = async () => {
    let userType = localStorage.getItem('userType')
    setLoader(true)
    let data = await getAPI(userType === 'admin' ? '/sites' : '/company/site')
    if (data) {
      setSites(data)
    }
    setLoader(false)
  }

  const getvendor = async () => {
    let userType = localStorage.getItem('userType')
    setLoader(true)
    let data = await getAPI(userType === 'admin' ? '/vendors' : '/company/vendors')
    if (data) {
      setVendor(data)
    }
    setLoader(false)
  }
  const getrole = async () => {
    setLoader(true)
    let data = await getAPI('adm/roles')
    if (data) {
      setRole(data)
    }
    setLoader(false)
  }

  const getUser = async () => {
    setLoader(true)
    let data = await getAPI('users/app')
    if (data) {
      let outputs = data.map((item) => ({
        id: item._id,
        label: item.firstname + ' ' + item.lastname,
        value: item._id
      }))
      setUser(outputs)
    }
    setLoader(false)
  }
  const generateUrl = (vendorId, siteId, role, userId) => {
    var additional_url = '';
    var isFirst = true;
    if (vendorId) {
      additional_url += isFirst ? `?vendorId=${vendorId}` : `&vendorId=${vendorId}`;
      isFirst = false;
    }
    if (siteId) {
      additional_url += isFirst ? `?siteId=${siteId}` : `&siteId=${siteId}`;
      isFirst = false;
    }

    if (role) {
      additional_url += isFirst ? `?role=${role}` : `&role=${role}`;
      isFirst = false;
    }
    if (userId) {
      additional_url += isFirst ? `?userId=${userId}` : `&userId=${userId}`;
      isFirst = false;
    }

    return additional_url;
  }
  var labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // ***********************************************************************************************************

  const outOfInduction = [];
  const total = [];
  const outLicense = [];
  const location = [];

 Object.keys(complience).map((item)=>{

      const outOfInductionC = complience[item].outOfInduction
      const totalC = complience[item].total
      const outLicenseC = complience[item].outLicense
      const locationC = complience[item].location


      outOfInduction.push(outOfInductionC)
      total.push(totalC)
      outLicense.push(outLicenseC)
      location.push(locationC)

      return outOfInductionC,totalC,outLicenseC,locationC;
 })


  const dataComplience = {
    labels,
    datasets: [
      {
        label: 'Out of Inductions',
        data: outOfInduction,
        backgroundColor: '#2896E9',
      },
      {
        label: 'Incorrect Location clock ins',
        data: location,
        backgroundColor: '#F36F4E',
      },
      {
        label: 'Out of date security Licenses',
        data: outLicense,
        backgroundColor: '#8AA01D',
      },

    ],
  };

  const optionsComplience = {
    responsive: true,
    layout: {
      height: 400,
      fontSize: 18
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Compliance Overview',
      },
    },
  };

  const getCompReports = async (vendorId = null, siteId = null, role = null, user = null) => {
    let vId = vendorId != null ? vendorId : report.vendorId
    let sId = siteId !== null ? siteId : report.siteId;
    let drole = role !== null ? role : report.role;
    let duser = user !== null ? user : report.user;

    let url = generateUrl(vId, sId, drole, duser);
    setLoader(true)
    let data = await getAPI(`/portfolio-report/complience-overview${url}`)
    if (data) {
      setComplience(data)
    }
    setLoader(false)
  }
  const changeVendor = (e) => {
    setReport({
      ...report,
      vendorId: e.target.value
    })
    getCompReports(e.target.value, null, null, null)
  }
  const changeSite = (e) => {
    setReport({
      ...report,
      siteId: e.target.value
    })
    getCompReports(null, e.target.value, null, null, null)
    getCShiftRep(null, e.target.value, null, null, null)
  }
  const changeRole = (e) => {
    setReport({
      ...report,
      role: e.target.value
    })
    getCompReports(null, null, e.target.value, null, null)
  }
  const changeUser = (e) => {
    setReport({
      ...report,
      user: e.target.value
    })
    getCompReports(null, null, null, e.target.value)
  }

  //*************************************************************************************************************
  const clockIn = []
  const clockOut = []
  const forcedClockout = []
  const lateClock = []
  const missedClock = []
  const shifts = []

    Object.keys(casualShift).map((item) => {

      const clockInValue = casualShift[item].clockIn
      const clockooutValue = casualShift[item].clockOut
      const forceValue = casualShift[item].forcedClockout
      const lateCValue = casualShift[item].lateClock
      const missedValue = casualShift[item].missedClock
      const shiftValue = casualShift[item].shifts


      clockIn.push(clockInValue)
      clockOut.push(clockooutValue)
      forcedClockout.push(forceValue)
      lateClock.push(lateCValue)
      missedClock.push(missedValue)
      shifts.push(shiftValue)

      return clockInValue, clockooutValue,forceValue,lateCValue,missedValue,shiftValue;
    });

  

  const optionsCasual = {
    responsive: true,
    layout: {
      height: 400,
      fontSize: 18
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Casual Shifts Overview',
      },
    },
  };

  const dataCasual = {
    labels,
    datasets: [
      {
        label: 'Shift Roastered',
        data: shifts,
        backgroundColor: '#2896E9',
      },
      {
        label: 'Clock Ins',
        data: clockIn,
        backgroundColor: '#F36F4E',
      },
      {
        label: 'Late Clock Ins',
        data: lateClock,
        backgroundColor: '#E891AA',
      },
      {
        label: 'Missed Clock Ins',
        data: missedClock,
        backgroundColor: '#7778AA',
      },
      {
        label: 'Clock Outs',
        data: clockOut,
        backgroundColor: '#6931AA',
      },
      {
        label: 'Forced Clock outs',
        data: forcedClockout,
        backgroundColor: '#8031AA',
      },
    ],
  };

  const getCShiftRep = async (vendorId = null, siteId = null, role = null, user = null) => {
    let vId = vendorId != null ? vendorId : shift.vendorId
    let sId = siteId !== null ? siteId : shift.siteId;
    let drole = role !== null ? role : shift.role;
    let duser = user !== null ? user : shift.user;

    let url = generateUrl(vId, sId, drole, duser);
    setLoader(true)
    let data = await getAPI(`/portfolio-report/casual-shift-overview${url}`)
    if (data) {
      // setShifts(data)
      setCasShift(data)
    }
    setLoader(false)
  }

  const changeCVendor = (e) => {
    setShift({
      ...shift,
      vendorId: e.target.value
    })
    getCShiftRep(e.target.value, null, null, null)
  }
  const changeCSite = (e) => {
    setShift({
      ...shift,
      siteId: e.target.value
    })

    getCShiftRep(null, e.target.value, null, null, null)
  }
  const changeCRole = (e) => {
    setShift({
      ...shift,
      role: e.target.value
    })
    getCShiftRep(null, null, e.target.value, null, null)
  }
  const changeCUser = (e) => {
    setShift({
      ...shift,
      user: e.target.value
    })
    getCShiftRep(null, null, null, e.target.value)
  }


  // *************************************************************************************************************

 



    const clockInR=[]
    const clockOutR = []
    const forcedClockoutR = []
    const lateClockR = []
    const missedClockR = []
    const shiftsR = []
    
   
    Object.keys(roster).map((item) => {
      const clockInValue = roster[item].clockIn
      const clockooutValue = roster[item].clockOut
      const forceValue = roster[item].forcedClockout
      const lateCValue = roster[item].lateClock
      const missedValue = roster[item].missedClock
      const shiftValue = roster[item].shifts


      clockInR.push(clockInValue)
      clockOutR.push(clockooutValue)
      forcedClockoutR.push(forceValue)
      lateClockR.push(lateCValue)
      missedClockR.push(missedValue)
      shiftsR.push(shiftValue)

      return clockInValue, clockooutValue,forceValue,lateCValue,missedValue;
    });
  

 
 
  const optionsRoster = {
    responsive: true,
    layout: {
      height: 400,
      fontSize: 18
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Rostered Shifts Overview',
      },
    },
  };

  const dataRoster = {
    labels,
    datasets: [
      {
        label: 'Shift Roastered',
        data:shiftsR,
        backgroundColor: '#2896E9',
      },
      {
        label: 'Clock Ins',
        data: clockInR,
        backgroundColor: '#F36F4E',
      },
      {
        label: 'Late Clock Ins',
        data:lateClockR,
        backgroundColor: '#E891AA',
      },
      {
        label: 'Missed Clock Ins',
        data: missedClockR,
        backgroundColor: '#7778AA',
      },
      {
        label: 'Clock Outs',
        data: clockOutR,
        backgroundColor: '#6931AA',
      },
      {
        label: 'Failed Clock Ins',
        data: forcedClockoutR,
        backgroundColor: '#8031AA',
      },
    ],
  };


  const getRoasterRep = async (vendorId = null, siteId = null, role = null, user = null) => {
    let vId = vendorId != null ? vendorId : rosterShift.vendorId
    let sId = siteId !== null ? siteId : rosterShift.siteId;
    let drole = role !== null ? role : rosterShift.role;
    let duser = user !== null ? user : rosterShift.user;

    let url = generateUrl(vId, sId, drole, duser);
    setLoader(true)
    let data = await getAPI(`/portfolio-report/roster-shift-overview${url}`)
    if (data) {
      // setRosterData(data)
      setRoster(data)
    }
    setLoader(false)
  }

  const changeRVendor = (e) => {
    setRosterShift({
      ...rosterShift,
      vendorId: e.target.value
    })
    getRoasterRep(e.target.value, null, null, null)
  }
  const changeRSite = (e) => {
    setRosterShift({
      ...rosterShift,
      siteId: e.target.value
    })

    getRoasterRep(null, e.target.value, null, null, null)
  }
  const changeRRole = (e) => {
    setRosterShift({
      ...rosterShift,
      role: e.target.value
    })
    getRoasterRep(null, null, e.target.value, null, null)
  }
  const changeRUser = (e) => {
    setRosterShift({
      ...rosterShift,
      user: e.target.value
    })
    getRoasterRep(null, null, null, e.target.value)
  }

// ********************************************************************************************************************************


const clockInS=[]
const logs = []
const missed = []
const shiftslog = []



Object.keys(log).map((item) => {
  const clockInValueL = log[item].clockIn
  const clockooutValueL = log[item].logs
  const forceValueL = log[item].missed
  const lateCValueL = log[item].shifts
  


  clockInS.push(clockInValueL)
  logs.push(clockooutValueL)
  missed.push(forceValueL)
  shiftslog.push(lateCValueL)
  return clockInValueL, clockooutValueL,forceValueL,lateCValueL;
});


const optionsShift = {
  responsive: true,
  layout: {
    height: 400,
    fontSize: 18
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Shift Logs Overview',
    },
  },
};

const dataShift = {
  labels,
  datasets: [
    {
      label: 'Shift Created',
      data:shiftslog,
      backgroundColor: '#2896E9',
    },
    {
      label: 'Shift Clock Ins',
      data:clockInS ,
      backgroundColor: '#F36F4E',
    },
    {
      label: 'Shift Logs Received',
      data: logs,
      backgroundColor: '#E891AA',
    },
    {
      label: 'Shift log Missed',
      data:missed,
      backgroundColor: '#A778RA',
    },

  ],
};


const getSLogRep = async (vendorId = null, siteId = null, role = null, user = null) => {
let vId = vendorId != null ? vendorId : shiftLog.vendorId
let sId = siteId !== null ? siteId : shiftLog.siteId;
let drole = role !== null ? role : shiftLog.role;
let duser = user !== null ? user : shiftLog.user;

let url = generateUrl(vId, sId, drole, duser);
setLoader(true)
let data = await getAPI(`/portfolio-report/shift-log-overview${url}`)
if (data) {
  setLogOverview(data)
}
setLoader(false)
}

const changeSLogVendor = (e) => {
  setShiftLog({
  ...shiftLog,
  vendorId: e.target.value
})
getSLogRep(e.target.value, null, null, null)
}
const changeSLogSite = (e) => {
  setShiftLog({
  ...shiftLog,
  siteId: e.target.value
})

getSLogRep(null, e.target.value, null, null, null)
}
const changeSLogRole = (e) => {
  setShiftLog({
  ...shiftLog,
  role: e.target.value
})
getSLogRep(null, null, e.target.value, null, null)
}
const changeSLogUser = (e) => {
setShiftLog({
  ...shiftLog,
  user: e.target.value
})
getSLogRep(null, null, null, e.target.value)
}

// ***********************************************************************************************************************************

const check=[]
const compPercent = []
const completedResp = []
const missedPercent = []
const missedResp = []



Object.keys(tenancy).map((item) => {
  const checkValue = tenancy[item].check
  const compValue = tenancy[item].compPercent
  const completeValue = tenancy[item].completedResp
  const missedPValue = tenancy[item].missedPercent
  const missedRValue = tenancy[item].missedResp
  


  check.push(checkValue)
  compPercent.push(compValue)
  completedResp.push(completeValue)
  missedPercent.push(missedPValue)
  missedResp.push(missedRValue)

  return checkValue, compValue,completeValue,missedPValue,missedRValue;
});



const optionsTendency = {
  responsive: true,
  layout: {
    height: 400,
    fontSize: 18
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Tendency Checks Overview',
    },
  },
};

const dataTendency = {
  labels,
  datasets: [
    {
      label: 'Scheduled Tendency Checks',
      data:check,
      backgroundColor: '#2896E9',
    },
    {
      label: 'Tendency Check Completed',
      data: completedResp,
      backgroundColor: '#F36F4E',
    },
    {
      label: 'Tendency Check missed',
      data:missedResp ,
      backgroundColor: '#E891AA',
    },

  ],
};


const getTenancyRep = async (vendorId = null, siteId = null, role = null, user = null) => {
let vId = vendorId != null ? vendorId : ten.vendorId;
let sId = siteId !== null ? siteId : ten.siteId;
let drole = role !== null ? role : ten.role;
let duser = user !== null ? user : ten.user;

let url = generateUrl(vId, sId, drole, duser);
setLoader(true)
let data = await getAPI(`/portfolio-report/tenancy-check-overview${url}`)
if (data) {
  setTenancy(data)
}
setLoader(false)
}

const changeTVendor = (e) => {
  setTen({
  ...ten,
  vendorId: e.target.value
})
getTenancyRep(e.target.value, null, null, null)
}

const changeTSite = (e) => {
  setTen({
  ...ten,
  siteId: e.target.value
})
getTenancyRep(null, e.target.value, null, null, null)
}

const changeTRole = (e) => {
  setTen({
  ...ten,
  role: e.target.value
})
getTenancyRep(null, null, e.target.value, null, null)
}

const changeTUser = (e) => {
setTen({
  ...ten,
  user: e.target.value
})
getTenancyRep(null, null, null, e.target.value)
}


// ************************************************************************************************************************************



const compTPercent=[]
const completedTResp = []
const holdPercent = []
const lateResp = []
const missedTPercent = []
const missedTResp = []
const onHold = []
const respPercent = []
const alltask = []
const updatedTask = []



Object.keys(tasks).map((item) => {
  const checkValue = tasks[item].compPercent
  const compValue = tasks[item].completedResp
  const holdValue = tasks[item].holdPercent
  const lateRespValue = tasks[item].lateResp
  const missedPValue = tasks[item].missedPercent
  const missedRValue = tasks[item].missedResp
  const onHoldValue = tasks[item].onHold
  const respPercentValue = tasks[item].respPercent
  const taskValue = tasks[item].task
  const updatedTaskValue = tasks[item].updatedTask
  

  compPercent.push(checkValue)
  completedResp.push(compValue)
  holdPercent.push(holdValue)
  lateResp.push(lateRespValue)
  missedPercent.push(missedPValue)
  missedResp.push(missedRValue)
  onHold.push(onHoldValue)
  respPercent.push(respPercentValue)
  alltask.push(taskValue)
  updatedTask.push(updatedTaskValue)

  return checkValue, compValue,holdValue,lateRespValue,missedPValue,missedRValue,onHoldValue,respPercentValue,taskValue,updatedTaskValue;
});


const optionsTask = {
  responsive: true,
  layout: {
    height: 400,
    fontSize: 18
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Task Overview',
    },
  },
};

const dataTask = {
  labels,
  datasets: [
    {
      label: 'Tasks Created',
      data:alltask,
      backgroundColor: '#2896E9',
    },
    {
      label: 'Tasks Updated',
      data: updatedTask,
      backgroundColor: '#F36F4E',
    },
    {
      label: 'Late Tasks Completions',
      data:lateResp,
      backgroundColor: '#E891AA',
    },
    {
      label: 'Missed Tasks',
      data: missedTResp,
      backgroundColor: '#7778RA',
    },
    {
      label: 'Tasks Completed',
      data: completedTResp,
      backgroundColor: '#6931EA',
    },
    {
      label: 'Tasks On hold',
      data:onHold,
      backgroundColor: '#8031QA',
    },
    {
      label: 'Tasks Deferred',
      data: holdPercent,
      backgroundColor: '#7831AA',
    },

  ],
};



const getTaskRep = async (vendorId = null, siteId = null, role = null, user = null) => {
let vId = vendorId != null ? vendorId : task.vendorId;
let sId = siteId !== null ? siteId : task.siteId;
let drole = role !== null ? role : task.role;
let duser = user !== null ? user : task.user;

let url = generateUrl(vId, sId, drole, duser);
setLoader(true)
let data = await getAPI(`/portfolio-report/task-overview${url}`)
if (data) {
  setTasks(data)
}
setLoader(false)
}

const changeTaskVendor = (e) => {
  setTask({
  ...task,
  vendorId: e.target.value
})
getTaskRep(e.target.value, null, null, null)
}

const changeTaskSite = (e) => {
  setTask({
  ...task,
  siteId: e.target.value
})
getTaskRep(null, e.target.value, null, null, null)
}

const changeTaskRole = (e) => {
  setTask({
  ...task,
  role: e.target.value
})
getTaskRep(null, null, e.target.value, null, null)
}

const changeTaskUser = (e) => {
setTask({
  ...task,
  user: e.target.value
})
getTaskRep(null, null, null, e.target.value)
}

// ********************************************************************************************





const critical=[]
const injuries = []
const nonCritical = []


Object.keys(defects).map((item) => {
  const criticalValue = defects[item].critical
  const injuriesValue = defects[item].injuries
  const nonCriticalValue = defects[item].nonCritical
  


  critical.push(criticalValue)
  injuries.push(injuriesValue)
  nonCritical.push(nonCriticalValue)
  return criticalValue, injuriesValue,nonCriticalValue;
});


const optionsDefects = {
  responsive: true,
  layout: {
    height: 400,
    fontSize: 18
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Defects & Injuries Overview',
    },
  },
};

const dataDefects = {
  labels,
  datasets: [
    {
      label: 'Critical Defects Reported',
      data: critical,
      backgroundColor: '#2896E9',
    },
    {
      label: 'Non-critical Defects reported',
      data: nonCritical,
      backgroundColor: '#F36F4E',
    },
    {
      label: 'Injuries reported',
      data:injuries,
      backgroundColor: '#E891AA',
    }
  ],
};


const getDefectsRep = async (vendorId = null, siteId = null, role = null, user = null) => {
let vId = vendorId != null ? vendorId : defect.vendorId;
let sId = siteId !== null ? siteId : defect.siteId;
let drole = role !== null ? role : defect.role;
let duser = user !== null ? user : defect.user;

let url = generateUrl(vId, sId, drole, duser);
setLoader(true)
let data = await getAPI(`/portfolio-report/defect-and-injury-overview${url}`)
if (data) {
  
  setDefects(data)
}
setLoader(false)
}

const changeDVendor = (e) => {
  setDefect({
  ...defect,
  vendorId: e.target.value
})
getDefectsRep(e.target.value, null, null, null)
}

const changeDSite = (e) => {
  setDefect({
  ...defect,
  siteId: e.target.value
})
getDefectsRep(null, e.target.value, null, null, null)
}

const changeDRole = (e) => {
  setDefect({
  ...defect,
  role: e.target.value
})
getDefectsRep(null, null, e.target.value, null, null)
}

const changeDUser = (e) => {
setDefect({
  ...defect,
  user: e.target.value
})
getDefectsRep(null, null, null, e.target.value)
}

// **************************************************************************************************************


const janA=[]
const febA = []
const marchA = []
const aprilA = []
const mayA = []
const juneA = []
const jullyA = []
const augA = []
const septA = []


Object.keys(alarms).map((item) => {
  const alarmValue = alarms[item].alarm
  const closedRespValue= alarms[item].closedResp
  const lateRespValue = alarms[item].lateResp
  const missedRespValue = alarms[item].missedResp
  const totalRespValue = alarms[item].totalResp
  const onHoldValue = alarms[item].onHold
  const compPercentValue = alarms[item].compPercent
  const holdPercentValue = alarms[item].holdPercent
  const respPercentValue = alarms[item].respPercent
  


  janA.push(alarmValue)
  febA.push(closedRespValue)
  marchA.push(lateRespValue)
  aprilA.push(missedRespValue)
  mayA.push(totalRespValue)
  juneA.push(onHoldValue)
  jullyA.push(compPercentValue)
  augA.push(holdPercentValue)
  septA.push(respPercentValue)
  

  return alarmValue, closedRespValue,lateRespValue,missedRespValue,totalRespValue,onHoldValue,compPercentValue,holdPercentValue,respPercentValue;
});



const optionsAlarm = {
  responsive: true,
  layout: {
    height: 400,
    fontSize: 18
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Alarm response Overview',
    },
  },
}

const dataAlarm = {
  labels,
  datasets: [
    {
      label: 'Alarm Response Created',
      data:janA,
      backgroundColor: '#1933F3',
    },
    {
      label: 'Total Responses',
      data: febA,
      backgroundColor: '#F36F4E',
    },
    {
      label: 'Late Response',
      data:marchA,
      backgroundColor: '#E891AA',
    },
    {
      label: 'Missed Responses',
      data: aprilA,
      backgroundColor: '#7778RA',
    },
    {
      label: 'closed Responses',
      data:mayA,
      backgroundColor: '#6931EA',
    },
    {
      label: 'On hold Responses',
      data: juneA,
      backgroundColor: '#2DF319',
    }
  ]
};


const getAlarmRep = async (vendorId = null, siteId = null, role = null, user = null) => {
let vId = vendorId != null ? vendorId : alarm.vendorId;
let sId = siteId !== null ? siteId : alarm.siteId;
let drole = role !== null ? role : alarm.role;
let duser = user !== null ? user : alarm.user;

let url = generateUrl(vId, sId, drole, duser);
setLoader(true)
let data = await getAPI(`/portfolio-report/alarm-response-overview${url}`)
if (data) {
  setAlarms(data)
}
setLoader(false)
}

const changeAVendor = (e) => {
  setAlarms({
  ...alarm,
  vendorId: e.target.value
})
getAlarmRep(e.target.value, null, null, null)
}

const changeASite = (e) => {
  setAlarms({
  ...alarm,
  siteId: e.target.value
})
getAlarmRep(null, e.target.value, null, null, null)
}

const changeARole = (e) => {
  setAlarms({
  ...alarm,
  role: e.target.value
})
getAlarmRep(null, null, e.target.value, null, null)
}

const changeAUser = (e) => {
setAlarms({
  ...alarm,
  user: e.target.value
})
getAlarmRep(null, null, null, e.target.value)
}




// ************************************************************************************************************


const fireAlarm=[]
const incident = []
const tearPass = []
const hazard = []
const vandalism = []
const breakIn = []
const bomb = []
const injury = []
const periodic = []
const suspecious = []
const loss = []
const theft = []



Object.keys(inspections).map((item) => {
  const janValue = inspections[item].fireAlarm
  const febValue = inspections[item].incident
  const marchValue = inspections[item].tearPass
  const aprilValue = inspections[item].hazard
  const mayValue = inspections[item].vandalism
  const juneValue = inspections[item].breakIn
  const jullyValue = inspections[item].bomb
  const augustValue = inspections[item].injury
  const septemberValue = inspections[item].periodic
  const octoberValue = inspections[item].suspecious
  const novemberValue = inspections[item].loss
  const decemberValue = inspections[item].theft
  
  
  fireAlarm.push(janValue)
  incident.push(febValue)
  tearPass.push(marchValue)
  hazard.push(aprilValue)
  vandalism.push(mayValue)
  breakIn.push(juneValue)
  bomb.push(jullyValue)
  injury.push(augustValue)
  periodic.push(septemberValue)
  suspecious.push(octoberValue)
  loss.push(novemberValue)
  theft.push(decemberValue)
  

  return janValue, febValue,marchValue,aprilValue,mayValue,juneValue,jullyValue,augustValue,septemberValue,octoberValue,novemberValue,decemberValue;
});


const optionsInspection = {
  responsive: true,
  layout: {
    height: 400,
    fontSize: 18
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Inspections & Reports Overview',
    },
  },
};
labels = ['Fire alarm reports', 'incident reports', 'Trespassing reports', 'Hazards reports', 'vadalism', 'Break in reports', 'Bomb threat reports', 'Injury reports', 'Periodic reports', 'Suspicious activity reports', 'Loss property reports', 'Theft reports', 'First aif reports'];
const dataInspection = {
  labels,
  datasets: [
    {
      label: 'Jan',
      data: fireAlarm,
      backgroundColor: '#1933F3',
    },
    {
      label: 'Feb',
      data: incident,
      backgroundColor: '#F36F4E',
    },
    {
      label: 'Mar',
      data:tearPass,
      backgroundColor: '#E891AA',
    },
    {
      label: 'Apr',
      data: hazard,
      backgroundColor: '#7778RA',
    },
    {
      label: 'May',
      data: vandalism,
      backgroundColor: '#6931EA',
    },
    {
      label: 'June',
      data:  breakIn,
      backgroundColor: '#2DF319',
    },
    {
      label: 'Jul',
      data: bomb,
      backgroundColor: '#F31990',
    },
    {
      label: 'Aug',
      data: injury,
      backgroundColor: '#F34719',
    },
    {
      label: 'Sep',
      data:periodic,
      backgroundColor: '#8AA01D',
    },
    {
      label: 'Oct',
      data:suspecious,
      backgroundColor: '#7831AA',
    },
    {
      label: 'Nov',
      data: loss,
      backgroundColor: '#8A1DA0',
    },
    {
      label: 'Dec',
      data:theft,
      backgroundColor: '#19F3F0',
    },
  ],
};



const getInspectionRep = async (vendorId = null, siteId = null, role = null, user = null) => {
let vId = vendorId != null ? vendorId : inspection.vendorId;
let sId = siteId !== null ? siteId : inspection.siteId;
let drole = role !== null ? role : inspection.role;
let duser = user !== null ? user : inspection.user;

let url = generateUrl(vId, sId, drole, duser);
setLoader(true)
let data = await getAPI(`/portfolio-report/inspection-and-reports-overview${url}`)
if (data) {
  setInspections(data)
}
setLoader(false)
}

const changeInspVendor = (e) => {
  setInspection({
  ...inspection,
  vendorId: e.target.value
})
getInspectionRep(e.target.value, null, null, null)
}

const changeInspSite = (e) => {
  setInspection({
  ...inspection,
  siteId: e.target.value
})
getInspectionRep(null, e.target.value, null, null, null)
}

const changeInspRole = (e) => {
  setInspection({
  ...inspection,
  role: e.target.value
})
getInspectionRep(null, null, e.target.value, null, null)
}

const changeInspUser = (e) => {
setInspection({
  ...inspection,
  user: e.target.value
})
getInspectionRep(null, null, null, e.target.value)
}



 


  
 

  

 





 


  return (
    <Box sx={{ height: "inherit" }}>
      <Loader loader={loader} />
      <PageTitle title="Reports" subTitle="Portfolio Reports" />
    
      <Box>
        <Grid
          container
          className="sort-box"
          sx={{ mt: "1rem" }}
        >

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={rosterShift.vendorId}
                onChange={(e) => {
                  changeRVendor(e)
                  setRosterShift({
                    ...rosterShift,
                    vendorId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Vendor</div>
                </MenuItem>
                {vendor.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={rosterShift.siteId}
                onChange={(event) => {
                  changeRSite(event)
                  setRosterShift({
                    ...rosterShift,
                    siteId:event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Site</div>
                </MenuItem>
                {sites.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={rosterShift.role}
                onChange={(event) => {
                  changeRRole(event)
                  setRosterShift({
                    ...rosterShift,
                    role:event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Role</div>
                </MenuItem>
                {role.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={rosterShift.user}
                onChange={(event) => {
                  changeRUser(event)
                  setRosterShift({
                    ...rosterShift,
                    user:event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select User</div>
                </MenuItem>
                {user.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <TableContainer component={Paper} sx={{ mx: "0.8rem", mt: "3rem", mb: "3rem" }} >
          <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" sx={tableHeader} >Rostered Shifts Overview</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Jan</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Feb</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Mar</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Apr</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>May</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jun</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jul</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Aug</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Sep</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Oct</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Nov</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Dec</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Shifts Rostered</TableCell>
                {Object.keys(roster).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{roster[item]?.shifts}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Clock Ins</TableCell>
                {Object.keys(roster).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{roster[item]?.clockIn}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}  >Late clock Ins</TableCell>
                {Object.keys(roster).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{roster[item]?.lateClock}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Missed clock Ins</TableCell>
                {Object.keys(roster).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{roster[item]?.missedClock}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Clock Outs</TableCell>
                {Object.keys(roster).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{roster[item]?.clockOut}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Forced clock Outs</TableCell>
                {Object.keys(roster).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{roster[item]?.forcedClockout}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}>Clock in %</TableCell>
                {Object.keys(roster).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{roster[item]?.clockIn}</TableCell>
                ))}
              </TableRow>
            </TableBody>
            <TableRow className="tableRow">
              <TableCell align="left" component="th" sx={tableHeader}  >Late clock In %</TableCell>
              {Object.keys(roster).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{roster[item]?.lateClock}</TableCell>
                ))}
            </TableRow>
            <TableRow className="tableRow">
              <TableCell align="left" component="th" sx={tableHeader}>Missed clock in %</TableCell>
              {Object.keys(roster).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{roster[item]?.missedClock}</TableCell>
                ))}
            </TableRow>
          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" sx={{ mx: "0.5rem", p: "1rem", position: 'relative' }} className="bar-box">

        <Bar options={optionsRoster} data={dataRoster} className="bar-chart" />

      </Box>

     
      <Box>
        <Grid
          container
          className="sort-box"
          sx={{ mt: "1rem" }}
        >

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={shift.vendorId}
                onChange={(e) => {
                  changeCVendor(e)
                  setShift({
                    ...shift,
                    vendorId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Vendor</div>
                </MenuItem>
                {vendor.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={shift.siteId}
                onChange={(event) => {
                  setShift({
                    ...shift,
                    siteId: event.target.value
                  })
                  changeCSite(event)
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Site</div>
                </MenuItem>
                {sites.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={shift.role}
                onChange={(event) => {
                  changeCRole(event)
                  setShift({
                    ...shift,
                    role: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Role</div>
                </MenuItem>
                {role.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={shift.user}
                onChange={(event) => {
                  changeCUser(event)
                  setShift({
                    ...shift,
                    user: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select User</div>
                </MenuItem>
                {user.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <TableContainer component={Paper} sx={{ mx: "0.8rem", mt: "3rem", mb: "3rem" }} >
          <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
            <TableHead >
              <TableRow >
                <TableCell align="left" component="th" sx={tableHeader} >Casual Shifts Overview</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Jan</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Feb</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Mar</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Apr</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>May</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jun</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jul</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Aug</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Sep</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Oct</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Nov</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Dec</TableCell>
              </TableRow>
            </TableHead >

            <TableBody >
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Shifts Rostered</TableCell>
                {Object.keys(casualShift).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{casualShift[item]?.shifts}</TableCell>
                ))}
               
              </TableRow>
              <TableRow className="tableRow" >
                <TableCell align="left" component="th" sx={tableHeader} >Clock Ins</TableCell>
                {Object.keys(casualShift).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{casualShift[item]?.clockIn}</TableCell>
                ))}
               
                
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}  >Late clock Ins</TableCell>
                {Object.keys(casualShift).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{casualShift[item]?.lateClock}</TableCell>
                ))}

              </TableRow >
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Missed clock Ins</TableCell>
                {Object.keys(casualShift).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{casualShift[item]?.missedClock}</TableCell>
                ))}
                
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Clock Outs</TableCell>
                {Object.keys(casualShift).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{casualShift[item]?.clockOut}</TableCell>
                ))}
                
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Forced clock Outs</TableCell>
                {Object.keys(casualShift).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{casualShift[item]?.forcedClockout}</TableCell>
                ))}
                
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}>Clock in %</TableCell>
                {Object.keys(casualShift).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{casualShift[item]?.clockIn}</TableCell>
                ))}
               
              </TableRow>
            </TableBody>
            <TableRow className="tableRow">
              <TableCell align="left" component="th" sx={tableHeader}  >Late clock In %</TableCell>
              {Object.keys(casualShift).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{casualShift[item]?.clockIn}</TableCell>
                ))}
              
            </TableRow>
            <TableRow className="tableRow">
              <TableCell align="left" component="th" sx={tableHeader}>Missed clock in %</TableCell>
              {Object.keys(casualShift).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{casualShift[item]?.clockIn}</TableCell>
                ))}
              
            </TableRow>
          </Table>
        </TableContainer>
      </Box>


      <Box display="flex" sx={{ mx: "0.5rem", p: "1rem", position: 'relative' }} className="bar-box">

        <Bar options={optionsCasual} data={dataCasual} className="bar-chart" />

      </Box>

      {/* **********************Alarm Overview******************************** */}

      <Box>
        <Grid
          container
          className="sort-box"
          sx={{ mt: "1rem" }}
        >

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={alarm.vendorId}
                onChange={(e) => {
                  changeAVendor(e)
                  setAlarm({
                    ...alarm,
                    vendorId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Vendor</div>
                </MenuItem>
                {vendor.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={alarm.siteId}
                onChange={(e) => {
                  changeASite(e)
                  setAlarm({
                    ...alarm,
                    siteId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Site</div>
                </MenuItem>
                {sites.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={alarm.role}
                onChange={(e) => {
                  changeARole(e)
                  setAlarm({
                    ...alarm,
                    role: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Role</div>
                </MenuItem>
                {role.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={alarm.user}
                onChange={(e) => {
                  changeAUser(e)
                  setAlarm({
                    ...alarm,
                    user: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select User</div>
                </MenuItem>
                {user.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      
      <Box>
        <TableContainer component={Paper} sx={{ mx: "0.8rem", mt: "3rem", mb: "3rem" }} >
          <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
            <TableHead >
              <TableRow >
                <TableCell align="left" component="th" sx={tableHeader} >Alarm Response Overview</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Jan</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Feb</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Mar</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Apr</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>May</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jun</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jul</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Aug</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Sep</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Oct</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Nov</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Dec</TableCell>
              </TableRow>
            </TableHead >

            <TableBody >
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Alarm Response Created</TableCell>
                {Object.keys(alarms).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{alarms[item]?.alarm}</TableCell>
                ))}
               
              </TableRow>
              <TableRow className="tableRow" >
                <TableCell align="left" component="th" sx={tableHeader} >Total Response</TableCell>
                {Object.keys(alarms).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{alarms[item]?.totalResp}</TableCell>
                ))}
               
                
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}  >Late Response</TableCell>
                {Object.keys(alarms).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{alarms[item]?.lateResp}</TableCell>
                ))}

              </TableRow >
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Missed Response</TableCell>
                {Object.keys(alarms).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{alarms[item]?.missedResp}</TableCell>
                ))}
                
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Closed Response</TableCell>
                {Object.keys(alarms).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{alarms[item]?.closedResp}</TableCell>
                ))}
                
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >On hold Response</TableCell>
                {Object.keys(alarms).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{alarms[item]?.onHold}</TableCell>
                ))}
                
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}>Response %</TableCell>
                {Object.keys(alarms).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{alarms[item]?.respPercent}</TableCell>
                ))}
               
              </TableRow>
            </TableBody>
            <TableRow className="tableRow">
              <TableCell align="left" component="th" sx={tableHeader}  >Completed Response %</TableCell>
              {Object.keys(alarms).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{alarms[item]?.compPercent}</TableCell>
                ))}
              
            </TableRow>
            <TableRow className="tableRow">
              <TableCell align="left" component="th" sx={tableHeader}>On hold Response %</TableCell>
              {Object.keys(alarms).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{alarms[item]?.holdPercent}</TableCell>
                ))}
              
            </TableRow>
            <TableRow className="tableRow">
              <TableCell align="left" component="th" sx={tableHeader}>Missed Response %</TableCell>
              {Object.keys(alarms).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{alarms[item]?.missedPercent}</TableCell>
                ))}
              
            </TableRow>
          </Table>
        </TableContainer>
      </Box>


      <Box display="flex" sx={{ mx: "0.5rem", p: "1rem", position: 'relative' }} className="bar-box">

        <Bar options={optionsAlarm} data={dataAlarm} className="bar-chart" />

      </Box>

      {/* ********************Task Overview***************************************** */}
      <Box> 
        <Grid
          container
          className="sort-box"
          sx={{ mt: "1rem" }}
        >

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={task.vendorId}
                onChange={(e) => {
                  changeTaskVendor(e)
                  setTask({
                    ...task,
                    vendorId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Vendor</div>
                </MenuItem>
                {vendor.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={task.siteId}
                onChange={(event) => {
                  changeTaskSite(event)
                  setTask({
                    ...task,
                    siteId: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Site</div>
                </MenuItem>
                {sites.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={task.role}
                onChange={(event) => {
                  changeTaskRole(event)
                  setTask({
                    ...task,
                    role: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Role</div>
                </MenuItem>
                {role.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={task.user}
                onChange={(event) => {
                  changeTaskUser(event)
                  setTask({
                    ...task,
                    user: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select User</div>
                </MenuItem>
                {user.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <TableContainer component={Paper} sx={{ mx: "0.8rem", mt: "3rem", mb: "3rem" }} >
          <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" sx={tableHeader} >Task Overview</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Jan</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Feb</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Mar</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Apr</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>May</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jun</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jul</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Aug</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Sep</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Oct</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Nov</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Dec</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Task Overview</TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.task}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Task Updated</TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.updatedTask}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}  >Late Task Completions</TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.lateResp}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Missed task</TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.missedResp}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Task Completed</TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.compPercent}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Task on Hold </TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.onHold}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Tasks Deferred</TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.holdPercent}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Tasks Updated %</TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.updatedTask}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Completed Tasks %</TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.compPercent}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >On Hold Tasks %</TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.onHold}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Missed Tasks %</TableCell>
                {Object.keys(tasks).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tasks[item]?.missedPercent}</TableCell>
                ))}
              </TableRow>
            </TableBody>
           
          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" sx={{ mx: "0.5rem", p: "1rem", position: 'relative' }} className="bar-box">

        <Bar options={optionsTask} data={dataTask} className="bar-chart" />

      </Box>
      { /* *************************************defects Overview******************************** */}

      <Box>
        <Grid
          container
          className="sort-box"
          sx={{ mt: "1rem" }}
        >

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={defect.vendorId}
                onChange={(e) => {
                  changeDVendor(e)
                  setDefect({
                    ...defect,
                    vendorId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Vendor</div>
                </MenuItem>
                {vendor.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={defect.siteId}
                onChange={(event) => {
                  changeDSite(event)
                  setDefect({
                    ...defect,
                    siteId: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Site</div>
                </MenuItem>
                {sites.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={defect.role}
                onChange={(event) => {
                  changeDRole(event)
                  setDefect({
                    ...defect,
                    role: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Role</div>
                </MenuItem>
                {role.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={defect.user}
                onChange={(event) => {
                  changeDUser(event)
                  setDefect({
                    ...defect,
                    user: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select User</div>
                </MenuItem>
                {user.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <TableContainer component={Paper} sx={{ mx: "0.8rem", mt: "3rem", mb: "3rem" }} >
          <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" sx={tableHeader} > Defects and injuries Overview</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Jan</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Feb</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Mar</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Apr</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>May</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jun</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jul</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Aug</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Sep</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Oct</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Nov</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Dec</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Critical defects reported</TableCell>
                {Object.keys(defects).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{defects[item]?.critical}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Non-Critical defects reported</TableCell>
                {Object.keys(defects).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{defects[item]?.nonCritical}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}  >injuries reported</TableCell>
                {Object.keys(defects).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{defects[item]?.injuries}</TableCell>
                ))}
              </TableRow>
             
            </TableBody>
           
          </Table>
        </TableContainer>
      </Box>

 

      <Box display="flex" sx={{ mx: "0.5rem", p: "1rem", position: 'relative' }} className="bar-box">

        <Bar options={optionsDefects} data={dataDefects} className="bar-chart" />

      </Box>

      <Box>
        <Grid
          container
          className="sort-box"
          sx={{ mt: "1rem" }}
        >

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={shiftLog.vendorId}
                onChange={(e) => {
                  changeSLogVendor(e)
                  setShiftLog({
                    ...shiftLog,
                    vendorId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Vendor</div>
                </MenuItem>
                {vendor.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={shiftLog.siteId}
                onChange={(event) => {
                  changeSLogSite(event)
                  setShiftLog({
                    ...shiftLog,
                    siteId:event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Site</div>
                </MenuItem>
                {sites.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={shiftLog.role}
                onChange={(event) => {
                  changeSLogRole(event)
                  setShiftLog({
                    ...shiftLog,
                    role:event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Role</div>
                </MenuItem>
                {role.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={shiftLog.user}
                onChange={(event) => {
                  changeSLogUser(event)
                  setShiftLog({
                    ...shiftLog,
                    user:event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select User</div>
                </MenuItem>
                {user.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <TableContainer component={Paper} sx={{ mx: "0.8rem", mt: "3rem", mb: "3rem" }} >
          <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" sx={tableHeader} > Shifts Log Overview</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Jan</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Feb</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Mar</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Apr</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>May</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jun</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jul</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Aug</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Sep</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Oct</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Nov</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Dec</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Shifts created</TableCell>
                {Object.keys(log).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{log[item]?.shifts}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Shift clock Ins</TableCell>
                {Object.keys(log).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{log[item]?.clockIn}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}  >Shift log received</TableCell>
                {Object.keys(log).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{log[item]?.logs}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Shift log missed </TableCell>
                {Object.keys(log).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{log[item]?.missed}</TableCell>
                ))}
              </TableRow>
             
            </TableBody>
           
          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" sx={{ mx: "0.5rem", p: "1rem", position: 'relative' }} className="bar-box">

        <Bar options={optionsShift} data={dataShift} className="bar-chart" />

      </Box>


{/* *****************tendency Check******************************** */}
      <Box>
        <Grid
          container
          className="sort-box"
          sx={{ mt: "1rem" }}
        >

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={ten.vendorId}
                onChange={(e) => {
                  changeTVendor(e)
                  setTen({
                    ...ten,
                    vendorId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Vendor</div>
                </MenuItem>
                {vendor.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={ten.siteId}
                onChange={(e) => {
                  changeTSite(e)
                  setTen({
                    ...ten,
                    siteId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Site</div>
                </MenuItem>
                {sites.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={ten.role}
                onChange={(e) => {
                  changeTRole(e)
                  setTen({
                    ...ten,
                    role: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Role</div>
                </MenuItem>
                {role.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={ten.user}
                onChange={(event) => {
                  changeTUser(event)
                  setTen({
                    ...ten,
                    user: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select User</div>
                </MenuItem>
                {user.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <TableContainer component={Paper} sx={{ mx: "0.8rem", mt: "3rem", mb: "3rem" }} >
          <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" sx={tableHeader} >Tenancy Check Overview</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Jan</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Feb</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Mar</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Apr</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>May</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jun</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jul</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Aug</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Sep</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Oct</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Nov</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Dec</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Scheduled tenancy checks</TableCell>
                {Object.keys(tenancy).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tenancy[item]?.check}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Tenancy checks completed</TableCell>
                {Object.keys(tenancy).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tenancy[item]?.completedResp}</TableCell>
                ))}

              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}  >Tenancy checks missed</TableCell>
                {Object.keys(tenancy).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tenancy[item]?.missedResp}</TableCell>
                ))}

              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Tenancy checks completions %</TableCell>
                {Object.keys(tenancy).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tenancy[item]?.compPercent}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Missed tenancy checks %</TableCell>
                {Object.keys(tenancy).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{tenancy[item]?.missedPercent}</TableCell>
                ))}
              </TableRow>

            </TableBody>

          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" sx={{ mx: "0.5rem", p: "1rem", position: 'relative' }} className="bar-box">

        <Bar options={optionsTendency} data={dataTendency} className="bar-chart" />

      </Box>


{/* *****************Complance Over********************************* */}
      <Box>
        <Grid
          container
          className="sort-box"
          sx={{ mt: "1rem" }}
        >

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={report.vendorId}
                onChange={(e) => {
                  changeVendor(e)
                  setReport({
                    ...report,
                    vendorId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Vendor</div>
                </MenuItem>
                {vendor.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={report.siteId}
                onChange={(event) => {
                  changeSite(event)
                  setReport({
                    ...report,
                    siteId: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Site</div>
                </MenuItem>
                {sites.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={report.role}
                onChange={(event) => {
                  changeRole(event)
                  setReport({
                    ...report,
                    role: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Role</div>
                </MenuItem>
                {role.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={report.user}
                onChange={(event) => {
                  changeUser(event)
                  setReport({
                    ...report,
                    user: event.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select User</div>
                </MenuItem>
                {user.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <TableContainer component={Paper} sx={{ mx: "0.8rem", mt: "3rem", mb: "3rem" }} >
          <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" sx={tableHeader} >Compliance Overview</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Jan</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Feb</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Mar</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Apr</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>May</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jun</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jul</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Aug</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Sep</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Oct</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Nov</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Dec</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Number of guards worked on site</TableCell>
                {Object.keys(complience).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{complience[item]?.total}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Out of date inductions</TableCell>
                {Object.keys(complience).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{complience[item]?.outInduction}</TableCell>
                ))}

              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}  >Incorrect location clock ins</TableCell>
                {Object.keys(complience).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{complience[item]?.location}</TableCell>
                ))}

              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Out of date security license</TableCell>
                {Object.keys(complience).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{complience[item]?.outLicense}</TableCell>
                ))}
              </TableRow>

            </TableBody>

          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" sx={{ mx: "0.5rem", p: "1rem", position: 'relative' }} className="bar-box">

        <Bar options={optionsComplience} data={dataComplience} className="bar-chart" />

      </Box>


      {/* ****************inspection******************************** */}
      <Box>
        <Grid
          container
          className="sort-box"
          sx={{ mt: "1rem" }}
        >

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={inspection.vendorId}
                onChange={(e) => {
                  changeInspVendor(e)
                  setInspection({
                    ...inspection,
                    vendorId: e.target.value
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Vendor</div>
                </MenuItem>
                {vendor.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={inspection.siteId}
                onChange={(e) => {
                  changeInspSite(e)
                  setInspection({
                    ...inspection,
                    siteId: e.target.value 
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Site</div>
                </MenuItem>
                {sites.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={inspection.role}
                onChange={(e) => {
                  changeInspRole(e)
                  setInspection({
                    ...inspection,
                    role: e.target.value 
                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select Role</div>
                </MenuItem>
                {role.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "90%", backgroundColor: "white" }}>
              <Select
                value={inspection.user}
                onChange={(e) => {
                  changeInspUser(e)
                  setInspection({
                    ...inspection,
                    user: e.target.value 

                  })
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  borderRadius: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderColor: "#707070",
                }}
              >
                <MenuItem value="">
                  <div className="selectitem">Select User</div>
                </MenuItem>
                {user.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <TableContainer component={Paper} sx={{ mx: "0.8rem", mt: "3rem", mb: "3rem" }} >
          <Table sx={{ minWidth: 'auto' }} aria-label="custom pagination table" className="responsive-table">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" sx={tableHeader} >Inspections and Reports Overview</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Jan</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Feb</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Mar</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Apr</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>May</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jun</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Jul</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}>Aug</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Sep</TableCell>
                <TableCell align="left" component="th" sx={tableHeader}  >Oct</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Nov</TableCell>
                <TableCell align="left" component="th" sx={tableHeader} >Dec</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Fire alarm reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.fireAlarm}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Incident reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.incident}</TableCell>
                ))}

              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader}  >Trespassing reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.tearPass}</TableCell>
                ))}

              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Hazards reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.hazard}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Vadalism reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.vandalism}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Break in reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.breakIn}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Bomb threat reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.bomb}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Injury reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.injury}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Periodic inspection reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.periodic}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Suspicious activity reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.suspecious}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Loss property reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.loss}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >Theft reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.theft}</TableCell>
                ))}
              </TableRow>
              <TableRow className="tableRow">
                <TableCell align="left" component="th" sx={tableHeader} >First aid reports</TableCell>
                {Object.keys(inspections).map((item)=>(
                  <TableCell align="left" component="th" sx={tableHeader} key={item}>{inspections[item]?.firstAid}</TableCell>
                ))}
              </TableRow>
            </TableBody>

          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" sx={{ mx: "0.5rem", p: "1rem", position: 'relative' }} className="bar-box">

        <Bar options={optionsInspection} data={dataInspection} className="bar-chart" />

      </Box>


    </Box>
  );
}


