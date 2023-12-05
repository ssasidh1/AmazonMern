
import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        console.log("inside",response)
        const jsonData = await response.json();
        setData(jsonData);
        console.log("json",jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item,ind) => (
        <div key={ind}>{item.count} {item.brand}, {item.primaryCategories}, {item.year}</div>
      ))}
    </div>
  );
};

export default App;
