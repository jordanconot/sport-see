import CustomLineChart from '../componant/CustomLineChart';
import CustomBarChart from '../componant/CustomBarChart';
import NavBar from '../componant/NavBar';
import CustomRadialBarChart from '../componant/CustomRadialBarChart';
import CustomRadarChart from '../componant/CustomRadarChart';
import Summary from '../componant/Summary';
import UserName from '../componant/UserName';

const Home = () => {
  return (
    <>
      <NavBar />
      <main className="container_main">
        <UserName />
        <section className="container_graph">
          <div className="container_graph_data">
            <CustomBarChart />
            <section className="container_data">
              <div className="container_data_blocs">
                <CustomLineChart />
                <CustomRadarChart />
                <CustomRadialBarChart />
              </div>
            </section>
          </div>
          <Summary />
        </section>
      </main>
    </>
  );
};

export default Home;
