/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/message-box';
import { signin, register } from '../redux/actions/userActions';

export default function SigninPage(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, error } = userSignin;

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo1, errorReg } = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };

    const submitRegistor = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password are not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        if (userInfo1) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo, userInfo1]);

    return (
        <div id="content" tabindex="-1" class="">
            <div class="col-full">
                <div class="pizzaro-breadcrumb">
                    <nav class="woocommerce-breadcrumb">
                        <a href="https://demo2.chethemes.com/pizzaro">Home</a>
                        <span class="delimiter">
                            <i class="fa fa-arrow-right"></i>
                        </span>
                        My Account
                    </nav>
                </div>
                <div id="primary" class="content-area">
                    <main id="main" class="site-main" role="main">
                        <div
                            id="post-10"
                            class="post-10 page type-page status-publish hentry"
                        >
                            <div class="entry-content">
                                <div class="woocommerce">
                                    <div class="customer-login-form">
                                        <span class="or-text">or</span>
                                        <div class="woocommerce-notices-wrapper"></div>

                                        <div
                                            class="u-columns col2-set"
                                            id="customer_login"
                                        >
                                            <div class="u-column1 col-1">
                                                <h2>Login</h2>

                                                <form
                                                    class="woocommerce-form woocommerce-form-login login"
                                                    onSubmit={submitHandler}
                                                >
                                                    <p class="before-login-text">
                                                        {error && (
                                                            <MessageBox variant="danger">
                                                                {error}
                                                            </MessageBox>
                                                        )}
                                                    </p>

                                                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                        <label for="email">
                                                            Username or email
                                                            address&nbsp;
                                                            <span class="required">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            class="input-text"
                                                            id="email"
                                                            placeholder="Enter email"
                                                            required
                                                            onChange={(e) =>
                                                                setEmail(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        ></input>
                                                    </p>
                                                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                        <label for="password">
                                                            Password&nbsp;
                                                            <span class="required">
                                                                *
                                                            </span>
                                                        </label>
                                                        <span class="password-input">
                                                            <input
                                                                class="woocommerce-Input woocommerce-Input--text input-text"
                                                                type="password"
                                                                id="password"
                                                                placeholder="Enter password"
                                                                required
                                                                onChange={(e) =>
                                                                    setPassword(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            <span class="show-password-input"></span>
                                                        </span>
                                                    </p>

                                                    <p class="form-row">
                                                        <button
                                                            type="submit"
                                                            class="woocommerce-button button woocommerce-form-login__submit"
                                                            name="login"
                                                            value="Log in"
                                                        >
                                                            Log in
                                                        </button>
                                                    </p>
                                                    <p class="woocommerce-LostPassword lost_password">
                                                        <a href="https://demo2.chethemes.com/pizzaro/my-account/lost-password/">
                                                            Lost your password?
                                                        </a>
                                                    </p>
                                                </form>
                                            </div>

                                            <div class="u-column2 col-2">
                                                <h2>Register</h2>

                                                <form
                                                    onSubmit={submitRegistor}
                                                    class="woocommerce-form woocommerce-form-register register"
                                                >
                                                    <p class="before-register-text">
                                                        {errorReg && (
                                                            <MessageBox variant="danger">
                                                                {errorReg}
                                                            </MessageBox>
                                                        )}
                                                    </p>

                                                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                        <label for="reg_name">
                                                            Name&nbsp;
                                                            <span class="required">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="woocommerce-Input woocommerce-Input--text input-text"
                                                            id="reg_name"
                                                            placeholder="Enter password"
                                                            required
                                                            onChange={(e) =>
                                                                setName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </p>

                                                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                        <label for="reg_email">
                                                            Email address&nbsp;
                                                            <span class="required">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            class="woocommerce-Input woocommerce-Input--text input-text"
                                                            id="reg_email"
                                                            placeholder="Enter email"
                                                            required
                                                            onChange={(e) =>
                                                                setEmail(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        ></input>
                                                    </p>

                                                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                        <label for="reg_password">
                                                            Password&nbsp;
                                                            <span class="required">
                                                                *
                                                            </span>
                                                        </label>
                                                        <span class="password-input">
                                                            <input
                                                                class="woocommerce-Input woocommerce-Input--text input-text"
                                                                type="password"
                                                                id="reg_password"
                                                                placeholder="Enter password"
                                                                required
                                                                onChange={(e) =>
                                                                    setPassword(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            <span class="show-password-input"></span>
                                                        </span>
                                                    </p>

                                                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                        <label for="confirmPassword">
                                                            Confirm
                                                            password&nbsp;
                                                            <span class="required">
                                                                *
                                                            </span>
                                                        </label>
                                                        <span class="password-input">
                                                            <input
                                                                type="password"
                                                                class="woocommerce-Input woocommerce-Input--text input-text"
                                                                id="confirmPassword"
                                                                placeholder="Enter password"
                                                                onChange={(e) =>
                                                                    setConfirmPassword(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            <span class="show-password-input"></span>
                                                        </span>
                                                    </p>

                                                    <div class="woocommerce-privacy-policy-text"></div>
                                                    <p class="woocommerce-form-row form-row">
                                                        <button
                                                            type="submit"
                                                            class="woocommerce-Button woocommerce-button button woocommerce-form-register__submit"
                                                            name="register"
                                                            value="Register"
                                                        >
                                                            Register
                                                        </button>
                                                    </p>

                                                    <div class="register-benefits">
                                                        <h3>
                                                            Sign up today and
                                                            you will be able to
                                                            :
                                                        </h3>
                                                        <ul>
                                                            <li>
                                                                Speed your way
                                                                through checkout
                                                            </li>
                                                            <li>
                                                                Track your
                                                                orders easily
                                                            </li>
                                                            <li>
                                                                Keep a record of
                                                                all your
                                                                purchases
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
