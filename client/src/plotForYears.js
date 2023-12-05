import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,
		Legend, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
const CustomTooltip = ({ active, payload, label }) => {
	
	if (active && payload && payload.length) {
		console.log("pay",payload[0].payload)
		console.log("full",payload)
	  return (
		<div className="custom-tooltip" style={{ backgroundColor: 'AliceBlue', padding: '5px' }}>
		  <p className="label">{`Year: ${label}`}</p>
		  <p className='topC'>{`topCategory:${payload[0].payload.topCategory}`}</p>
		<p className='brand'>{`brand:${payload[0].payload.brand}`}</p>
		<p className='count'>{`count:${payload[0].payload.count}`}</p>
		</div>
	  );
	}
  
	return null;
  };
const getXY = (selector)=>{
	const data = []

	const amazon =selector.filter((item)=> item.brand === "Amazonbasics")
	const years =[]
	const pc = []
	const count = []
	amazon.forEach(ele => {
		years.push(ele.year)
		pc.push(ele.topCategory)
		count.push(ele.count)
	});
	console.log("sel",amazon);
	return {amazon,years,pc,count}
}

const PlotForYears = () => {
	const selector = useSelector(state => state.BSYears.data)
	// const {amazon,years,pc,count } =getXY(selector)
	
	const amazon =selector.filter((item)=> item.brand === "Amazonbasics")

	return (
		<BarChart width={700} height={400} data={amazon} margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }} >
			<CartesianGrid  strokeDasharray="3 3" />
			<XAxis dataKey="year" />
			<YAxis />
			<Tooltip content={<CustomTooltip />}/>
			<Legend />
			<Bar dataKey="count" barSize={30} fill="#8884d8" />
		</BarChart>
	);
}

export default PlotForYears;