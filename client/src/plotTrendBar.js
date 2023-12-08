import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,
		Legend, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
export const CustomTooltip = ({ x,tooltip,y,active, payload, label }) => {
	
	if (active && payload && payload.length) {
		
		// console.log("Active",active)
		// console.log("label",label)
		// console.log("full",payload)
		// console.log("y ",y)
		// console.log("tooltip",tooltip)
	  return (
		<div className="custom-tooltip" style={{ backgroundColor: 'AliceBlue', padding: '5px' }}>
		  <p className="label">{`${x}: ${label}`}</p>
		  {/* <p className='topC'>{`topCategory:${payload[0].payload.topCategory}`}</p> */}
		<p className='brand'>{`${tooltip}:${payload[0].payload[tooltip]}`}</p>
		<p className='count'>{`${y}:${payload[0].payload[y]}`}</p>
		</div>
	  );
	}
  
	return null;
  };
// const barChart = ({data,x,y,tooltip}) => {
// 	// const selector = useSelector(state => state.BSYears.data)
// 	// const {amazon,years,pc,count } =getXY(selector)
	
// 	// const amazon =selector.filter((item)=> item.brand === "Amazonbasics")

// 	return (
// 		<BarChart width={700} height={400} data={data} margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }} >
// 			<CartesianGrid  strokeDasharray="3 3" />
// 			<XAxis dataKey={x} />
// 			<YAxis />
// 			<Tooltip content={<CustomTooltip />}/>
// 			<Legend />
// 			<Bar dataKey={y} barSize={30} fill="#8884d8" />
// 		</BarChart>
// 	);
// }


export const PlotTrendBar = ({data,x,y,tooltip}) => {

	// const selector = useSelector(state => state.trendByYears.data)
	
	console.log("am",data,x,y,tooltip)
	
	
	return (null === data )? <h3>.....loading</h3>:(
		<BarChart width={700} height={400} data={data} margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }} >
			<CartesianGrid  strokeDasharray="3 3" />
			<XAxis dataKey={x} />
			<YAxis />
			<Tooltip content={<CustomTooltip tooltip={tooltip} y={y} />}/>
			<Legend />
			<Bar dataKey={y} barSize={30} fill="#8884d8" />
		</BarChart>
	);
  }
  

