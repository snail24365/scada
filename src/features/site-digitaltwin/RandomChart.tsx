import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

type Props = {};

// Chart component for demo
const RandomChart = (props: Props) => {
  const data = [1, 2, 3, 4, 5, 6, 7].map((x) => ({
    name: x,
    uv: Math.random() * 1000,
    pv: Math.random() * 1000,
    amt: Math.random() * 1000
  }));

  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );
};

export default RandomChart;
