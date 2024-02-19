import { useEffect, useState } from 'react';
import ApiServices from '../services/ApiService';
import { useParams } from 'react-router-dom';

const UserName = () => {
  const [mainData, setMainData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await ApiServices.getMainData(id);
        setMainData(apiData);
      } catch (error) {
        console.error('erreur recup donné user', error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <h1>
        <span className="black">Bonjour</span>{' '}
        <span className="red">{mainData.firstName}</span>
      </h1>
      <span className="congrat">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </span>
    </>
  );
};

export default UserName;
