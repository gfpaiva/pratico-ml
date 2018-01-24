import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import nl2br from 'react-newline-to-break';
import { getProductById } from '../../Utils/API';
import If from '../../Components/If/If';
import { formatCurrency, getCents } from '../../Utils/helpers';
import './Single.scss';

class Single extends Component {
	state = {
		item: {},
		error: null,
		isLoading: true
	}

	componentDidMount() {
		const { id } = this.props.match.params;

		getProductById(id)
		.then(({item}) => {
			document.title = `Mercado Livre | ${item.title}` ;

			this.setState({
				item,
				isLoading: false
			});
		})
		.catch(error => this.setState({
			error,
			isLoading: false
		}));
	};

	render() {
		const { item, isLoading, error } = this.state;

		return(
			<div>
				<If condition={error !== null}>
					<p className="default-title">{error && `${error.status}: ${error.statusText}`}</p>
				</If>

				<If condition={isLoading}>
					<div className="loader">
						<ReactLoading delay={0} type="bubbles" color="#fff159" height='150px' width='150px' />
					</div>
				</If>

				<If condition={!isLoading && error === null}>
					<div className="single container">
						<div className="single__item row center-xs start-sm middle-xs">
							<div className="single__image col-xs-12 col-sm-6">
								<img className="fluid-img" src={item.picture} alt={item.title} title={item.title} />
							</div>
							<div className="single__info col-xs-12 col-sm-4 col-sm-offset-2">
								<h2 className="single__title">{item.title}</h2>
								{item.price &&
									<p className="single__price">{formatCurrency(item.price, false)}<span className="single__price--cents">{getCents(formatCurrency(item.price))}</span></p>
								}
								<button className="single__cta">
									Comprar
								</button>
							</div>
						</div>

						{item.description && item.description.length > 0 &&
							<div className="single__desc">
								<h3 className="single__desc-title">Descrição do produto</h3>
								<p className="single__desc-text">{nl2br(item.description)}</p>
							</div>
						}
					</div>
				</If>
			</div>
		);
	};
};

export default Single;
