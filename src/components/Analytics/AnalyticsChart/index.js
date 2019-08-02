import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import moment from 'moment';
import './AnalyticsChart.css';

export default function AnalyticsChart({ data }) {
  return (
    <div>
      <h3 className="AnalyticsChart__header">{data[0].code.text}</h3>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="date"
          tickFormatter={date => moment(date).format('MM/DD')}
          padding={{ left: 20, right: 20 }}
          label={{ value: 'Date', position: 'insideBottom', offset: -15 }}
        />
        <YAxis label={{ value: 'Value', position: 'insideLeft', angle: -90 }} />
        <Tooltip
          labelFormatter={date => moment(date).format('MMM DD, YYYY')}
          formatter={value => value.toFixed(2)}
          animationEasing="ease-in-out"
        />
        <Legend align="right" verticalAlign="bottom" />
        <Line type="monotone" dataKey="value" />
      </LineChart>
    </div>
  );
};
