import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Favorites from './pages/Favorites/Favorites';
import User from './pages/User/User';
import History from './pages/History/History';
import MainLayout from './components/Layout/MainLayout';
import Search from './pages/Search/Search';

function App() {
	return (
		<>
			<MainLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/user" element={<User />} />
					<Route path="/history" element={<History />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</MainLayout>
		</>
	);
}

export default App;
