import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./Helper";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify"; 
const initialState = {
  listData: [{}],
  totalRecords: [{}],
  det:""
};
export const create = createAsyncThunk(
  "/product/create",

  async (formData) => {
     let res = await axiosInstance.post(`/product/create`, formData);

    let resData = res?.data;

    return resData;
  }
);


export const list = createAsyncThunk(
  "/product/list",

  async (formData) => {
    let res = await axiosInstance.post(`/product/list`, formData);

    let resData = res?.data;

    return resData;
  }
);
export const remove = createAsyncThunk(
  "/product/remove",

  async (formData) => {
    let res = await axiosInstance.post(`/product/remove`, formData);

    let resData = res?.data;

    return resData;
  }
);

export const update = createAsyncThunk(
  "/product/update",

  async (formData) => {
    let res = await axiosInstance.post(`/product/update`, formData);

    let resData = res?.data;

    return resData;
  }
);



export const productDetails = createAsyncThunk(
  "/product/detail",

  async (id) => {
    let res = await axiosInstance.get(`/product/detail/${id}`);

    let resData = res?.data;

    return resData;
  }
);

export const CrudSlice = createSlice({
  name: "create",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      .addCase(create.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(create.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if(payload.status===200){
          toast(payload.message)
        }
      })
      .addCase(create.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(list.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(list.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.status === 200) {
          state.listData = payload.data;
          state.totalRecords = payload.totalRecords;
        }
      })
      .addCase(list.rejected, (state, action) => {
        state.action = "idle";
      })




      .addCase(remove.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(remove.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.status === 200) {
          state.totalRecords = payload.totalRecords;
          toast(payload.message)
        }
      })
      .addCase(remove.rejected, (state, action) => {
        state.status = "idle";
      })



      .addCase(update.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(update.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.status === 200) {
          state.totalRecords = payload.totalRecords;
          toast(payload.message)
        }
      })
      .addCase(update.rejected, (state, action) => {
        state.status = "idle";
      })



      .addCase(productDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(productDetails.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.status === 200) {
          state.det = payload.data;
         
        }
      })
      .addCase(productDetails.rejected, (state, action) => {
        state.status = "idle";
      })


  },
})

export const { } = CrudSlice.actions