import React from 'react';
import PropTypes from 'prop-types';
import FaTruck from 'react-icons/lib/fa/truck';
import LinkItem from '../LinkItem/LinkItem';
import { formatCurrency } from '../../Utils/helpers';
import './ShelfItem.scss';

const ShelfItem = ({ item }) => (
	<div className="item row middle-xs center-xs start-md">
		<div className="col-xs-12 col-md-2">
			<LinkItem {...{item}}><img className="item__image" src={item.picture} alt={item.title} title={item.title} /></LinkItem>
		</div>
		<div className="col-xs-12 col-md">
			<h2 className="item__title"><LinkItem {...{item}}>{item.title}</LinkItem></h2>
			<p className="item__price"><LinkItem {...{item}}>{formatCurrency(item.price, false)}</LinkItem></p>
			{item.free_shipping && <p className="item__shipping"><LinkItem {...{item}}><FaTruck /> Frete Grátis</LinkItem></p>}
		</div>
	</div>
);

ShelfItem.propTypes = {
	item: PropTypes.object.isRequired
}

export default ShelfItem;
