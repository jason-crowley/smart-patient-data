export default {
  axis: {
    style: {
      axis: { stroke: '#666' },
      grid: { stroke: '#ccc', strokeDasharray: '5 5' },
      ticks: { size: 6, stroke: '#666' },
      tickLabels: { fill: '#666' },
    },
  },
  // bar: {},
  chart: {
    domainPadding: 30,
    padding: { top: 50, right: 50, bottom: 60, left: 60 },
  },
  legend: {
    orientation: 'horizontal',
    style: {
      border: { stroke: 'black' },
      labels: { fontSize: 12 },
    },
  },
  line: {
    interpolation: 'monotoneX',
    style: {
      data: { stroke: '#3182bd', strokeWidth: 1 },
    },
  },
  scatter: {
    size: 3,
    style: {
      data: { fill: '#fff', stroke: '#3182bd', strokeWidth: 1 },
    },
  },
};
