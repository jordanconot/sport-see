import CustomAreaChart from '../componant/CustomAreaChart';
import CustomBarChart from '../componant/CustomBarChart';
import NavBar from '../componant/NavBar';
import CustomPieChart from '../componant/CustomPieChart';
import CustomRadarChart from '../componant/CustomRadarChart';
import Summary from '../componant/Summary';
import UserName from '../componant/UserName';

const Home = () => {
  return (
    <>
      <NavBar />
      <main className="container_main">
        <UserName />
        <CustomBarChart />
        <Summary />
        <section className="container_data">
          <div className="container_data_blocs">
            <CustomAreaChart/>
            <CustomRadarChart />
            <CustomPieChart />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
