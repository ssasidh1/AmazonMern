
import {createSlice} from '@reduxjs/toolkit'

const trendSlice = createSlice({
    name:"trendsByYears",
    initialState:{
        data:[]
    },
    reducers:{
        getTrends :(state, actions) =>{
            state.data = actions.payload.map((item,ind)=>{
                return {
                     year:item.year,
                     brand: item.brand,
                     count: item.count}
                })
        }
    }
})

export const {getTrends} = trendSlice.actions;
export default trendSlice.reducer;