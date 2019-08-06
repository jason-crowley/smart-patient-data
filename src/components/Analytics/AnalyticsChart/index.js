import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts';
import moment from 'moment';
import './AnalyticsChart.css';

export default function AnalyticsChart({ data, onClick }) {
  const { text } = data[0].code;
  return (
    <div className="AnalyticsChart">
      <h3 className="AnalyticsChart__header">{text}</h3>
      <ResponsiveContainer
        className="AnalyticsChart__container"
        width="99%"
        aspect={1.8}
      >
        <LineChart
          className="AnalyticsChart__chart"
          data={data}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          onClick={onClick}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            tickFormatter={date => moment(date).format('MM/DD')}
            padding={{ left: 20, right: 20 }}
            label={{ value: 'Date', position: 'insideBottom', offset: -15 }}
          />
          <YAxis label={{ value: text, position: 'insideLeft', angle: -90 }} />
          <Tooltip
            labelFormatter={date => moment(date).format('MMM DD, YYYY')}
            formatter={value => value.toFixed(2)}
            animationEasing="ease-in-out"
          />
          <Legend align="right" verticalAlign="bottom" />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
