import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Favorites from './pages/Favorites/Favorites';
import User from './pages/User/User';
import History from './pages/History/History';
import Header from './components/Header/Header';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/user' element={<User />} />
        <Route path='/history' element={<History />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
