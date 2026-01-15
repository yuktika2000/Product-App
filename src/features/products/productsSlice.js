import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchProducts= createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch("https://fakestoreapi.com/products")
        return response.json();
    }
)
const productsSlice= createSlice({
    name:'products',
    initialState:{
        items:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchProducts.pending,(state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled,(state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
}
);

export default productsSlice.reducer;