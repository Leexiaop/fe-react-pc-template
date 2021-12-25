import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import routers from './router';
import Loading from './components/loading';
import './App.scss';

const App = () => {
	return (
		<div className="App">
			<RecoilRoot>
				<React.Suspense fallback={<Loading />}>
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
				</React.Suspense>
			</RecoilRoot>
		</div>
	);
};

export default App;
