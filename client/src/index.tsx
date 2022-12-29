import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/main.scss';
import { store } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>
);

reportWebVitals();
