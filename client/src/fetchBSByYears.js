import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { getYRData } from './redux/yearSlice';
import PlotForYears from './plotForYears';
const FetchByYears = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.BSYears.data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        console.log("inside",response)
        const jsonData = await response.json();
        dispatch(getYRData(jsonData))
        console.log("json",jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <PlotForYears />
    </div>
  );
};

export default FetchByYears;