import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contactService from "./contactService"
import { toast } from 'react-toastify';

export const createQuery = createAsyncThunk('contact/post', async (contactData, thunkAPI) => {
  try {
    return await contactService.postQuery(contactData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

const initialState = {
  contact: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
}


export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.contact = action.payload;
        if (state.isSuccess === true) {
          toast.success("Contact Form submitted Successfully")
        }
      })
      .addCase(createQuery.rejected, (state, action) => {
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

export default contactSlice.reducer;