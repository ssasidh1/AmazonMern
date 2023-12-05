import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const PlotTrend = () => {

    const selector = useSelector(state => state.trendByYears.data)
    const amazon =selector.filter((item)=> item.brand === "Amazonbasics")
    console.log("am",amazon)
    return (
        <LineChart
          width={500}
          height={300}
          data={amazon}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
    );
}

export default PlotTrend;
