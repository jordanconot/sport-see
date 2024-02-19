import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiServices from '../services/ApiService';

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
  const [performanceData, setPerformanceData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try{
        const apiData = await ApiServices.getPerformanceData(id);
        setPerformanceData(apiData);
      }catch(error) {
        console.error("data fetch error", error)
      }
    }
    fetchData()
  }, [id]);
  
  if (!performanceData) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="data_bloc_2">
      <ResponsiveContainer width="100%" height={263}>
        <RadarChart outerRadius="80%" data={performanceData.performanceData}>
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
