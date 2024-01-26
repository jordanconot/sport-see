import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';
import data from '../mock/data.json';

const CustomRadialBarChart = () => {
  const userScoreData = data.USER_MAIN_DATA.find((user) => user.id === 12);

  const formattedData = [
    {
      name: 'Score',
      score: userScoreData.todayScore * 100,
      fill: '#FF0000',
    },
  ];

  return (
    <div className="data_bloc_3">
      <div className='score'>Score</div>
      <div className='container_result'>
        <span className='result'>{formattedData[0].score}%</span>
        <span className='objectif'> de votre objectif</span>
      </div>
      <ResponsiveContainer width="100%" height={263}>
        <RadialBarChart
          data={formattedData}
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
