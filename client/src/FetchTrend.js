import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getYRData } from './redux/yearSlice';
import { getTrends } from './redux/trendSlice';
import PlotTrend from './plotTrend';


let params = {

}
const FetchTrend = ({endpoint,x,y, tooltip,title,custom,scaleX,scaleY}) => {
  // const dispatch = useDispatch();
  // const selector = useSelector(state => state.trendByYears.data)

  const [data, setData] = useState(null);
  const [brand, setBrand] = useState("Amazon");


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("endpoint",endpoint,brand);
        
        let url=endpoint
        if(custom === "brand" ) url=url+brand;
        const response = await fetch(url);
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
  }, [brand]);

  return (
    <div>
      <center>
        {console.log(" BRANDY ",custom!=="brand")}
      <div >
      <select value={brand}  className={custom === "brand" ? "brandSelector":"hidden" } onChange={(event)=>setBrand(event.target.value)}>
        <option value="Amazon">Amazon Brand</option>
        <option value="Amazonbasics">Amazonbasics</option>
      </select>
      <h3 className='title'>{title}</h3>
      </div>
      </center>
      <PlotTrend scaleX={scaleY} scaleY={scaleX} data={data} x={x} y={y} tooltip={tooltip} />

    </div>
  );
};

export default FetchTrend;