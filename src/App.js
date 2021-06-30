import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { configureStore } from './redux/store';
import './App.css';
import Jobs from './screens/Jobs';
import HomePage from './screens/HomePage';
import Header from './components/Header';

const { store, persistor } = configureStore();

function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<React.Fragment>
					<Header />
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route exact path="/jobs" component={Jobs} />
						</Switch>
					</BrowserRouter>
				</React.Fragment>
			</PersistGate>
		</Provider>
	);
}

export default App;
