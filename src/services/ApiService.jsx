import axios from 'axios';
import UserActivity from '../model/UserActivity';
import mockData from '../mock/data.json';
import UserMain from '../model/UserMain';
import UserAverageSessions from '../model/UserAverageSessions';
import UserPerformance from '../model/UserPerformance';

const USER_ACTIVITY = mockData.USER_ACTIVITY;
const USER_MAIN_DATA = mockData.USER_MAIN_DATA;
const USER_AVERAGE_SESSIONS = mockData.USER_AVERAGE_SESSIONS;
const USER_PERFORMANCE = mockData.USER_PERFORMANCE;

const fetchData = async (url, localData) => {
    try {
      const response = await axios.get(url);
      console.log('App running in Dev Mode?', false);
      return response.data.data;
    } catch (error) {
        console.log('App running in Dev Mode?', true);
      return localData;
    }
};

const getMainData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}`;
  const localMainData = USER_MAIN_DATA.find((item) => item.id === parseInt(id));
  const data = await fetchData(apiUrl, localMainData);
  return new UserMain(data);
};

const getActivityData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}/activity`;
  const localActivityData = USER_ACTIVITY.find(
    (item) => item.userId === parseInt(id)
  );
  const data = await fetchData(apiUrl, localActivityData);
  return new UserActivity(data);
};

const getAverageSessionsData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}/average-sessions`;
  const localAverageData = USER_AVERAGE_SESSIONS.find(
    (item) => item.userId === parseInt(id)
  );
  const data = await fetchData(apiUrl, localAverageData);
  return new UserAverageSessions(data);
};

const getPerformanceData = async (id) => {
  const apiUrl = `http://localhost:3000/user/${id}/performance`;
  const localPerformanceData = USER_PERFORMANCE.find(
    (item) => item.userId === parseInt(id)
  );
  const data = await fetchData(apiUrl, localPerformanceData);
  return new UserPerformance(data);
};

const ApiServices = {
  getMainData,
  getActivityData,
  getAverageSessionsData,
  getPerformanceData,
};

export default ApiServices;
