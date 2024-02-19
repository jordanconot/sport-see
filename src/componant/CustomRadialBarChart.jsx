import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiServices from '../services/ApiService';

const CustomRadialBarChart = () => {
  const [scoreData, setScoreData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try{
        const apiData = await ApiServices.getMainData(id);
        setScoreData(apiData);
      }catch(error) {
        console.error("data fetch error", error)
      }
    }
    fetchData()
  }, [id]);
  
  if (!scoreData) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="data_bloc_3">
      <div className='score'>Score</div>
      <div className='container_result'>
        <span className='result'>{scoreData.todayScore[0].score}%</span>
        <span className='objectif'>de votre</span>
        <span className='objectif'>objectif</span>
      </div>
      <ResponsiveContainer width="100%" height={263}>
        <RadialBarChart
          data={scoreData.todayScore}
          innerRadius="80%"
          outerRadius="100%"
          startAngle={90}
          endAngle={450}
          barSize={10}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar dataKey="score" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomRadialBarChart;
