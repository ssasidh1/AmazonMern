import {configureStore} from '@reduxjs/toolkit'
import yearSlice from './yearSlice'
const store = configureStore({
    reducer:{
        BSYears: yearSlice
    }
})

export default store;