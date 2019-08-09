import React from 'react';

export default props => {
  const { x, y } = props;
  return (
    <g transform={`translate(${x - 4},${y - 6})`}>
      <svg width="14" height="14" viewBox="0 0 32 32">
        <path
          strokeWidth="4"
          fill="none"
          stroke="#3182bd"
          d="M0,16h10.666666666666666
          A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
          H32M21.333333333333332,16
          A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
        >
        </path>
      </svg>
    </g>
  );
};
