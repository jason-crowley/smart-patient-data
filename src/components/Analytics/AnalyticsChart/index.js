import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import moment from 'moment';

export default function AnalyticsChart({ title, data }) {
  return (
    <div>
      <h3>{title}</h3>
      <LineChart width={300} height={200} data={data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="date"
          tickFormatter={date => moment(date).format('MM/DD')}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" />
      </LineChart>
    </div>
  );
};
