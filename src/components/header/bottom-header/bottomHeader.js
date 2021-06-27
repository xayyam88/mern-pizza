import React from 'react';

import PizzaNavigation from './pizza-navigation';

const BottomHeader = ({
    category,
    onSelectCategory,
    categoryNames,
    navBar
}) => {
    return (
        <div
            className={
                navBar
                    ? 'pizzaro-secondary-navigation active'
                    : 'pizzaro-secondary-navigation'
            }
        >
            <PizzaNavigation
                activeCategory={category}
                onClickCategory={onSelectCategory}
                items={categoryNames}
                navBarPosition={navBar}
            />
        </div>
    );
};

export default BottomHeader;
