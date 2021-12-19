import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';
import routers from './router';
import './App.scss';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					{
						routers.map((router) => {
							return (
								<Route exact={router.exact} path={router.path} key={router.id} component={router.component} />
							);
						})
					}
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
