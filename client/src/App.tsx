import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MainLayout from './components/Layout/MainLayout';
import { lazy, Suspense } from 'react';
import Spinner from './components/UI/Spinner/Spinner';

const History = lazy(() => import('./pages/HistoryPage/HistoryPage'));
const User = lazy(() => import('./pages/UserPage/UserPage'));
const Favorites = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));
const Signin = lazy(() => import('./pages/SigninPage/SigninPage'));
const Signup = lazy(() => import('./pages/SignupPage/SignupPage'));

const App = () => {
	return (
		<>
			<MainLayout>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
				<Suspense fallback={<Spinner />}>
					<Routes>
						<Route path="/signin" element={<Signin />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/user" element={<User />} />
						<Route path="/history" element={<History />} />
						<Route path="/search" element={<SearchPage />} />
					</Routes>
				</Suspense>
			</MainLayout>
		</>
	);
};

export default App;
