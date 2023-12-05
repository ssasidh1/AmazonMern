import {configureStore} from '@reduxjs/toolkit'
import yearSlice from './yearSlice'
import trendSlice from './trendSlice';
const store = configureStore({
    reducer:{
        BSYears: yearSlice,
        trendByYears:trendSlice
    }
})

export default store;