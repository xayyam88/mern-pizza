import React from 'react';
import SigninPage from '../../pages/SigninPage';
import Header from '../header/header';
import Footer from '../footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from '../../pages/HomePage';
import ProductPage from '../../pages/ProductPage';
import ProductsPage from '../../pages/productsPage';
import CardPage from '../../pages/CardPage';
import ShippingPage from './../../pages/ShippingPage';
import PlaceOrderPage from '../../pages/PlaceOrderPage';
import OrderPage from '../../pages/OrderPage';
import OrderHistoryPage from '../../pages/OrderHistoryPage';
import AboutPage from './../../pages/AboutPage';
import StockPage from './../../pages/StockPage';
import ContactsPage from './../../pages/ContactsPage';
import Error404Page from './../../pages/Error404Page';
import { listProducts } from './../../redux/actions/productActions';
import data from './../../data';
import ModalMain from './modalMain';

const categoryNames = data.categoryNames;

function App() {
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.filters);
    const [navBar, setNavBar] = React.useState(false);

    const changePosition = () => {
        if (window.scrollY >= 149) {
            setNavBar(true);
        } else {
            setNavBar(false);
        }
    };

    window.addEventListener('scroll', changePosition);
    const onSelectCategory = React.useCallback((index) => {
        dispatch(listProducts(index));
        window.scrollTo({
            top: 900,
            behavior: 'smooth'
        });
    }, []);

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [showModalRestorant, setShowModalRestorant] = React.useState(
        localStorage.getItem('shippingAddress') !== null ? true : false
    );

    const clickshowModalRestorant = (e) => {
        setShowModalRestorant(!showModalRestorant);

        if (localStorage.getItem('shippingAddress') === null) {
            var newAddress = {
                city: 'Bakı',
                address: e.target.innerText,
                currentPosition: {
                    lat: +e.target.attributes[1].value,
                    lng: +e.target.attributes[2].value
                }
            };
            shippingAddress.city = newAddress.city;
            shippingAddress.address = newAddress.address;
            shippingAddress.currentPosition = newAddress.currentPosition;

            localStorage.setItem('shippingAddress', JSON.stringify(newAddress));
        }
    };

    return (
        <BrowserRouter>
            <div id="page" className="hfeed site">
                <Header
                    category={category}
                    onSelectCategory={onSelectCategory}
                    categoryNames={categoryNames}
                    navBar={navBar}
                />
                <Route path="/" component={ProductPage}></Route>
                {showModalRestorant ? (
                    <Switch>
                        <Route exact path="/" component={HomePage}></Route>

                        <Route
                            exact
                            path="/signin"
                            component={SigninPage}
                        ></Route>
                        <Route
                            exact
                            path="/shipping"
                            component={ShippingPage}
                        ></Route>
                        <Route
                            exact
                            path="/about"
                            component={AboutPage}
                        ></Route>
                        <Route
                            exact
                            path="/stock"
                            component={StockPage}
                        ></Route>
                        <Route
                            path="/contacts"
                            component={ContactsPage}
                        ></Route>
                        <Route
                            exact
                            path="/placeorder"
                            component={PlaceOrderPage}
                        ></Route>

                        <Route
                            exact
                            path="/order/:id"
                            component={OrderPage}
                        ></Route>
                        <Route
                            path="/orderhistory"
                            component={OrderHistoryPage}
                        ></Route>
                        <Route exact path="/card" component={CardPage}></Route>
                        <Route
                            exact
                            path="/products"
                            component={ProductsPage}
                        ></Route>

                        <Route component={Error404Page} />
                    </Switch>
                ) : (
                    <>
                        <Route path="/" component={ProductPage}></Route>
                        <Route path="/" component={HomePage} exact></Route>
                        <Route path="/signin" component={SigninPage}></Route>
                        <Route
                            path="/shipping"
                            component={ShippingPage}
                        ></Route>
                        <Route path="/about" component={AboutPage}></Route>
                        <Route path="/stock" component={StockPage}></Route>
                        <Route
                            path="/contacts"
                            component={ContactsPage}
                        ></Route>
                        <Route
                            path="/placeorder"
                            component={PlaceOrderPage}
                        ></Route>
                        <Route path="/order/:id" component={OrderPage}></Route>
                        <Route
                            path="/orderhistory"
                            component={OrderHistoryPage}
                        ></Route>
                        <Route path="/card" component={CardPage}></Route>
                        <Route
                            path="/products"
                            component={ProductsPage}
                        ></Route>
                        <ModalMain
                            clickshowModalRestorant={clickshowModalRestorant}
                        />
                    </>
                )}

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
