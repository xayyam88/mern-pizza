import React from 'react';

const PizzaPagination = () => {

    return (
        <nav className="woocommerce-pagination">
            <ul className="page-numbers">
                <li><span className="page-numbers current">1</span></li>
                <li><a className="page-numbers"
                       href="https://demo2.chethemes.com/pizzaro/shop-demo/page/2/?shop_view=grid-view&amp;shop_style=lite&amp;shop_layout=full-width&amp;shop_columns=3">2</a>
                </li>
                <li><a className="page-numbers"
                       href="https://demo2.chethemes.com/pizzaro/shop-demo/page/3/?shop_view=grid-view&amp;shop_style=lite&amp;shop_layout=full-width&amp;shop_columns=3">3</a>
                </li>
                <li><a className="page-numbers"
                       href="https://demo2.chethemes.com/pizzaro/shop-demo/page/4/?shop_view=grid-view&amp;shop_style=lite&amp;shop_layout=full-width&amp;shop_columns=3">4</a>
                </li>
                <li><a className="page-numbers"
                       href="https://demo2.chethemes.com/pizzaro/shop-demo/page/5/?shop_view=grid-view&amp;shop_style=lite&amp;shop_layout=full-width&amp;shop_columns=3">5</a>
                </li>
                <li><a className="page-numbers"
                       href="https://demo2.chethemes.com/pizzaro/shop-demo/page/6/?shop_view=grid-view&amp;shop_style=lite&amp;shop_layout=full-width&amp;shop_columns=3">6</a>
                </li>
                <li><a className="next page-numbers"
                       href="https://demo2.chethemes.com/pizzaro/shop-demo/page/2/?shop_view=grid-view&amp;shop_style=lite&amp;shop_layout=full-width&amp;shop_columns=3">Next
                    Page &nbsp;&nbsp;&nbsp;→</a></li>
            </ul>
        </nav>
    );
};

export default PizzaPagination;
