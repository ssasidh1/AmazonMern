import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from './plotTrendBar';
const PlotTrend = ({data,x,y,tooltip}) => {

    // const selector = useSelector(state => state.trendByYears.data)
    
    console.log("am",data)
    
    
    
    return (null === data )? <h3>.....loading</h3>:(
        <LineChart
          width={700}
          height={700}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={x} >
          
            </XAxis>
          <YAxis dataKey={y} domain={[-100,'dataMax']}/>
          <Tooltip content={<CustomTooltip x={x} y={y} tooltip={tooltip}/>} />
          <Legend />
          <Line type="monotone" dataKey={y} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
    );
}


export default PlotTrend;
