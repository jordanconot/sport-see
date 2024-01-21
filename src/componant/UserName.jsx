import data from '../mock/data.json'

const UserName = () => {

    const firstName = data.USER_MAIN_DATA[0].userInfos.firstName;
    return (
        <>
        <h1>
        <span className="black">Bonjour</span>{' '}
        <span className="red">{firstName}</span>
      </h1>
      <span className="congrat">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </span>
      </>
    );
};

export default UserName;