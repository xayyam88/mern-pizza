import React from 'react';
import PropTypes from 'prop-types';

const SortPizza = React.memo(function SortPizza({
    items,
    activeSortType,
    onClickSortType
}) {
    const [visibleSort, setVisibleSort] = React.useState(false);
    const sortRef = React.useRef();
    const activeLabel = items.find((obj) => obj.type === activeSortType).name;

    const toggleVisibleSort = () => {
        setVisibleSort(!visibleSort);
    };

    const handleOutsideClick = (e) => {
        if (e.target !== sortRef.current) {
            setVisibleSort(false);
        }
    };

    const onSelectItem = (index) => {
        if (onClickSortType) {
            onClickSortType(index);
        }
        setVisibleSort(false);
    };

    React.useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div className="create-your-own">
            <div className="header-phone-numbers-wrap">
                <div className="sort">
                    <div onClick={toggleVisibleSort} className="sort__label">
                        <div>
                            <span
                                ref={sortRef}
                                className="intro-text_active sort-pizza_active"
                            >
                                {activeLabel}
                                <svg
                                    className={
                                        visibleSort
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
                                        fill="#515151"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    {visibleSort && (
                        <div className="sort__popup sort__popup-pizza">
                            <ul>
                                {items &&
                                    items.map((obj, index) => (
                                        <li
                                            onClick={(e) => {
                                                onSelectItem(obj);
                                                e.preventDefault();
                                            }}
                                            key={`${obj.type}_${index}`}
                                            className={
                                                activeSortType === obj.type
                                                    ? 'active-sort'
                                                    : ''
                                            }
                                        >
                                            {obj.name}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

SortPizza.propTypes = {
    activeSortType: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClickSortType: PropTypes.func.isRequired
};

SortPizza.defaultProps = {
    items: []
};

export default SortPizza;
