import { NavLink } from 'react-router-dom';

const Choice = () => {
    return (
        <div className='choice_container'>
        <div className='choice'>
            <h2>Veuillez choisir un utilisateur :</h2>
            <div className='choice_name'>
                <NavLink to='/user/12'>Karl</NavLink>
                <NavLink to='/user/18'>Cecilia</NavLink>
            </div>
        </div>
        </div>
    );
};

export default Choice;