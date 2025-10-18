import { getCategories } from "@/services/categoryApi";
import { CategoryStateType } from "@/types/categoryType";
import { createSlice  , createAsyncThunk} from "@reduxjs/toolkit";

export const getCategoriesData = createAsyncThunk("categorySlice/get" , getCategories);

const initialState:CategoryStateType = {
    loading:false ,
    error:false ,
    categories:[]
}
const categorySlice = createSlice({
    name:"categories slice" ,
    initialState ,
    reducers:{

    } ,
    extraReducers:async function(builder) {
        builder.addCase(getCategoriesData.pending , (prevState)=> {
            prevState.loading = true;
            prevState.error = false;
        });
        builder.addCase(getCategoriesData.rejected , (prevState)=> {
            prevState.loading = false;
            prevState.error = true;
        });
        builder.addCase(getCategoriesData.fulfilled , (prevState , action)=> {
            prevState.loading = false;
            prevState.error = false;
            prevState.categories = action.payload;
        });
    }
});

export default categorySlice.reducer