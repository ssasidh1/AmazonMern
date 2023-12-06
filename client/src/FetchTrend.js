import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getYRData } from './redux/yearSlice';
import { getTrends } from './redux/trendSlice';
import PlotTrend from './plotTrend';


let params = {

}
const FetchTrend = ({endpoint,x,y, tooltip}) => {
  // const dispatch = useDispatch();
  // const selector = useSelector(state => state.trendByYears.data)

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("endpoint",endpoint);
        const response = await fetch(endpoint);
        console.log("inside", response)
        const jsonData = await response.json();
        // dispatch(getTrends(jsonData))
        setData(jsonData);
        console.log("json", jsonData)
      } catch (error) {
        console.error('Error inn fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <PlotTrend data={data} x={x} y={y} tooltip={tooltip} />

    </div>
  );
};

export default FetchTrend;