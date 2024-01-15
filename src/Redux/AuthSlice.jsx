import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./Helper";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
   redirectTo: null,
   isToggle: false,
   
};
export const register = createAsyncThunk(
   "/user/signup",
   async (formdata) => {
      let res = await axiosInstance.post(`/user/signup`, formdata)
      let resdata = res?.data
      return resdata;
   }
)
export const signin = createAsyncThunk(
   "/user/signin",
   async (formdata) => {
      let res = await axiosInstance.post(`/user/signin`, formdata)
      let resdata = res?.data
      return resdata
   }
)

export const AuthSlice = createSlice({
   name: "Registration",
   initialState,
   reducers: {
      Token_remove: (state, { payload }) => {
         localStorage.removeItem("token");
         localStorage.removeItem("profile_pic");
         state.isToggle = false;
         toast("Logout SuccessFull");
      },
      reset_redirectTo: (state, { payload }) => {
         state.redirectTo = payload;
         state.isToggle = true;
      },
   },

   extraReducers: (builder) => {
      builder

         .addCase(register.pending, (state, action) => {
            state.status = "pending";
         })
         .addCase(register.fulfilled, (state, { payload }) => {
            state.status = "idle";
            if (payload.status === 200) {
               toast(payload.message);
            }
         })
         .addCase(register.rejected, (state, action) => {
            state.status = "idle";
         })

         .addCase(signin.pending, (state, action) => {
            state.status = "pending";
         })

         .addCase(signin.fulfilled, (state, { payload }) => {
            state.status = "idle";
            if (payload.status === 200) {
               localStorage.setItem("token", payload.token)
               localStorage.setItem("profile_pic", payload.data.profile_pic)
               localStorage.setItem("firstName",payload.data.first_name);
               toast(payload.message);
               state.redirectTo = "/list";
            }
            else {
               toast(payload.message);
            }
         })
         .addCase(signin.rejected, (state, action) => {
            state.status = "idle"
         })

   }
});
export const { Token_remove, reset_redirectTo } = AuthSlice.actions