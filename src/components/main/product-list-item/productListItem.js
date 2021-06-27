import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LazyLoadİmg from '../../lazy-load-img';

const ProductListItem = ({
    productListItem: { _id, imageUrl, name, price, description },
    isTabletOrMobileDevice
}) => {
    return (
        <li className="addon-product product">
            <div className="product-outer">
                <div className="product-inner">
                    <div className="product-image-wrapper">
                        <Link
                            to={{
                                pathname: '/',
                                search: `?product=${_id}`,
                                id: _id
                            }}
                            className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                        >
                            <LazyLoadİmg
                                styleClass="images"
                                alt=""
                                title="product-3"
                                imageUrl={imageUrl}
                            />
                        </Link>
                    </div>
                    <div className="product-content-wrapper">
                        <Link
                            to={{
                                pathname: '/',
                                search: `?product=${_id}`,
                                id: _id
                            }}
                            className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                        >
                            <h2 className="woocommerce-loop-product__title">
                                {name}
                            </h2>
                            {!isTabletOrMobileDevice && (
                                <div className="description_mobileDevice">
                                    {description}
                                </div>
                            )}

                            <div className="woocommerce-product-details__short-description">
                                <p
                                    id="rmjs-1"
                                    data-readmore=""
                                    aria-expanded="false"
                                >
                                    <span className="price">
                                        <span className="woocommerce-Price-amount amount">
                                            <span className="woocommerce-Price-currencySymbol">
                                                {price.toFixed(2)}
                                            </span>{' '}
                                            ₼
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </Link>
                        <div
                            className="hover-area"
                            to={{
                                pathname: '/',
                                search: `?product=${_id}`,
                                id: _id
                            }}
                        >
                            <Link
                                to={{
                                    pathname: '/',
                                    search: `?product=${_id}`,
                                    id: _id
                                }}
                                className="button"
                            >
                                {isTabletOrMobileDevice ? (
                                    <>
                                        <i className="fa fa-check-circle"></i>{' '}
                                        Daha ətraflı
                                    </>
                                ) : (
                                    <span className="woocommerce-Price-amount amount">
                                        <span className="woocommerce-Price-currencySymbol">
                                            {price.toFixed(2)}
                                        </span>{' '}
                                        ₼
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

ProductListItem.propTypes = {
    productListItem: PropTypes.shape({
        name: PropTypes.string,
        imageUrl: PropTypes.string,
        _id: PropTypes.string.isRequired
    })
};

export default ProductListItem;
