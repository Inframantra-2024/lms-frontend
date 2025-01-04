import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../Helpers/axiosInstance';

const initialState = {
    categoryList: [],
};

// Fetch all categories
export const getAllCategory = createAsyncThunk("category/getAll", async () => {
    const loadingMessage = toast.loading("Fetching categories...");
    try {
        const res = await axiosInstance.get("/category");
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.categoryList = action?.payload?.categories; // Match your API structure
        });
    },
});

export default categorySlice.reducer;
