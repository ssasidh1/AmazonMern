import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,
		Legend, Tooltip } from 'recharts';

const PlotForYears = () => {

	// Sample data
	const data = [
		{ name: "A", x: 30, y: 60 },
		{ name: "B", x: 12, y: 88 },
		{ name: "C", x: 15, y: 85 },
		{ name: "D", x: 35, y: 65 },
		{ name: "E", x: 54, y: 46 },
		{ name: "F", x: 72, y: 28 },
		{ name: "G", x: 32, y: 68 }
	];

	return (
		<BarChart width={500} height={500} data={data} >
			<CartesianGrid />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="x" stackId="a" fill="aqua" />
			<Bar dataKey="y" stackId="a" fill="green" />
		</BarChart>
	);
}

export default PlotForYears;