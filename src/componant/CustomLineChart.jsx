import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from 'recharts';
import PropTypes from 'prop-types';
import ApiServices from '../services/ApiService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const time = payload[0].payload;

    if (time.day === 'Start' || time.day === 'End') {
      return null;
    }

    return (
      <div
        style={{
          width: '39px',
          height: '25px',
          backgroundColor: '#FFFFFF',
          padding: '9px',
        }}
      >
        <p style={{ color: '#000000', fontSize: '8px' }}>{`${time.sessionLength}min`}</p>
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

const CustomActiveDot = (props) => {
  const { cx, cy, stroke, fill, r} = props;

  return <circle cx={cx} cy={cy} r={r} stroke={stroke} fill={fill} />;
};

const CustomLineChart = () => {
  const [averageData, setAverageData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try{
        const apiData = await ApiServices.getAverageSessionsData(id);
        const sessionsWithExtraDays = [
          {day: 'Start', sessionLength: 0 },
          ...apiData.sessions,
          {day: 'End', sessionLength: 0 },
        ]
        setAverageData({...apiData, sessions: sessionsWithExtraDays});
        
      }catch(error) {
        console.error("data fetch error", error)
      }
    }
    fetchData()
  }, [id]);

  if (!averageData) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="data_bloc_1">
      <ResponsiveContainer width="100%" height={263}>
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
        <LineChart
          data={averageData.sessions}
          margin={{
            top: 0,
            right: -15,
            left: -15,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="day"
            tickFormatter={(value) => {
              if (value === 'Start' || value === 'End') return '';
              return value;
            }}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#FFFFFF', fontWeight: 500, fontSize: 12 }}
            tickMargin={10}
            opacity={0.7}
            interval={0}
          />
          <YAxis hide={true} domain={['dataMin-20', 'dataMax+60']} />
          <Tooltip content={<CustomToolTip />} cursor={<CustomCursor />} />
          <Line
            type="natural"
            strokeWidth={2}
            dataKey="sessionLength"
            stroke="#FFFFFF"
            dot={false}
            activeDot={(props) => <CustomActiveDot {...props}/>}
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

CustomActiveDot.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
  r: PropTypes.number,
  cx: PropTypes.number,
  cy: PropTypes.number,
};

export default CustomLineChart;
