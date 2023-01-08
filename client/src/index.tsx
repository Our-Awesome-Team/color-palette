import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/main.scss';
import { store } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root')!;
const root = createRoot(container);

if (process.env.NODE_ENV === 'development') {
	const { worker } = require('./__mocks__/browser')
	worker.start()
}

root.render(
	<HelmetProvider>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</HelmetProvider>
);

reportWebVitals();
