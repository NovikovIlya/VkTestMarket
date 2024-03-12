import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk("post/getData", async () => {
  const { data } = await axios.get("https://dummyjson.com/products?limit=6");
  return data.products.map((item: any) => {
    return { ...item, count: 1 };
  });
});

const initialState = {
  products: [],
  totalPrice: 0,
  isLoad: true,
  isError:false,
};

export const sliceData = createSlice({
  name: "sliceData",
  initialState,
  reducers: {
    changeQuantity(state, action) {
      const product = state.products.find(
        (product: any) => product.id === action.payload.id
      );
      if (product) {
        if (action.payload.operation === "plus") {
          // @ts-ignore
          product.count = product.count + 1;
        }
        if (action.payload.operation === "minus") {
          // @ts-ignore
          product.count = product.count - 1;
        }

        state.totalPrice = state.products.reduce(
          (acc, product: any) => acc + product.price * product.count,
          0
        );
      }
    },
    updateTotalPrice(state) {
      state.totalPrice = state.products.reduce(
        (acc, product: any) => acc + product.price * product.count,
        0
      );
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(
        (product: any) => product.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.products = [];
      state.isLoad = true;
      state.isError = false;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoad = false;
      state.isError = false;
    });
    builder.addCase(getData.rejected, (state) => {
      state.products = [];
      state.isLoad = false;
      state.isError = true;
    });
  },
});

export const { updateTotalPrice, changeQuantity, deleteProduct } =
  sliceData.actions;
export default sliceData.reducer;
