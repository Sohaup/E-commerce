import { getBrands } from "@/services/brandApi";
import { BrandStateType } from "@/types/brandTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBrandsData = createAsyncThunk("brandSlice/get", getBrands);

const initialState: BrandStateType = {
    loading: false,
    error: false,
    brands: []
}

const brandSlice = createSlice({
    name: "Brands Slice",
    initialState,
    reducers: {

    },
    extraReducers: async function (builder) {
        builder.addCase(getBrandsData.pending, (prevState) => {
            prevState.loading = true;
            prevState.error = false;
        });
        builder.addCase(getBrandsData.rejected, (prevState) => {
            prevState.loading = false;
            prevState.error = true;
        });
        builder.addCase(getBrandsData.fulfilled, (prevState, action) => {
            prevState.loading = false;
            prevState.error = false;
            prevState.brands = action.payload;
        });
    }
});

export default brandSlice.reducer;