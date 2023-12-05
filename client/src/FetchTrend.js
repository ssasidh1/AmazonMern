import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { getYRData } from './redux/yearSlice';
import { getTrends } from './redux/trendSlice';
import PlotTrend from './plotTrend';

const FetchTrend = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.trendByYears.data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/trends');
        console.log("inside",response)
        const jsonData = await response.json();
        dispatch(getTrends(jsonData))
        console.log("json",jsonData)
      } catch (error) {
        console.error('Error inn fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <PlotTrend />
     
    </div>
  );
};

export default FetchTrend;