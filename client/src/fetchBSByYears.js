import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { getYRData } from './redux/yearSlice';
const FetchByYears = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const selector = useSelector(state => state.BSYears.data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        console.log("inside",response)
        const jsonData = await response.json();
        // setData(jsonData);
        dispatch(getYRData(jsonData))
        console.log("json",jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {selector.map((item,ind) => (
        <div key={ind}>{item.count} {item.brand}, {item.primaryCategories}, {item.year}</div>
      ))}
    </div>
  );
};

export default FetchByYears;