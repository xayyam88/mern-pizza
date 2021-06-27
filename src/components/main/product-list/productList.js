import React from 'react';
import ProductListItem from '../product-list-item';
import MessageBox from '../../message-box';
import LoadingBox from '../../loading-box';
import { Link } from 'react-router-dom';
import LazyLoadİmg from '../../lazy-load-img/lazyLoadİmg';
import LoadingBoxMob from '../../loading-box/loadingBoxMob.js';

const ProductList = ({ productList, isTabletOrMobileDevice }) => {
    const { loading, error, products } = productList;

    const _id = '603fdb5a172c073ae04687e1';

    return (
        <div>
            {loading ? (
                <ul className="products columns-3">
                    {Array(9)
                        .fill(0)
                        .map((_, index) => (
                            <li className="addon-product product">
                                {isTabletOrMobileDevice ? (
                                    <LoadingBox key={index}></LoadingBox>
                                ) : (
                                    <LoadingBoxMob key={index}></LoadingBoxMob>
                                )}
                            </li>
                        ))}
                </ul>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <h2 className="h2-header h2-header_new">Fast Foods</h2>
                    <ul className="products columns-3">
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
                                            {/* <img
                                                src="https://dodopizza-a.akamaihd.net/static/Img/Products/f478c9b611984d598bc09d7afdbd7897_292x292.jpeg"
                                                className="attachment-shop_catalog size-shop_catalog wp-post-image"
                                                alt=""
                                                title="product-3"
                                                sizes="(max-width: 300px) 100vw, 300px"
                                                width="300"
                                                height="300"
                                            /> */}

                                            <LazyLoadİmg
                                                styleClass="images"
                                                alt=""
                                                title="product-3"
                                                imageUrl="https://dodopizza-a.akamaihd.net/static/Img/Products/f478c9b611984d598bc09d7afdbd7897_292x292.jpeg"
                                            />
                                        </Link>
                                    </div>
                                    <div className="product-content-wrapper">
                                        <Link
                                            to={{
                                                pathname: '/'
                                            }}
                                            className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                                        >
                                            <h2 className="woocommerce-loop-product__title">
                                                Pizza yarı ba yarı
                                            </h2>
                                            <div className="woocommerce-product-details__short-description">
                                                <p
                                                    id="rmjs-1"
                                                    data-readmore=""
                                                    aria-expanded="false"
                                                >
                                                    <span className="price">
                                                        <span className="woocommerce-Price-amount amount">
                                                            <span className="woocommerce-Price-currencySymbol">
                                                                15 ₼ başlayaraq
                                                            </span>
                                                        </span>
                                                    </span>
                                                </p>
                                            </div>
                                        </Link>
                                        <div
                                            className="hover-area"
                                            to={{
                                                pathname: '/'
                                            }}
                                        >
                                            <Link
                                                to={{
                                                    pathname: '/',
                                                    search: `?product=`
                                                }}
                                                className="button"
                                            >
                                                {isTabletOrMobileDevice ? (
                                                    <>
                                                        <i className="fa fa-check-circle"></i>{' '}
                                                        Daha ətraflı
                                                    </>
                                                ) : (
                                                    '15 ₼ başlayaraq'
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {products.map((product) => (
                            <ProductListItem
                                productListItem={product}
                                isTabletOrMobileDevice={isTabletOrMobileDevice}
                                key={`${product.name.replace(/\s/g, '_')}_${
                                    product._id
                                }`}
                            />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ProductList;
