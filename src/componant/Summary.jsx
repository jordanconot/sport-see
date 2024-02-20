import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiServices from '../services/ApiService';

const Summary = () => {
  const [nutrientsData, setNutrientsData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await ApiServices.getMainData(id);
        setNutrientsData(apiData);
      } catch (error) {
        console.error('erreur recup donné user', error);
      }
    }
    fetchData();
  }, [id]);

  if (!nutrientsData) {
    return <div>Chargement des données...</div>;
  }

  return (
    <aside className="container_summary">
      <div className="summary_bloc calories">
        <img src="../src/assets/svg/calories.svg"></img>
        <div className="summary_bloc_details">
          <p className="summary_number">
            {nutrientsData.keyData.calorieCount}kCal
          </p>
          <p className="summary_title">Calories</p>
        </div>
      </div>
      <div className="summary_bloc protein">
        <img src="../src/assets/svg/protein.svg"></img>
        <div className="summary_bloc_details">
          <p className="summary_number">
            {nutrientsData.keyData.proteinCount}g
          </p>
          <p className="summary_title">Proteines</p>
        </div>
      </div>
      <div className="summary_bloc glucides">
        <img src="../src/assets/svg/apple.svg"></img>
        <div className="summary_bloc_details">
          <p className="summary_number">
            {nutrientsData.keyData.carbohydrateCount}g
          </p>
          <p className="summary_title">Glucides</p>
        </div>
      </div>
      <div className="summary_bloc lipides">
        <img src="../src/assets/svg/cheese_burger.svg"></img>
        <div className="summary_bloc_details">
          <p className="summary_number">{nutrientsData.keyData.lipidCount}g</p>
          <p className="summary_title">Lipides</p>
        </div>
      </div>
    </aside>
  );
};

export default Summary;
