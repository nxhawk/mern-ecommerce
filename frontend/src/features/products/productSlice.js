import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from "./productService"
import { toast } from 'react-toastify';

export const getAllProducts = createAsyncThunk('product/get', async (data, thunkAPI) => {
  try {
    return await productService.getProducts(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getAProduct = createAsyncThunk('product/getAProduct', async (id, thunkAPI) => {
  try {
    return await productService.getSingleProduct(id);
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


export const addRating = createAsyncThunk('product/rating', async (data, thunkAPI) => {
  try {
    return await productService.rateProduct(data);
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
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleproduct = action.payload;
        state.message = 'Product Fetched successfully'
      })
      .addCase(getAProduct.rejected, (state, action) => {
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

      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.rating = action.payload;
        state.message = "Rating Added Successfully!";
        if (state.isSuccess === true) {
          toast.success("Rating added Successfully")
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message || "Something went wrong")
        }
      })
  }
})

export default productSlice.reducer;