import React, { Component } from 'react';
import logo from './logo-pt__large_plus.png';
import { withRouter } from "react-router-dom";
import './Header.css';

class Header extends Component {
	state = {
		searchTerm: ''
	}

	handleSearch = (e) => {
		e.preventDefault();

		this.props.history.push(`/items/?${this.state.searchTerm}`);

		this.setState({searchTerm: ''});
	};

	handleChange(e) {
		this.setState({searchTerm: e.target.value});
	}

	render() {
		return(
		<header>
			<h1>
				<img src={logo} alt="Mercado Livre" title="Mercado Livre" />
			</h1>
			<form action="/items" method="GET" onSubmit={e => this.handleSearch(e)}>
				<input type="text" name="search" id="search" placeholder="Buscar produtos, marcas e muito mais..." required maxLength="120" autoComplete="off" value={this.state.searchTerm} ref={input => this.input = input} onChange={e => this.handleChange(e)} />
				<button type="submit">
					Search
				</button>
			</form>
		</header>
	)}
};

export default withRouter(Header);
