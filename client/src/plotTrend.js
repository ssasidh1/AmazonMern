import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Label,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from './plotTrendBar';
const PlotTrend = ({data,x,y,tooltip,scaleX,scaleY}) => {

    // const selector = useSelector(state => state.trendByYears.data)
    
    console.log("am",data)
    
    
    
    return (null === data )? <h3>.....loading</h3>:(
        <LineChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 20,
            bottom: 20,
          }}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={x} >
          <Label value={x} offset={0} position="insideBottom" />
            </XAxis>
          <YAxis dataKey={y} domain={['dataMin','dataMax']} label={{ value: y, angle: -90, position: 'insideLeft' }}/>
          <Tooltip content={<CustomTooltip x={x} y={y} tooltip={tooltip}/>} />
          {/* <Legend /> */}
          <Line type="monotone" dataKey={y} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
    );
}


export default PlotTrend;
