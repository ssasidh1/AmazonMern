
import React, { useState } from 'react';
import FetchTrendBar from './FetchTrendBar';
import FetchTrend from './FetchTrend'
import "./App.css";
const App = () => {
  
          
  return (
  <>
  <h1><center>Amazon Reviews Analysis</center></h1>
  <div className='graphs' >
    
    <FetchTrendBar custom="na" title={"Best Selling product per Manufacturer"} x="manufacturer" width={700} height={500} y="bestSellerRating" tooltip="bestSeller" endpoint={'/api/manu/bestseller'}/>

    <FetchTrend scaleX={2} scaleY={7} custom="brand" title={"Trend over the years"} x="year" y="Rating" tooltip="brand" endpoint={'/api/cat/trends/'}/>
    <FetchTrend   width={700} height={400} custom="brand" title={"Best Categories per Brand over the years"} x="year" y="Rating" tooltip="topCategory" endpoint={'/api/cat/best/year/'}/>
    
    
    <FetchTrend scale custom={"na"} title="Best Selling product over the years" x="year" y="avgRating"  width={600} height={400} tooltip="name" endpoint={'/api/products/best/year'}/>
    <FetchTrend custom="na" x="year" y="avgRating" title={"Top Manufacturer Over the years"}width={600} height={400}  tooltip="manufacturer" endpoint={'/api/manu/best/year'}/>
    {/* <FetchTrendBar x="year" custom="na" y="avgRating"  width={700} height={400} tooltip="name" endpoint={'/api/products/best/year'}/>  */}
    {/* <FetchTrend x="year" y="avgRating" tooltip="manufacturer" endpoint={'/api/manu/yearly'}/>  */}
    </div>
  </>
  );
};



export default App;


