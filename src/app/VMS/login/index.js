/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from "@mui/material/colors";
import LoginBgImage from "../../../assets/images/login.jpg";
import Logo from "../../../assets/images/logo.png"
import { selectAuth } from "../../../features/auth/authSlices";
import { Controller, useForm } from "react-hook-form";
import { companyLogin } from "../../utils/companyAuth";

import { postAPI } from "../../network";

const theme = createTheme();

theme.typography.h5 = {
  fontSize: '20px',
  textAlign: 'center',
  '@media (min-width:600px)': {
    fontSize: '20px',
    fontWeight: 900,

  },
  [theme.breakpoints.up('md')]: {
    fontSize: '20px',
  },
};

theme.typography.h6 = {
  backgroundColor: '#457B9D',
  color: 'white',
  fontSize: '13px',
  padding: '10px',
  borderRadius: '8px',
  fontWeight: 500,
  marginTop: '20px',
  height:'110px',

  '@media (min-width:600px)': {
    fontSize: '10px',
  },
}
theme.typography.subtitle2={
  padding:'10px'
}




function VMS() {
  const navigateTo = useNavigate();
  const { state } = useLocation();

  const { loading, error, isAuthenticated } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [otpForm, setOtpForm] = useState(false)
  const [email, setEmail] = useState('')

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      otp: "",
      password: ""
    },
  });

  const onSubmit = (form) => {
    console.log(form)
    // dispatch(loginUser({ ...form, otp: parseInt(form.otp) }));
  };


  const handleUserOtp = (form) => {
    console.log(form)
    // dispatch(loginUserOtp({ ...form}))
  }

  const handleLogin = async (form) => {
    const { email, password } = form;
    let payload = {
      email: email,
      password: password
    }
    console.log('INNNNNNN')
    console.log(email)
    let data = await postAPI('/vms/auth/login/otp', payload);
    if (data) {
      setEmail(email)
      setOtpForm(true)
    }
  }

  const handleOtp = async (form) => {
    const { otp } = form;
    let payload = {
      email: email,
      otp: otp
    }

    let data = await companyLogin('/vms/auth/login', payload);
    if (data) {
      window.token = data.data.accessToken
      let success = await localStorage.setItem('token', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.data));
      localStorage.setItem('userType', 'company');
      localStorage.setItem('permissions', JSON.stringify(data.data.permissions));
      window.location = window.location.origin + '/company'
      // return navigateTo('/company')
    }
  }

  useEffect(() => {
    console.log('ORIGIN', window.location.origin)
    if (isAuthenticated) return navigateTo(state?.path || "/");
  }, [isAuthenticated]);

  return (
    
           <>
           

           <Grid sx={{ width: '100%', display: 'flex', justifyContent: "center", }}>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '60%' }}>
                  <img width='200px' height='200px' src={Logo}></img>

                  <ThemeProvider theme={theme}>
                    <Typography className="title-font" component="h6" variant="h5"> Welcome! Please enter the details below to Check In</Typography>

                    <Typography variant="h6">
                      <p>Client Name:-  <strong>John Smith</strong> </p>
                      <p>Site Name:-  <strong>111 George St</strong></p>
                      <p>Site Address:- <strong>111 George St, Sydney NSW</strong></p>
                    </Typography>




                  </ThemeProvider>

               


           
              {
                !otpForm &&
                <Grid item xs={7} justifyContent="center" display="flex">
                  <Controller
                    name={"email"}
                    control={control}
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email Address",
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        fullWidth
                        label="Email"
                        variant="standard"
                        type="email"
                        required
                        onChange={onChange}
                        value={value}
                        sx={{ borderColor: red[100] }}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email?.message : null}
                      />
                    )}
                  />
                </Grid>
              }

              {
                otpForm &&
                <Grid item xs={7} justifyContent="center" display="flex">
                  <Controller
                    name="otp"
                    control={control}
                    rules={{
                      required: "An OTP is Required",
                      minLength: {
                        value: 4,
                        message: "Value should be more than 4!",
                      },
                      maxLength: {
                        value: 4,
                        message: "Value can't be more than 4!",
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        fullWidth
                        label="Enter OTP"
                        id="otp"
                        variant="standard"
                        name="otp"
                        type="text"
                        required
                        onChange={onChange}
                        value={value}
                        error={!!errors.otp}
                        helperText={errors.otp ? errors.otp?.message : null}
                      />
                    )}
                  />
                </Grid>
              }

              {
                otpForm &&
                <Grid item xs={7} justifyContent="end" display="flex">
                  <Button sx={{ float: "right" }} onClick={handleUserOtp}>OTP</Button>
                </Grid>
              }
              {
                otpForm &&
                <Grid item xs={7} justifyContent="center" display="flex">
                  <Button sx={{ float: "left" }} onClick={handleSubmit(handleUserOtp)}>Resend OTP</Button>
                </Grid>
              }


              <Grid item xs={7} justifyContent="center" display="flex">
                <Typography component="p" variant="subtitle2"  color={grey[500]}>
                 <p className="m-10 text-center "> We will send you an One Time OTP on your email</p>
                </Typography>
              </Grid>
               <Grid item xs={7} justifyContent="center" display="flex">
                <Button
                  sx={{
                    float: "right",
                    mt: 5,
                    backgroundColor: "#42505C",
                    color: "white",
                    px: 5,
                    "&:hover": {
                      backgroundColor: "#343636",
                    },
                  }}
                  variant="contained"
                  // onClick={handleSubmit(onSubmit)}
                  onClick={otpForm ? handleSubmit(handleOtp) : handleSubmit(handleLogin)}
                 
                  disabled={loading}
                >
                  {otpForm ? 'Verify' : 'Login'}
                </Button> 
              </Grid> 
              {/* <Grid item xs={7} justifyContent="center" display="flex" sx={{ mt: 8 }}>
                <Link href="/login" underline="always" sx={{ fontWeight: 'bold', color: 'gray', textDecorationColor: 'gray' }}>
                  Admin Login
                </Link><br></br>

                <Link href="/company/login" underline="always" sx={{ fontWeight: 'bold', color: 'gray', textDecorationColor: 'gray' }}>
                  Company Login
                </Link>
              </Grid> */}
               </Box>
            </Grid>

          
           
          
          
           
           
           
           </>
              

  )
}

export default VMS;
