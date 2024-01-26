import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import data from '../mock/data.json';
import PropTypes from 'prop-types';

const kindFr = {
  cardio: 'Cardio',
  energy: 'Énergie',
  endurance: 'Endurance',
  strength: 'Force',
  speed: 'Vitesse',
  intensity: 'Intensité',
};

const CustomTick = ({ payload, x, y, textAnchor, stroke }) => {
  x += -3
  return (
    <g>
      <text
        stroke={stroke}
        y={y}
        fontSize="0.43rem"
        fontWeight="500"
        textAnchor={textAnchor}
      >
        <tspan x={x} style={{ fill: 'white' }}>
          {payload?.value}
        </tspan>
      </text>
    </g>
  );
};

const CustomRadarChart = () => {
  const userPerformanceData = data.USER_PERFORMANCE.find(
    (user) => user.userId === 12
  );

  const formattedData = userPerformanceData.data.map((item) => {
    return {
      kind: kindFr[userPerformanceData.kind[item.kind.toString()]],
      value: item.value,
    };
  });

  return (
    <div className="data_bloc_2">
      <ResponsiveContainer width="100%" height={263}>
        <RadarChart outerRadius="80%" data={formattedData}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="kind"
            tickSize={12}
            tick={<CustomTick />}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 'dataMax+20']}
            tick={false}
            axisLine={false}
          />
          <Radar dataKey="value" fill="#FF0101B2" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

CustomTick.propTypes = {
  payload: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  textAnchor: PropTypes.string,
  stroke: PropTypes.string,
};
export default CustomRadarChart;
