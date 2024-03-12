import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getData = createAsyncThunk('post/getData', async () => {
  const { data } = await axios.get('https://dummyjson.com/products?limit=6');
  return data.products.map((item:any)=>{
    return {...item,count:1}
  });
});

const initialState = {
  products: [],
  totalPrice: 0,
  isLoad:false,
};

export const sliceData = createSlice({
  name: "sliceData",
  initialState,
  reducers: {
    changeQuantity(state, action) {
      const product = state.products.find((product:any) => product.id === action.payload.id);
      if (product) {
        // @ts-ignore
        product.count = action.payload.newQuantity;
        state.totalPrice = state.products.reduce((acc, product:any) => acc + product.price * product.count, 0);
      }
    },
    updateTotalPrice(state) {
      state.totalPrice = state.products.reduce((acc, product:any) => acc + product.price * product.count, 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.products = [];
      state.isLoad = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoad = false;
    });
    builder.addCase(getData.rejected, (state) => {
      state.products = [];
      state.isLoad = false;
    });
  },
});

export const {  updateTotalPrice } = sliceData.actions;
export default sliceData.reducer;
