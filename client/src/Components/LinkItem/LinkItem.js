import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LinkItem = ( { item, children } ) => (
	<Link to={`/items/${item.id}`} alt={item.title} title={item.title}>{children}</Link>
);

LinkItem.propTypes = {
	item: PropTypes.object.isRequired
}


export default LinkItem;
