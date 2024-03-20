import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from "./userService"
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const loginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getUserProductWishlist = createAsyncThunk('user/wishlist', async (thunkAPI) => {
  try {
    return await authService.getUserWishlist();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const addProToCart = createAsyncThunk('user/cart/add', async (cartData, thunkAPI) => {
  try {
    return await authService.addToCart(cartData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getUserCart = createAsyncThunk('user/cart/get', async (thunkAPI) => {
  try {
    return await authService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const deleteCartProduct = createAsyncThunk('user/cart/product/delete', async (id, thunkAPI) => {
  try {
    return await authService.removeProductFromCart(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const updateCartProduct = createAsyncThunk('user/cart/product/update', async (cartDetail, thunkAPI) => {
  try {
    return await authService.updateProductFromCart(cartDetail);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const createAnOrder = createAsyncThunk('user/cart/create-order', async (cartData, thunkAPI) => {
  try {
    return await authService.createOrder(cartData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getOrders = createAsyncThunk('user/order/get', async (thunkAPI) => {
  try {
    return await authService.getUserOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


const getUserfromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null

const initialState = {
  user: getUserfromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.success("User Created Successfully")
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message || "Something went wrong")
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;

        if (state.isSuccess === true) {
          localStorage.setItem('token', action.payload.token);
          toast.success("User logged in Successfully")
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message || "Something went wrong")
        }
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload;

      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(addProToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Product added to cart successfully")
        }
      })
      .addCase(addProToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message || "Something went wrong")
        }
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedCartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Product Deleted from cart successfully")
        }
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message || "Something went wrong")
        }
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedCartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Product updated from cart successfully")
        }
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message || "Something went wrong")
        }
      })
      .addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orderedProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Ordered successfully")
        }
      })
      .addCase(createAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message || "Something went wrong")
        }
      })

      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getorderedProduct = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
  }
})

export default authSlice.reducer;