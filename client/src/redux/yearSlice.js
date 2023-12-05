import {createSlice} from '@reduxjs/toolkit'

const yearSlice = createSlice({
    name:"ByYears",
    initialState:{
        data:[]
    },
    reducers:{
        getYRData :(state, actions) =>{
            state.data = actions.payload.map((item,ind)=>{
                return {
                    year:item.year,
                     brand: item.brand,
                     topCategory : item.topCategory,
                     count: item.count}
                })
        }
    }
})

export const {getYRData} = yearSlice.actions;
export default yearSlice.reducer;