import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialType, Product } from "../types/types";

export const getData = createAsyncThunk("post/getData", async () => {
  const { data } = await axios.get("https://dummyjson.com/products?limit=6");
  return data.products.map((item: Product) => {
    return { ...item, count: 1 };
  });
});


const initialState: InitialType = {
  products: [],
  totalPrice: 0,
  isLoad: true,
  isError:false,
};

export const sliceData = createSlice({
  name: "sliceData",
  initialState,
  reducers: {
    // Изменения общей цены
    changeQuantity(state, action) {
      // Находим продукт
      const product: Product | undefined = state.products.find(
        (product: any) => product.id === action.payload.id
      );
      if (product) {
        // Меняем кол-во на + или -
        if (action.payload.operation === "plus") {
          product.count = (product.count ? product.count : 1) + 1;
        }
        if (action.payload.operation === "minus") {
          product.count = (product.count ? product.count : 1) - 1;
        }
        // Подсчитываем итог
        state.totalPrice = state.products.reduce(
          (acc, product:Product) => acc + product.price * (product.count ? product.count : 1),
          0
        );
      }
    },
    // Удаление товара
    deleteProduct(state, action) {
      state.products = state.products.filter(
        (product: any) => product.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    // Получение товаров
    builder.addCase(getData.pending, (state) => {
      state.products = [];
      state.isLoad = true;
      state.isError = false;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoad = false;
      state.isError = false;
      // Подсчет первоначального итого
      state.totalPrice = state.products.reduce(
        (acc, product: any) => acc + product.price * product.count,
        0
      );
    });
    builder.addCase(getData.rejected, (state) => {
      state.products = [];
      state.isLoad = false;
      state.isError = true;
    });
  },
});

export const {  changeQuantity, deleteProduct } =
  sliceData.actions;
export default sliceData.reducer;
