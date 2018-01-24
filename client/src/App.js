import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Search from './Pages/Search/Search';
import Single from './Pages/Single/Single';
import NotFound from './Pages/NotFound/NotFound';
import { parse as queryStringParse } from 'query-string';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Header />

				<Switch>
					<Route exact path="/" component={Home}/>

					<Route exact path="/items" render={({ match }) => {
						let queryStrings = queryStringParse(window.location.search);

						if(queryStrings && queryStrings.search) {
							return <Search searchTerm={queryStrings.search} />;
						} else {
							return <NotFound />
						}
					}}/>

					<Route exact path="/items/:id" component={Single}/>

					{/* 404 page */}
					<Route component={NotFound} />
				</Switch>
			</div>
		);
	};
};

export default App;
