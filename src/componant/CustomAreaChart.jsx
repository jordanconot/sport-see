import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import data from '../mock/data.json';
import PropTypes from 'prop-types';

const userAverageData = data.USER_AVERAGE_SESSIONS.find(
  (average) => average.userId === 12
);

const formattedData = userAverageData.sessions.map((session) => ({
  day: session.day,
  time: session.sessionLength,
}));

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

CustomToolTip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ),
};

const CustomAreaChart = () => {
  return (
    <div className="data_bloc_1">
      <div style={{color: '#fff', textAlign: 'center', fontSize: '12px', opacity: "0.7"}}>
        Durée moyenne des sessions
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formattedData}
          width={300}
          height={500}
          margin={{
            top: 25,
            right: 15,
            left: 15,
            bottom: 25,
          }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#FFFFFF' }}
            tickMargin={15}
          />
          <YAxis hide={true} />
          <Tooltip content={<CustomToolTip />}/>
          <Area
            type="monotone"
            dataKey="time"
            stroke="#FFFFFF"
            fillOpacity={1}
            fill="url(#colorSession)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomAreaChart;
