import React from 'react';

import MainMenu from './main-menu';
import HeaderPhone from './header-phone';
import CartButton from './cart-button';
import HeaderLogo from './header-logo';

const TopHeader = () => {
    return (
        <div className="header-wrap">
            <HeaderLogo />

            <MainMenu />
            <div className="header-info-wrapper">
                <HeaderPhone
                    items={[
                        ['Yasamal filialı', '55 548 779 654'],
                        ['Elimlər filialı', '50 548 779 654'],
                        ['Binəqədi filialı', '51 548 779 654']
                    ]}
                />
                <CartButton />
            </div>
        </div>
    );
};

export default TopHeader;
