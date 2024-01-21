import data from '../mock/data.json';

const Summary = () => {
    const calorieCount = data.USER_MAIN_DATA[0].keyData.calorieCount;
    const proteinCount = data.USER_MAIN_DATA[0].keyData.proteinCount;
    const carboHydrateCount = data.USER_MAIN_DATA[0].keyData.carbohydrateCount;
    const lipidCount = data.USER_MAIN_DATA[0].keyData.lipidCount;
    
    return (
        <aside className="container_summary">
        <div className="summary_bloc calories">
          <img src="../src/assets/svg/calories.svg"></img>
          <div className="summary_bloc_details">
            <p className="summary_number">{calorieCount}kCal</p>
            <p className="summary_title">Calories</p>
          </div>
        </div>
        <div className="summary_bloc protein">
          <img src="../src/assets/svg/protein.svg"></img>
          <div className="summary_bloc_details">
            <p className="summary_number">{proteinCount}g</p>
            <p className="summary_title">Proteines</p>
          </div>
        </div>
        <div className="summary_bloc glucides">
          <img src="../src/assets/svg/apple.svg"></img>
          <div className="summary_bloc_details">
            <p className="summary_number">{carboHydrateCount}g</p>
            <p className="summary_title">Glucides</p>
          </div>
        </div>
        <div className="summary_bloc lipides">
          <img src="../src/assets/svg/cheese_burger.svg"></img>
          <div className="summary_bloc_details">
            <p className="summary_number">{lipidCount}g</p>
            <p className="summary_title">Lipides</p>
          </div>
        </div>
      </aside>
    );
};

export default Summary;