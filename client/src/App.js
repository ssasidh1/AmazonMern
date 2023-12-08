
import React from 'react';
import FetchTrendBar from './FetchTrendBar';
import FetchTrend from './FetchTrend'
const App = () => {
  return (
  <>
    <FetchTrendBar x="manufacturer" y="bestSellerRating" tooltip="bestSeller" endpoint={'/api/manu/bestseller'}/>
    
    <FetchTrend x="year" y="count" tooltip="brand" endpoint={'/api/cat/trends/Amazonbasics'}/>
    <FetchTrendBar x="year" y="count" tooltip="topCategory" endpoint={'/api/cat/best/year/Amazon'}/>
    
    <FetchTrendBar x="year" y="avgRating" tooltip="name" endpoint={'/api/products/best/year'}/>
    <FetchTrendBar x="year" y="avgRating" tooltip="manufacturer" endpoint={'/api/manu/best/year'}/>
    <FetchTrendBar x="year" y="avgRating" tooltip="name" endpoint={'/api/products/best/year'}/> 
    {/* <FetchTrend x="year" y="avgRating" tooltip="manufacturer" endpoint={'/api/manu/yearly'}/>  */}
    
  </>
  );
};

export default App;


