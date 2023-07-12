import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosSetup";
import { toast } from "react-toastify";
const toastObj = {position: toast.POSITION.TOP_RIGHT};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login/otp", { email, otp });
  
      return res.data;
    } catch (error) {
       toast.warning('please Enter Valid Email Or OTP!',toastObj);
      return rejectWithValue(error.message || error.msg);
      
    }
  }
);

export const loginUserOtp = createAsyncThunk(
  "auth/loginUserOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email });

      return res.data;
    } catch (error) {
       toast.warning('please Enter Valid Email Or OTP!',toastObj);
      return rejectWithValue(error.message || error.msg);
    }
  }
);
