import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Components/Header/Header';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Header search={this.handleSearch} />

				<Switch >
					<Route exact path="/" render={() => (
						<div>
							<p>Type to search <span role="img" aria-label="Nerd Face">🤓</span></p>
						</div>
					)}/>

					<Route exact path="/items/:id?" render={({ match }) => (
						<div>
							<p>{match.params.id}</p>
						</div>
					)}/>

					{/* 404 page */}
					<Route render={() => (<h1 style={{textAlign: 'center'}}>Page not foud <span role="img" aria-label="Sad Face">😕</span></h1>)} />
				</Switch>
			</div>
		);
	};
}

export default App;
