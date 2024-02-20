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

const WindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    const uptdateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', uptdateSize);
    uptdateSize();
    return () => window.removeEventListener('resize', uptdateSize);
  }, []);
  return size
}

const CustomTick = ({ payload, x, y, textAnchor, stroke }) => {
  const [width] = WindowSize();
  let fontSize;

  if(width <= 1024) {
    fontSize = '0.42rem';
  }  else if (width <= 1200) {
    fontSize = '0.5rem';
  } else if (width <= 1300) {
    fontSize = '0.8rem';
  }  else if (width <= 1500) {
    fontSize = '0.58rem';
  } else if (width <= 1600) {
    fontSize = '0.8rem';
  }
  x += -2
  y += +2

  return (
    <g>
      <text
        stroke={stroke}
        y={y}
        fontSize={fontSize}
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
