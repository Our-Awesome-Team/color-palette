import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signin from './pages/SigninPage/SigninPage';
import Signup from './pages/SignupPage/SignupPage';
import Favorites from './pages/FavoritesPage/FavoritesPage';
import User from './pages/UserPage/UserPage';
import History from './pages/HistoryPage/HistoryPage';
import MainLayout from './components/Layout/MainLayout';
import SearchPage from './pages/SearchPage/SearchPage';
import Seo from './utils/Seo/Seo';

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
					<Route path="/search" element={<SearchPage />} />
				</Routes>
			</MainLayout>
		</>
	);
}

export default App;
