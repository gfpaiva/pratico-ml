import React from 'react';
import { Link } from 'react-router-dom';
import FaSearch from 'react-icons/lib/fa/search'
import './Header.scss';

const Header = () => (
	<header className="header">
		<div className="container">
			<div className="row middle-xs center-xs between-xs">
				<h1 className="header__logo col-xs-12 col-sm-2">
					<Link className="header__link" to='/'>Mercado Livre</Link>
				</h1>
				<form className="header__form col-xs-12 col-sm" action="/items" method="GET">
					<input className="header__input col-xs" type="text" name="search" id="search" placeholder="Buscar produtos, marcas e muito mais..." required maxLength="120" autoComplete="off" />
					<button className="header__btn" type="submit">
						<FaSearch />
					</button>
				</form>
			</div>
		</div>
	</header>
);

export default Header;
