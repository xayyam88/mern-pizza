import React from 'react';

import TopHeader from './top-header/topHeader';
import BottomHeader from './bottom-header/bottomHeader';

import './header.css';
import BottomHeaderMob from './bottom-header/bottomHeaderMob';

const Header = ({ category, onSelectCategory, categoryNames, navBar }) => {
    return (
        <div>
            <header
                id="masthead"
                className="site-header header-v1"
                role="banner"
            >
                <div className="site-header-wrap">
                    <div className="col-full">
                        <TopHeader />
                        <BottomHeader
                            category={category}
                            onSelectCategory={onSelectCategory}
                            categoryNames={categoryNames}
                            navBar={navBar}
                        />
                        <BottomHeaderMob
                            category={category}
                            onSelectCategory={onSelectCategory}
                            categoryNames={categoryNames}
                        />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
