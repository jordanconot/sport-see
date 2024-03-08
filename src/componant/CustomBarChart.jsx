import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from 'recharts';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ApiServices from '../services/ApiService';

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const weight = payload.find((entry) => entry.dataKey === 'kilogram');
    const calorie = payload.find((entry) => entry.dataKey === 'calories');
    return (
      <div
        style={{
          width: '39px',
          height: '63px',
          backgroundColor: '#E60000',
          padding: '5px',
        }}
      >
        {weight && (
          <p
            style={{ color: '#fff', fontSize: '7px', lineHeight: '24px' }}
          >{`${weight.value}kg`}</p>
        )}
        {calorie && (
          <p
            style={{ color: '#fff', fontSize: '7px', lineHeight: '24px' }}
          >{`${calorie.value}kCal`}</p>
        )}
      </div>
    );
  }
  return null;
};

const CustomCursor = ({ x, y, width, height }) => {
  if (width) width = width / 2;
  return (
    <Rectangle
      fill="#C4C4C480"
      strokeWidth={15}
      x={x}
      y={y}
      width={width}
      height={height}
      transform={`translate(${width / 2}, 0)`}
    />
  );
};

const CustomBarChart = () => {
  const [activityData, setActivityData] = useState('');
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await ApiServices.getActivityData(id)
        setActivityData(apiData);
        
      }catch (error) {
        console.error('data failed'); 
      }
    }
    fetchData()
  }, [id])

  if (!activityData) {
    return <div>Chargement des données...</div>;
  }

  return (
    <section className="container_graphic_data">
      <div className="container_graphic">
        <div className="container_activity">
          <div className="container_activity_header">
            <p>Activité quotidienne</p>
            <div className='container_info'>
            <div className="container_activity_weight_calorie">
              <div className="radius_weight"></div>
              <p>Poids (kg)</p>
            </div>
            <div className="container_activity_weight_calorie">
              <div className="radius_calorie"></div>
              <p>
                Calories brûlées (kCal)
              </p>
            </div>
            </div>
          </div>
          <div className="bar_chart">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={activityData.sessions}
                margin={{
                  top: 5,
                  right: 30,
                  left: -20,
                  bottom: 35,
                }}
                barGap={8}
              >
                <CartesianGrid
                  strokeDasharray="1 2"
                  vertical={false}
                  stroke="#DEDEDE"
                />
                <XAxis
                  dataKey="day"
                  // tickFormatter={activityData.sessions}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#9B9EAC', fontSize: '14px' }}
                  tickMargin={15}
                  domain={['dataMin', 'dataMax']}
                  padding={{ left: -45, right: -45 }}
                  
                />
                <YAxis
                  yAxisId="right"
                  tickCount={3}
                  dataKey="kilogram"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#9B9EAC', fontSize: '14px' }}
                  tickMargin={40}
                  domain={['dataMin -1', 'dataMax +2']}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  dataKey="calories"
                  tickLine={false}
                  axisLine={false}
                  tick={false}
                  domain={[0, 'dataMax +50']}
                />
                <Tooltip
                  content={<CustomToolTip />}
                  cursor={<CustomCursor/>}
                  wrapperStyle={{ top: -40 }}
                />
                
                <Bar
                  yAxisId="right"
                  dataKey="kilogram"
                  fill="#282D30"
                  barSize={7}
                  radius={[10, 10, 0, 0]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="calories"
                  fill="#E60000"
                  barSize={7}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

CustomCursor.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
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

export default CustomBarChart;
