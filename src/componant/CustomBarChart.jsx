import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import data from '../mock/data.json';


const userActivityData = data.USER_ACTIVITY.find(
  (activity) => activity.userId === 12
);

const formattedData = userActivityData.sessions.map((session) => ({
  day: session.day,
  weight: session.kilogram,
  calorie: session.calories,
}));

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const weight = payload.find((entry) => entry.dataKey === 'weight');
    const calorie = payload.find((entry) => entry.dataKey === 'calorie');
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

const renderCustomBar = (props) => {
  const { fill, width, height, x, y} = props;
  const radius = [3, 3, 0, 0];

  return (
    <Rectangle
      fill={fill}
      x={x}
      y={y}
      width={width}
      height={height}
      radius={radius}
      
    />
  );
};

const CustomBarChart = () => {

  return (
    <section className="container_graphic_data">
      <div className="container_graphic">
        <div className="container_activity">
          <div className="container_activity_header">
            <p className="text_color_6 font_weight">Activité quotidienne</p>

            <div className="container_activity_weight_calorie">
              <div className="radius_weight"></div>
              <p className="text_color_7 font_weight">Poids (kg)</p>
            </div>
            <div className="container_activity_weight_calorie">
              <div className="radius_calorie"></div>
              <p className="text_color_7 font_weight">
                Calories brûlées (kCal)
              </p>
            </div>
          </div>
          <div className="bar_chart">
            <ResponsiveContainer width="100%" height={145}>
              <BarChart
                data={formattedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="2" vertical={false} stroke='#DEDEDE' />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#9B9EAC', fontSize: '14px' }}
                  tickMargin={15}
                  
                />
                <YAxis
                  dataKey="calorie"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#9B9EAC', fontSize: '14px' }}
                  tickMargin={30}
                  
                />
                <Tooltip content={<CustomToolTip />} cursor={{fill: '#C4C4C480'}} />
                <Bar
                  dataKey="weight"
                  shape={renderCustomBar}
                  fill="#282D30"
                  barSize={7}
                 
                />
                <Bar
                  dataKey="calorie"
                  shape={renderCustomBar}
                  fill="#E60000"
                  barSize={7}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomBarChart;
