import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Choice from '../pages/Choice';



const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Choice />} />
                <Route path='/user/:id' element={<Home />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;