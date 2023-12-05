import {createSlice} from '@reduxjs/toolkit'

const yearSlice = createSlice({
    name:"ByYears",
    initialState:{
        data:[]
    },
    reducers:{
        getYRData :(state, actions) =>{
            state.data = actions.payload.map((item,ind)=>{
                return {id:ind, 
                    year:item.year,
                     brand: item.brand,
                     pC : item.primaryCategories,
                     count: item.count}
                })
        }
    }
})

export const {getYRData} = yearSlice.actions;
export default yearSlice.reducer;