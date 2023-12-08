import React, { useEffect, useState } from 'react';
import {PlotTrendBar} from './plotTrendBar';

const FetchTrendBar = ({x,y, tooltip,endpoint,height,width,title,custom}) => {
  // const dispatch = useDispatch();
  // const selector = useSelector(state => state.trendByYears.data)

  const [data, setData] = useState(null);
  const [brand, setBrand] = useState("Amazon");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetchBar endpoint",endpoint);
        let url = endpoint;
        if(custom === "brand" ) url=url+brand;

        
        const response = await fetch(url);
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
  }, [brand]);

  return (
    <div>
      {/* <center><h3 className='title'>{title}</h3></center>
       */}
         <center>
        {console.log(custom!=="brand")}
      <div >
      <select className={custom === "brand" ? "brandSelector":"hidden" }  value={brand} onChange={(event)=>setBrand(event.target.value)}>
        <option value="Amazon">Amazon Brand</option>
        <option value="Amazonbasics">Amazonbasics</option>
      </select>
      <h3 className='title'>{title}</h3>
      </div>
      </center>
      <PlotTrendBar data={data} x={x} height={height} width={width} y={y} tooltip={tooltip} />

    </div>
  );
};
export default FetchTrendBar;