/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import PizzaNavigation from './pizza-navigation';
import { useDispatch } from 'react-redux';

import { listProducts } from './../../../redux/actions/productActions';

const BottomHeaderMob = ({ categoryNames }) => {
    const dispatch = useDispatch();

    const [navBar2, setNavBar2] = React.useState(false);

    const changePosition = () => {
        if (window.scrollY >= 149) {
            setNavBar2(true);
        } else {
            setNavBar2(false);
        }
    };

    window.addEventListener('scroll', changePosition);
    const onSelectCategory = React.useCallback((index) => {
        // dispatch(setCategory(index));
        dispatch(listProducts(index));
        window.scrollTo({
            top: 500,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div
            className={
                navBar2
                    ? 'pizzaro-secondary-navigation2 pizzaro-secondary-navigation active'
                    : 'pizzaro-secondary-navigation2 pizzaro-secondary-navigation '
            }
        >
            <PizzaNavigation
                onClickCategory={onSelectCategory}
                items={categoryNames}
                navBarPosition={navBar2}
            />
        </div>
    );
};

export default BottomHeaderMob;
