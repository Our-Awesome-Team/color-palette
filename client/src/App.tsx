

import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import { lazy, Suspense } from 'react';
import Spinner from './components/UI/Spinner/Spinner';

const Home = lazy(() => import('./pages/Home/Home'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const History = lazy(() => import('./pages/HistoryPage/HistoryPage'));
const User = lazy(() => import('./pages/UserPage/UserPage'));
const Favorites = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));
const Signin = lazy(() => import('./pages/SigninPage/SigninPage'));
const Signup = lazy(() => import('./pages/SignupPage/SignupPage'));

const App = () => {
	return (
		<MainLayout>
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/user" element={<User />} />
					<Route path="/history" element={<History />} />
					<Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</MainLayout>
	);
};

export default App;