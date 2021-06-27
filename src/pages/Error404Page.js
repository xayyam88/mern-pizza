import React from 'react';
import { Link } from 'react-router-dom';

const Error404Page = () => {
    return (
        <div id="content" className="site-content" tabIndex={-1}>
            <div className="col-full">
                <div className="pizzaro-breadcrumb">
                    <nav className="woocommerce-breadcrumb">
                        <a href="https://demo2.chethemes.com/pizzaro">Home</a>
                        <span className="delimiter">
                            <i className="po po-arrow-right-slider" />
                        </span>
                        Error 404
                    </nav>
                </div>
                <div id="primary" className="content-area">
                    <main id="main" className="site-main" role="main">
                        <div className="error-404 not-found">
                            <div className="page-content">
                                <header className="page-header">
                                    <h1 className="page-title">
                                        Oops! That page can’t be found.
                                    </h1>
                                </header>
                                {/* .page-header */}
                                <p>
                                    Nothing was found at this location. Try
                                    searching, or check out the links below.
                                </p>
                                <section aria-label="Search">
                                    <div className="widget woocommerce widget_product_search">
                                        <p className="return-to-shop">
                                            <Link
                                                className="button wc-backward"
                                                to="/"
                                            >
                                                Return to shop
                                            </Link>
                                        </p>
                                    </div>
                                </section>
                            </div>
                            {/* .page-content */}
                        </div>
                        {/* .error-404 */}
                    </main>
                    {/* #main */}
                </div>
                {/* #primary */}
            </div>
            {/* .col-full */}
        </div>
    );
};

export default Error404Page;
