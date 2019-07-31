import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import moment from 'moment';
import './AnalyticsChart.css';

export default function AnalyticsChart({ data }) {
  return (
    <div>
      <h3 className="AnalyticsChart__header">{data[0].code.text}</h3>
      <LineChart width={300} height={200} data={data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="date"
          tickFormatter={date => moment(date).format('MM/DD')}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" />
      </LineChart>
    </div>
  );
};
