import {createSlice} from '@reduxjs/toolkit';

const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
const favoritesSlice = createSlice({
    name:'favorites',
    initialState:{
        items:savedFavorites,
    },
    reducers:{
        addToFavorites:(state,action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if(!existingItem){
                state.items.push(action.payload);
                localStorage.setItem('favorites', JSON.stringify(state.items))
            }
            console.log(state.items);
        },
        removeFromFavorites:(state,action) =>{
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if(index !== -1){
                state.items.splice(index,1);
            }
            localStorage.setItem('favorites', JSON.stringify(state.items))
        }
    }
})

export const {addToFavorites, removeFromFavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;