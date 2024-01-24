import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from 'recharts';
import data from '../mock/data.json';
import PropTypes from 'prop-types';

const userAverageData = data.USER_AVERAGE_SESSIONS.find(
  (average) => average.userId === 12
);

const formattedData = [
  { day: 0, time: userAverageData.sessions[0].sessionLength },
  ...userAverageData.sessions.map((session) => ({
    day: session.day,
    time: session.sessionLength,
  })),
  {
    day: 8,
    time: userAverageData.sessions[userAverageData.sessions.length - 1]
      .sessionLength,
  },
];

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const time = payload.find((entry) => entry.dataKey === 'time');

    return (
      <div
        style={{
          width: '39px',
          height: '25px',
          backgroundColor: '#FFFFFF',
          padding: '9px',
        }}
      >
        {time && (
          <p
            style={{ color: '#000000', fontSize: '8px' }}
          >{`${time.value}min`}</p>
        )}
      </div>
    );
  }
  return null;
};

const CustomCursor = ({ width, height, points }) => {
  let formattedWidth;
  let x;
  if (width && points && height) {
    formattedWidth = width - (points[0].x - 15);
    x = points[0].x;
    height = height + 40;
  }
  return (
    <Rectangle
      x={x}
      y={0}
      width={formattedWidth}
      height={height}
      fill="black"
      opacity={0.12}
    />
  );
};

const CustomLineChart = () => {
  const daysMap = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div className="data_bloc_1">
      <div
        style={{
          color: '#fff',
          textAlign: 'left',
          fontSize: '12px',
          opacity: '0.7',
          marginTop: '20px',
          marginLeft: '20px',
          position: 'absolute',
        }}
      >
        Durée moyenne des<br></br>sessions
      </div>
      <ResponsiveContainer width="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="day"
            tickFormatter={(value) => {
              if (value === 0 || value === 8) return '';
              return daysMap[value - 1];
            }}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#FFFFFF', fontWeight: 500, fontSize: 12 }}
            tickMargin={10}
            opacity={0.7}
          />
          <YAxis hide={true} domain={['dataMin-20', 'dataMax+60']} />
          <Tooltip content={<CustomToolTip />} cursor={<CustomCursor />} />
          <Line
            type="natural"
            strokeWidth={2}
            dataKey="time"
            stroke="#FFFFFF"
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

CustomToolTip.propTypes = {
  payload: PropTypes.array,
  active: PropTypes.bool,
};

CustomCursor.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  points: PropTypes.array,
};

export default CustomLineChart;
