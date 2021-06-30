import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { NotificationContainer } from 'react-notifications';
import { configureStore } from './redux/store';
import Jobs from './screens/Jobs';
import HomePage from './screens/HomePage';
import Header from './components/Header';

// React notifications css import
import 'react-notifications/lib/notifications.css';

const { store, persistor } = configureStore();
// Two Routes are defined
// 1=> Homepage where user can enter location,job title and company and search jobsByCompany
// 2 => Jobs where all the jobs are listed in card in paginated way
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
			<NotificationContainer />
		</Provider>
	);
}

export default App;
