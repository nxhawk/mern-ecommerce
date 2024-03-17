import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from "./productService"

export const getAllProducts = createAsyncThunk('product/get', async (thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const addToWishlist = createAsyncThunk('product/wishlist', async (proId, thunkAPI) => {
  try {
    return await productService.addToWishlist(proId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

const initialState = {
  product: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
}


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.addToWishlist = action.payload;
        state.message = "Product Added To Wishlist!";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
  }
})

export default productSlice.reducer;