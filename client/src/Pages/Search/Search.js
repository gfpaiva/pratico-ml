import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { search } from '../../Utils/API';
import If from '../../Components/If/If';
import ShelfItem from '../../Components/ShelfItem/ShelfItem';
import './Search.scss';

class Search extends Component {
	state = {
		items: [],
		categories: [],
		error: null,
		isLoading: true,
	}

	componentDidMount() {
		const { searchTerm } = this.props;

		document.title = `Mercado Livre | Search: ${searchTerm}`;

		search(searchTerm)
		.then(({ items, categories }) => {
			this.setState({
				items,
				categories,
				isLoading: false
			})
		})
		.catch(error => this.setState({
			error,
			isLoading: false
		}));
	};

	render() {
		const { items, isLoading, categories, error } = this.state;

		return(
			<div className="search container">
				<If condition={error !== null}>
					<p className="default-title">{error && `${error.status}: ${error.statusText}`}</p>
				</If>

				<If condition={isLoading}>
					<ReactLoading className="loader" delay={0} type="bubbles" color="#fff159" height='150px' width='150px' />
				</If>

				<If condition={!isLoading}>
					<ul className="search__categories">
						{categories.map(category => <li className="search__category" key={category}>{category}</li>)}
					</ul>

					<div className="search__items">
						{items.map(item => (
							<ShelfItem key={item.id} {...{item}} />
						))}
					</div>
				</If>
			</div>
		);
	};
};

Search.propTypes = {
	searchTerm: PropTypes.string.isRequired
}

export default Search;
