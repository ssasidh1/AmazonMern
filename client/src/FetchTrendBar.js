import React, { useEffect, useState } from 'react';
import {PlotTrendBar} from './plotTrendBar';

const FetchTrendBar = ({x,y, tooltip,endpoint}) => {
  // const dispatch = useDispatch();
  // const selector = useSelector(state => state.trendByYears.data)

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetchBar endpoint",endpoint);
        const response = await fetch(endpoint);
        console.log("inside fetchBar", response)
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
      <PlotTrendBar data={data} x={x} y={y} tooltip={tooltip} />

    </div>
  );
};
export default FetchTrendBar;