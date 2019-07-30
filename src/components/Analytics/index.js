import React from 'react';
import ResponseItem from 'models/ResponseItem';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import moment from 'moment';
import './Analytics.css';

const data = [
  new ResponseItem({ id: 'id1', date: '2019-01-20', value: 503, code: '' }),
  new ResponseItem({ id: 'id2', date: '2019-01-21', value: 291, code: '' }),
  new ResponseItem({ id: 'id3', date: '2019-01-22', value: 817, code: '' }),
  new ResponseItem({ id: 'id4', date: '2019-01-23', value: 582, code: '' }),
];

export default function Analytics(props) {
  return (
    <div className="Analytics">
      <header className="Analytics__header">
        <h1>Analytics</h1>
      </header>
      <div className="Analytics__pghd">
        <h2>PGHD</h2>
        <div className="Analytics__pghd-charts">
          <div>
            <h3>Surveys Chart</h3>
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
          <div>
            <h3>Activity Chart</h3>
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
          <div>
            <h3>Sleep Chart</h3>
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
      <div>
        <h3>Blood Pressure Chart</h3>
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
    </div>
    </div>
      <div className="Analytics__ehr">
        <h2>EHR</h2>
        <div>
          <h3>Blood Pressure</h3>
        </div>
        <div>
          <h3>Conditions</h3>
        </div>
        <div>
          <h3>Lab Test (Glucose)</h3>
        </div>
        <div>
          <h3>Body Weight</h3>
        </div>
      </div>
    </div>
  );
};
