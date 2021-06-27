import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoriesPizza = React.memo(function CategoriesPizza({
    activeCategory,
    items,
    onClickCategory
}) {
    return (
        <div>
            <div className="widget woocommerce widget_layered_nav woocommerce-widget-layered-nav">
                <ul className="woocommerce-widget-layered-nav-list">
                    <li
                        onClick={(e) => {
                            onClickCategory(null);
                            e.preventDefault();
                        }}
                        className={
                            activeCategory === null ? 'active-item_cat' : ''
                        }
                    >
                        <Link
                            to={{
                                pathname: '/'
                            }}
                        >
                            Show All
                        </Link>
                    </li>
                    {items &&
                        items.map(
                            (name, index) =>
                                index !== 0 && (
                                    <li
                                        onClick={(e) => {
                                            onClickCategory(index);
                                            e.preventDefault();
                                        }}
                                        key={`${name}_${index}`}
                                        className={
                                            activeCategory === index
                                                ? 'active-item_cat'
                                                : ''
                                        }
                                    >
                                        <Link
                                            to={{
                                                pathname: '/'
                                            }}
                                        >
                                            {name}
                                        </Link>

                                        {name === 'Spicy' && (
                                            <span className="food-type-icon">
                                                <i className="fa fa-fire"></i>
                                            </span>
                                        )}
                                        {name === 'Veg' && (
                                            <span className="food-type-icon">
                                                <i className="fa icon-plant"></i>
                                            </span>
                                        )}
                                    </li>
                                )
                        )}
                </ul>
            </div>
        </div>
    );
});

CategoriesPizza.propTypes = {
    activeCategory: PropTypes.oneOf([PropTypes.number, null]),
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickCategory: PropTypes.func.onClickSortType
};

CategoriesPizza.defaultProps = {
    activeCategory: null,
    items: []
};

export default CategoriesPizza;
