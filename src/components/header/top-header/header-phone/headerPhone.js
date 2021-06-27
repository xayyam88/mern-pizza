import React from 'react';

const HeaderPhone = ({ items }) => {
    const [visibleCountry, setVisibleCountry] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState(0);
    const sortRef = React.useRef();
    const activeLabel = items[activeItem];

    const onSelectItem = (index) => {
        setActiveItem(index);
    };

    const toggleVisibleSort = () => {
        setVisibleCountry(!visibleCountry);
    };

    const handleOutsideClick = (e) => {
        if (e.target !== sortRef.current) {
            setVisibleCountry(false);
        }
    };

    React.useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div className="header-phone-numbers">
            <div className="header-phone-numbers-wrap">
                <div class="sort">
                    <div class="sort__label">
                        <span className="intro-text">Onlayn sifariş et</span>

                        <div onClick={toggleVisibleSort}>
                            <span ref={sortRef} className="intro-text_active">
                                {activeLabel[0]}
                            </span>
                            <svg
                                className={
                                    visibleCountry
                                        ? 'sort__svg-active'
                                        : 'sort__svg'
                                }
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                                    fill="#ffffff"
                                />
                            </svg>
                        </div>
                    </div>
                    {visibleCountry && (
                        <div class="sort__popup">
                            <ul>
                                {items &&
                                    items.map((name, index) => (
                                        <li
                                            onClick={(e) => {
                                                onSelectItem(index);
                                                e.preventDefault();
                                            }}
                                            key={`${name}_${index}`}
                                            className={
                                                activeItem === index
                                                    ? 'active-sort'
                                                    : ''
                                            }
                                        >
                                            {name[0]}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <span id="city-phone-number-label" className="phone-number">
                {activeLabel[1]}
            </span>
        </div>
    );
};

export default HeaderPhone;
