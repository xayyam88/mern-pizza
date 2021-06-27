/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    listProducts,
    createdProduct,
    deleteProdcut
} from './../redux/actions/productActions.js';
import MessageBox from './../components/message-box/index';
import LoadingBox from './../components/loading-box/loadingBox';
// import { setSortBy } from './../redux/actions/filtersActions';
import { Link } from 'react-router-dom';
import FooterV from '../components/footer-v/footerV.js';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import data from '../data.js';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import Axios from 'axios';

const sortItems = [
    {
        name: 'Новое и популярное',
        type: 'popular',
        order: 'desc'
    },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавит', type: 'name', order: 'asc' }
];

export default function ProductsPage(props) {
    const categoryNames = data.categoryNames;
    const dataType = data.dataType;
    const dataSize = data.dataSize;
    const productsAdditive = data.productsAdditive;

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [category, setCategory] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageSize, setImageSize] = useState();
    const [types, setTypes] = useState();
    const [sizes, setSizes] = useState();
    const [descPizz, setDescPizz] = useState('');

    const [energyValue, setEnergyValue] = useState('');
    const [protein, setProtein] = useState('');
    const [fats, setFats] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [weight, setWeight] = useState('');

    const [tagInputValue, setTagInputValue] = useState('');
    const [tagInputEnergyValue, setTagInputEnergyValue] = useState('');
    const [tagInputProtein, setTagInputProtein] = useState('');
    const [tagInputFats, setTagInputFats] = useState('');
    const [tagInputCarbohydrates, setTagInputCarbohydrates] = useState('');
    const [tagInputWeight, setTagInputWeight] = useState('');

    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productsAdditiveSave, setProductsAdditiveSave] = useState();
    const [productsListSave, setProductsListSave] = useState();
    const [halveedCheckout, setHalveedCheckout] = useState(false);
    const [rating, setRating] = useState();

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const setHalveedCheckoutAdd = () => {
        setHalveedCheckout(!halveedCheckout);
    };

    const uploadFilesHandler = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploadsize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setImageSize(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setImageUrl(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    const typesAdd = (e) => {
        setTypes(Array.isArray(e) ? e.map((x) => x.value) : []);
    };
    const sizesAdd = (e) => {
        setSizes(Array.isArray(e) ? e.map((x) => x.value) : []);
    };

    const onPick = (productsAdditiveSave, productsListSave) => {
        setProductsAdditiveSave({ productsAdditiveSave });
        setProductsListSave({ productsListSave });
    };

    const productsAdditiveSaveAdd = (e) => {
        setProductsAdditiveSave(Array.isArray(e) ? e.map((x) => x.value) : []);
    };

    const productsListSaveAdd = (e) => {
        setProductsListSave(Array.isArray(e) ? e.map((x) => x.name) : []);
    };

    const { sortBy } = useSelector((state) => state.filters);
    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    const productCreated = useSelector((state) => state.productCreated);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave
    } = productCreated;

    const productDeleted = useSelector((state) => state.deleteProdcut);

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);

    // const onSelectSortType = React.useCallback((type) => {
    //     dispatch(setSortBy(type));
    // }, []);

    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = productDeleted;

    const dispatch = useDispatch();

    const openModal = (product) => {
        window.scrollTo({
            top: 195,
            behavior: 'smooth'
        });

        setModalVisible2(false);
        setModalVisible(true);
        setModalVisible3(false);
        setId(product._id);

        setName(product.name);
        setPrice(product.price);
        setSizes(product.sizes);
        setDescPizz(product.descPizz);

        setEnergyValue(product.energyValue);
        setProtein(product.protein);
        setFats(product.fats);
        setCarbohydrates(product.carbohydrates);
        setWeight(product.weight);

        setDescription(product.description);
        setImageUrl(product.imageUrl);
        setImageSize(product.imageSize);
        setCategory(product.category);
        setTypes(product.types);
        setProductsAdditiveSave(product.productsAdditiveSave);
        setRating(product.rating);
    };

    const openModal2 = (product) => {
        window.scrollTo({
            top: 195,
            behavior: 'smooth'
        });
        setModalVisible2(true);
        setModalVisible(false);
        setModalVisible3(false);
        setProductsAdditiveSave();
        setId(product._id);
        setHalveedCheckout(product.halveedCheckout);
        setName(product.name);

        setEnergyValue(product.energyValue);
        setProtein(product.protein);
        setFats(product.fats);
        setCarbohydrates(product.carbohydrates);
        setWeight(product.weight);

        setPrice(product.price);
        setDescription(product.description);
        setImageUrl(product.imageUrl);
        setCategory(product.category);
        setRating(product.rating);
    };

    const openModal3 = (product) => {
        window.scrollTo({
            top: 195,
            behavior: 'smooth'
        });
        setModalVisible3(true);
        setModalVisible2(false);
        setModalVisible(false);
        setId(product._id);
        setHalveedCheckout(product.halveedCheckout);
        setName(product.name);

        setPrice(product.price);
        setDescription(product.description);
        setImageUrl(product.imageUrl);
        setCategory(product.category);
        setRating(product.rating);
        setProductsListSave(product.productsListSave);
    };

    const deleteHandler = (product) => {
        dispatch(deleteProdcut(product._id));
    };

    // handleInputChangeEnergyValue

    const handleChangeEnergyValue = (field, value) => {
        switch (field) {
            case 'roles':
                break;

            default:
                break;
        }
    };

    const handleKeyDownEnergyValue = (event) => {
        if (!tagInputEnergyValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setEnergyValue(
                    !energyValue
                        ? []
                        : [...energyValue, createOption(tagInputEnergyValue)]
                );

                setTagInputEnergyValue('');

                event.preventDefault();
                break;
            case 'Delete':
            case 'Remove':
                setEnergyValue(energyValue.slice(0, -1));
                event.preventDefault();
                break;

            default:
                break;
        }
    };

    const handleInputChangeEnergyValue = (value) => {
        setTagInputEnergyValue(value);
    };

    // handleInputChangeEnergyValue

    // handleChangeProtein

    const handleChangeProtein = (field, value) => {
        switch (field) {
            case 'roles':
                break;

            default:
                break;
        }
    };

    const handleKeyDownProtein = (event) => {
        if (!tagInputProtein) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setProtein(
                    !protein ? [] : [...protein, createOption(tagInputProtein)]
                );

                setTagInputProtein('');

                event.preventDefault();
                break;
            case 'Delete':
            case 'Remove':
                setProtein(protein.slice(0, -1));
                event.preventDefault();
                break;

            default:
                break;
        }
    };

    const handleInputChangeProtein = (value) => {
        setTagInputProtein(value);
    };

    // handleChangeProtein

    // handleChangeFats

    const handleChangeFats = (field, value) => {
        switch (field) {
            case 'roles':
                break;

            default:
                break;
        }
    };

    const handleKeyDownFats = (event) => {
        if (!tagInputFats) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setFats(!fats ? [] : [...fats, createOption(tagInputFats)]);

                setTagInputFats('');

                event.preventDefault();
                break;
            case 'Delete':
            case 'Remove':
                setFats(fats.slice(0, -1));
                event.preventDefault();
                break;

            default:
                break;
        }
    };

    const handleInputChangeFats = (value) => {
        setTagInputFats(value);
    };

    // handleChangeFats

    // handleChangeCarbohydrates

    const handleChangeCarbohydrates = (field, value) => {
        switch (field) {
            case 'roles':
                break;

            default:
                break;
        }
    };

    const handleKeyDownCarbohydrates = (event) => {
        if (!tagInputCarbohydrates) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setCarbohydrates(
                    !carbohydrates
                        ? []
                        : [
                              ...carbohydrates,
                              createOption(tagInputCarbohydrates)
                          ]
                );

                setTagInputCarbohydrates('');

                event.preventDefault();
                break;
            case 'Delete':
            case 'Remove':
                setCarbohydrates(carbohydrates.slice(0, -1));
                event.preventDefault();
                break;

            default:
                break;
        }
    };

    const handleInputChangeCarbohydrates = (value) => {
        setTagInputCarbohydrates(value);
    };

    // handleChangeCarbohydrates

    // handleChangeWeight

    const handleChangeWeight = (field, value) => {
        switch (field) {
            case 'roles':
                break;

            default:
                break;
        }
    };

    const handleKeyDownWeight = (event) => {
        if (!tagInputWeight) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setWeight(
                    !weight ? [] : [...weight, createOption(tagInputWeight)]
                );

                setTagInputWeight('');

                event.preventDefault();
                break;
            case 'Delete':
            case 'Remove':
                setWeight(weight.slice(0, -1));
                event.preventDefault();
                break;

            default:
                break;
        }
    };

    const handleInputChangeWeight = (value) => {
        setTagInputWeight(value);
    };

    // handleChangeWeight

    // handleChange
    const handleChange = (field, value) => {
        switch (field) {
            case 'roles':
                break;

            default:
                break;
        }
    };

    const handleKeyDown = (event) => {
        if (!tagInputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setDescPizz(
                    !descPizz ? [] : [...descPizz, createOption(tagInputValue)]
                );

                setTagInputValue('');

                event.preventDefault();
                break;
            case 'Delete':
            case 'Remove':
                setDescPizz(descPizz.slice(0, -1));
                event.preventDefault();
                break;

            default:
                break;
        }
    };

    const handleInputChange = (value) => {
        setTagInputValue(value);
    };

    // handleChange

    const createOption = (label) => ({
        label
    });

    const submitHandlerProduct = (e) => {
        e.preventDefault();

        dispatch(
            createdProduct(
                id,
                name,
                imageUrl,
                types,
                sizes,
                descPizz,
                energyValue,
                protein,
                fats,
                carbohydrates,
                weight,
                price,
                category,
                description,
                productsAdditiveSave,
                productsListSave,
                halveedCheckout,
                rating,
                imageSize
            )
        );
    };

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
            setModalVisible2(false);
            setModalVisible3(false);
            setHalveedCheckout(false);
            setName('');
            setPrice('');
            setSizes();
            setDescPizz();
            setEnergyValue();
            setProtein();
            setFats();
            setCarbohydrates();
            setWeight();
            setDescription('');
            setImageUrl('');
            setImageSize();
            setCategory('');
            setTypes();
            setRating('');
            setProductsAdditiveSave();
            setProductsListSave();

            store.addNotification({
                title: name,
                message: id ? 'Mehsul yenilendi' : 'Mehsul yelave olundu',
                type: 'success',
                insert: 'top',
                container: 'top-right',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                timingFunction: 'ease-out',
                dismiss: {
                    duration: 1000,
                    pauseOnHover: true
                },
                right: 0
            });
        }

        dispatch(listProducts(sortBy));
    }, [successSave, successDelete, sortBy]);

    return (
        <div className="container">
            {/* {loadingSave && <div>Loading...</div>} */}
            <ReactNotification />

            {errorSave && <MessageBox>{errorSave}</MessageBox>}

            {modalVisible && (
                <form
                    name="checkout"
                    method="post"
                    className="col-full checkout woocommerce-checkout"
                    onSubmit={submitHandlerProduct}
                    enctype="multipart/form-data"
                >
                    <div id="customer_details" className="col3-set">
                        <div className="col-1">
                            <div className="woocommerce-billing-fields">
                                <h3>Create product</h3>
                                <button
                                    type="button"
                                    onClick={() => setModalVisible(false)}
                                    className="button secondary"
                                >
                                    Back
                                </button>
                                <div className="woocommerce-billing-fields__field-wrapper">
                                    <p
                                        className="form-row form-row-first validate-required"
                                        id="billing_first_name_field"
                                        data-priority="10"
                                    >
                                        <label
                                            for="billing_first_name"
                                            className=""
                                        >
                                            Name&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <input
                                                type="text"
                                                className="input-text "
                                                name="billing_first_name"
                                                value={name}
                                                id="billing_first_name"
                                                placeholder="name"
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </span>
                                    </p>
                                    <p
                                        className="form-row form-row-last validate-required"
                                        id="billing_last_name_field"
                                        data-priority="20"
                                    >
                                        <label
                                            for="billing_last_img"
                                            className=""
                                        >
                                            ImageUrl&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <img src={imageUrl} width="45" />

                                            <input
                                                type="file"
                                                id="imageFile"
                                                label="Choose Image"
                                                onChange={uploadFileHandler}
                                            ></input>
                                            {loadingUpload && (
                                                <LoadingBox></LoadingBox>
                                            )}
                                            {errorUpload && (
                                                <MessageBox variant="danger">
                                                    {errorUpload}
                                                </MessageBox>
                                            )}
                                        </span>
                                    </p>
                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Category&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <select
                                                className="input-text"
                                                onChange={(e) =>
                                                    setCategory(e.target.value)
                                                }
                                                value={!category ? 1 : category}
                                            >
                                                {categoryNames.map(
                                                    (obj, index) => (
                                                        <option value={index}>
                                                            {obj.catName}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </span>
                                    </p>
                                    <p
                                        className="form-row form-row-wide validate-required validate-phone"
                                        id="billing_phone_field"
                                        data-priority="100"
                                    >
                                        <label for="billing_phone" className="">
                                            Types&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>

                                        <Select
                                            isMulti
                                            options={dataType}
                                            value={
                                                types &&
                                                types.map(
                                                    (obj, index) =>
                                                        dataType[obj]
                                                )
                                            }
                                            onChange={typesAdd}
                                        ></Select>
                                    </p>
                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Sizes&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <Select
                                                isMulti
                                                options={dataSize}
                                                value={
                                                    sizes &&
                                                    sizes.map(
                                                        (obj, index) =>
                                                            dataSize[index]
                                                    )
                                                }
                                                onChange={sizesAdd}
                                            ></Select>
                                        </span>
                                    </p>

                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_last_name_field"
                                        data-priority="20"
                                    >
                                        <label
                                            for="billing_last_img"
                                            className=""
                                        >
                                            Image size&nbsp; (30sm or other
                                            size, 40sm, 30 тонкое, 40 тонкое)
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <div className="product-header">
                                                {imageSize &&
                                                    imageSize.map((image) => (
                                                        <img
                                                            src={image}
                                                            width="45"
                                                        />
                                                    ))}
                                            </div>
                                            {/* <img src={imageSize} width="45" /> */}

                                            <input
                                                type="file"
                                                id="imageFiles"
                                                label="Choose Image"
                                                onChange={uploadFilesHandler}
                                                multiple
                                            ></input>
                                            {loadingUpload && (
                                                <LoadingBox></LoadingBox>
                                            )}
                                            {errorUpload && (
                                                <MessageBox variant="danger">
                                                    {errorUpload}
                                                </MessageBox>
                                            )}
                                        </span>
                                    </p>
                                    <div className="contain_composition">
                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                DescPizz&nbsp;
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={tagInputValue}
                                                    menuIsOpen={false}
                                                    onChange={handleChange}
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={handleKeyDown}
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChange
                                                    }
                                                    name="color"
                                                    value={descPizz}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                EnergyValue&nbsp; (26sm or other
                                                size, 30sm, 40sm)
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={
                                                        tagInputEnergyValue
                                                    }
                                                    menuIsOpen={false}
                                                    onChange={
                                                        handleChangeEnergyValue
                                                    }
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={
                                                        handleKeyDownEnergyValue
                                                    }
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChangeEnergyValue
                                                    }
                                                    name="color"
                                                    value={energyValue}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                Protein&nbsp; (26sm or other
                                                size, 30sm, 40sm)
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={tagInputProtein}
                                                    menuIsOpen={false}
                                                    onChange={
                                                        handleChangeProtein
                                                    }
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={
                                                        handleKeyDownProtein
                                                    }
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChangeProtein
                                                    }
                                                    name="color"
                                                    value={protein}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                Fats&nbsp; (26sm or other size,
                                                30sm, 40sm)
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={tagInputFats}
                                                    menuIsOpen={false}
                                                    onChange={handleChangeFats}
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={
                                                        handleKeyDownFats
                                                    }
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChangeFats
                                                    }
                                                    name="color"
                                                    value={fats}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                Carbohydrates&nbsp; (26sm or
                                                other size, 30sm, 40sm)
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={
                                                        tagInputCarbohydrates
                                                    }
                                                    menuIsOpen={false}
                                                    onChange={
                                                        handleChangeCarbohydrates
                                                    }
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={
                                                        handleKeyDownCarbohydrates
                                                    }
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChangeCarbohydrates
                                                    }
                                                    name="color"
                                                    value={carbohydrates}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                Weight&nbsp; (26sm or other
                                                size, 30sm, 40sm)
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={tagInputWeight}
                                                    menuIsOpen={false}
                                                    onChange={
                                                        handleChangeWeight
                                                    }
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={
                                                        handleKeyDownWeight
                                                    }
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChangeWeight
                                                    }
                                                    name="color"
                                                    value={weight}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                Price&nbsp;
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <input
                                                    type="text"
                                                    className="input-text "
                                                    name="billing_email"
                                                    value={price}
                                                    id="billing_email"
                                                    placeholder=""
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                />
                                            </span>
                                        </p>
                                    </div>

                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Description&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <textarea
                                                type="text"
                                                className="input-text "
                                                name="billing_email"
                                                value={description}
                                                id="billing_email"
                                                placeholder=""
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </span>
                                    </p>

                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Products Additive&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <Select
                                                isMulti
                                                options={productsAdditive}
                                                closeMenuOnSelect={false}
                                                value={
                                                    productsAdditiveSave &&
                                                    productsAdditiveSave.map(
                                                        (obj, index) =>
                                                            productsAdditive[
                                                                obj
                                                            ]
                                                    )
                                                }
                                                styles={{
                                                    option: (base) => ({
                                                        ...base,
                                                        border: `1px dotted #666`,
                                                        height: '100%'
                                                    })
                                                }}
                                                onChange={
                                                    productsAdditiveSaveAdd
                                                }
                                            ></Select>

                                            <div></div>
                                        </span>
                                    </p>

                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Rating&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <input
                                                type="text"
                                                className="input-text "
                                                name="billing_email"
                                                value={rating}
                                                id="billing_email"
                                                placeholder=""
                                                onChange={(e) =>
                                                    setRating(e.target.value)
                                                }
                                            />
                                        </span>
                                    </p>

                                    <button
                                        type="submit"
                                        class="woocommerce-Button woocommerce-button button woocommerce-form-register__submit"
                                    >
                                        {id ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {modalVisible2 && (
                <form
                    name="checkout"
                    method="post"
                    className="col-full checkout woocommerce-checkout"
                    onSubmit={submitHandlerProduct}
                    enctype="multipart/form-data"
                >
                    <div id="customer_details" className="col3-set">
                        <div className="col-1">
                            <div className="woocommerce-billing-fields">
                                <h3>Create product</h3>
                                <button
                                    type="button"
                                    onClick={() => setModalVisible2(false)}
                                    className="button secondary"
                                >
                                    Back
                                </button>
                                <div className="woocommerce-billing-fields__field-wrapper">
                                    <p
                                        className="form-row form-row-first validate-required"
                                        id="billing_first_name_field"
                                        data-priority="10"
                                    >
                                        <label
                                            for="billing_first_name"
                                            className=""
                                        >
                                            Name&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <input
                                                type="text"
                                                className="input-text "
                                                name="billing_first_name"
                                                value={name}
                                                id="billing_first_name"
                                                placeholder="name"
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </span>
                                    </p>
                                    <p
                                        className="form-row form-row-last validate-required"
                                        id="billing_last_name_field"
                                        data-priority="20"
                                    >
                                        <label
                                            for="billing_last_img"
                                            className=""
                                        >
                                            ImageUrl&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <img src={imageUrl} width="45" />

                                            <input
                                                type="file"
                                                id="imageFile"
                                                label="Choose Image"
                                                onChange={uploadFileHandler}
                                            ></input>
                                            {loadingUpload && (
                                                <LoadingBox></LoadingBox>
                                            )}
                                            {errorUpload && (
                                                <MessageBox variant="danger">
                                                    {errorUpload}
                                                </MessageBox>
                                            )}
                                        </span>
                                    </p>
                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Category&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <select
                                                className="input-text"
                                                onChange={(e) =>
                                                    setCategory(e.target.value)
                                                }
                                                value={!category ? 1 : category}
                                            >
                                                {categoryNames.map(
                                                    (obj, index) => (
                                                        <option value={index}>
                                                            {obj.catName}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </span>
                                    </p>

                                    <div className="contain_composition">
                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                EnergyValue&nbsp;
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={
                                                        tagInputEnergyValue
                                                    }
                                                    menuIsOpen={false}
                                                    onChange={
                                                        handleChangeEnergyValue
                                                    }
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={
                                                        handleKeyDownEnergyValue
                                                    }
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChangeEnergyValue
                                                    }
                                                    name="color"
                                                    value={energyValue}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                Protein&nbsp;
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={tagInputProtein}
                                                    menuIsOpen={false}
                                                    onChange={
                                                        handleChangeProtein
                                                    }
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={
                                                        handleKeyDownProtein
                                                    }
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChangeProtein
                                                    }
                                                    name="color"
                                                    value={protein}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                Fats&nbsp;
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={tagInputFats}
                                                    menuIsOpen={false}
                                                    onChange={handleChangeFats}
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={
                                                        handleKeyDownFats
                                                    }
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChangeFats
                                                    }
                                                    name="color"
                                                    value={fats}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                Carbohydrates&nbsp;
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={
                                                        tagInputCarbohydrates
                                                    }
                                                    menuIsOpen={false}
                                                    onChange={
                                                        handleChangeCarbohydrates
                                                    }
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={
                                                        handleKeyDownCarbohydrates
                                                    }
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChangeCarbohydrates
                                                    }
                                                    name="color"
                                                    value={carbohydrates}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                Weight&nbsp;
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <Creatable
                                                    isClearable
                                                    isMulti
                                                    components={{
                                                        DropdownIndicator: null
                                                    }}
                                                    inputValue={tagInputWeight}
                                                    menuIsOpen={false}
                                                    onChange={
                                                        handleChangeWeight
                                                    }
                                                    placeholder="Type something and press enter..."
                                                    onKeyDown={
                                                        handleKeyDownWeight
                                                    }
                                                    styles={{
                                                        multiValueLabel: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                '#8ca93e',
                                                            color: 'white'
                                                        })
                                                    }}
                                                    onInputChange={
                                                        handleInputChangeWeight
                                                    }
                                                    name="color"
                                                    value={weight}
                                                />
                                            </span>
                                        </p>

                                        <p
                                            className="form-row form-row-wide validate-required validate-email"
                                            id="billing_email_field"
                                            data-priority="110"
                                        >
                                            <label
                                                for="billing_email"
                                                className=""
                                            >
                                                Price&nbsp;
                                                <abbr
                                                    className="required"
                                                    title="required"
                                                >
                                                    *
                                                </abbr>
                                            </label>
                                            <span className="woocommerce-input-wrapper">
                                                <input
                                                    type="text"
                                                    className="input-text "
                                                    name="billing_email"
                                                    value={price}
                                                    id="billing_email"
                                                    placeholder=""
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                />
                                            </span>
                                        </p>
                                    </div>

                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Description&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <textarea
                                                type="text"
                                                className="input-text "
                                                name="billing_email"
                                                value={description}
                                                id="billing_email"
                                                placeholder=""
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </span>
                                    </p>

                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Rating&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <input
                                                type="text"
                                                className="input-text "
                                                name="billing_email"
                                                value={rating}
                                                id="billing_email"
                                                placeholder=""
                                                onChange={(e) =>
                                                    setRating(e.target.value)
                                                }
                                            />
                                        </span>
                                    </p>

                                    <button
                                        type="submit"
                                        class="woocommerce-Button woocommerce-button button woocommerce-form-register__submit"
                                    >
                                        {id ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {modalVisible3 && (
                <form
                    name="checkout"
                    method="post"
                    className="col-full checkout woocommerce-checkout"
                    onSubmit={submitHandlerProduct}
                    enctype="multipart/form-data"
                >
                    <div id="customer_details" className="col3-set">
                        <div className="col-1">
                            <div className="woocommerce-billing-fields">
                                <h3>Create halved</h3>
                                <button
                                    type="button"
                                    onClick={() => setModalVisible3(false)}
                                    className="button secondary"
                                >
                                    Back
                                </button>
                                <div className="woocommerce-billing-fields__field-wrapper">
                                    <p
                                        className="form-row form-row-first validate-required"
                                        id="billing_first_name_field"
                                        data-priority="10"
                                    >
                                        <label
                                            for="billing_first_name"
                                            className=""
                                        >
                                            Name&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <input
                                                type="checkbox"
                                                name="billing_first_check"
                                                value={halveedCheckout}
                                                checked={
                                                    halveedCheckout
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setHalveedCheckoutAdd(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </span>
                                    </p>

                                    <p
                                        className="form-row form-row-first validate-required"
                                        id="billing_first_name_field"
                                        data-priority="10"
                                    >
                                        <label
                                            for="billing_first_name"
                                            className=""
                                        >
                                            Name&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <input
                                                type="text"
                                                className="input-text "
                                                name="billing_first_name"
                                                value={name}
                                                id="billing_first_name"
                                                placeholder="name"
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </span>
                                    </p>

                                    <p
                                        className="form-row form-row-last validate-required"
                                        id="billing_last_name_field"
                                        data-priority="20"
                                    >
                                        <label
                                            for="billing_last_img"
                                            className=""
                                        >
                                            ImageUrl&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <img src={imageUrl} width="45" />

                                            <input
                                                type="file"
                                                id="imageFile"
                                                label="Choose Image"
                                                onChange={uploadFileHandler}
                                            ></input>
                                            {loadingUpload && (
                                                <LoadingBox></LoadingBox>
                                            )}
                                            {errorUpload && (
                                                <MessageBox variant="danger">
                                                    {errorUpload}
                                                </MessageBox>
                                            )}
                                        </span>
                                    </p>

                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Category&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <select
                                                className="input-text"
                                                onChange={(e) =>
                                                    setCategory(e.target.value)
                                                }
                                                value={!category ? 1 : category}
                                            >
                                                {categoryNames.map(
                                                    (obj, index) => (
                                                        <option value={index}>
                                                            {obj.catName}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </span>
                                    </p>

                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Products list&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <Select
                                                isMulti
                                                options={products}
                                                getOptionLabel={(products) =>
                                                    products.category === 1
                                                        ? products.name
                                                        : ''
                                                }
                                                getOptionValue={(products) =>
                                                    products.category === 1
                                                        ? products.name
                                                        : ''
                                                }
                                                value={
                                                    productsListSave &&
                                                    (productsListSave.length ===
                                                    0
                                                        ? products.name
                                                        : productsListSave.map(
                                                              (obj, index) =>
                                                                  products[
                                                                      index
                                                                  ]
                                                          ))
                                                }
                                                closeMenuOnSelect={false}
                                                styles={{
                                                    option: (base) => ({
                                                        ...base,
                                                        border: `1px dotted #666`,
                                                        height: '100%'
                                                    })
                                                }}
                                                onChange={productsListSaveAdd}
                                            ></Select>

                                            <div></div>
                                        </span>
                                    </p>

                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Price&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <input
                                                type="text"
                                                className="input-text "
                                                name="billing_email"
                                                value={price}
                                                id="billing_email"
                                                placeholder=""
                                                onChange={(e) =>
                                                    setPrice(e.target.value)
                                                }
                                            />
                                        </span>
                                    </p>
                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Description&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <textarea
                                                type="text"
                                                className="input-text "
                                                name="billing_email"
                                                value={description}
                                                id="billing_email"
                                                placeholder=""
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </span>
                                    </p>
                                    <p
                                        className="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field"
                                        data-priority="110"
                                    >
                                        <label for="billing_email" className="">
                                            Rating&nbsp;
                                            <abbr
                                                className="required"
                                                title="required"
                                            >
                                                *
                                            </abbr>
                                        </label>
                                        <span className="woocommerce-input-wrapper">
                                            <input
                                                type="text"
                                                className="input-text "
                                                name="billing_email"
                                                value={rating}
                                                id="billing_email"
                                                placeholder=""
                                                onChange={(e) =>
                                                    setRating(e.target.value)
                                                }
                                            />
                                        </span>
                                    </p>
                                    <button
                                        type="submit"
                                        class="woocommerce-Button woocommerce-button button woocommerce-form-register__submit"
                                    >
                                        {id ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            <table className="table">
                <div className="product-header">
                    <h2 className="title">Create product</h2>
                    <div className="button_w">
                        <button
                            className="button"
                            onClick={() => openModal({})}
                        >
                            Add pizza
                        </button>
                        <button
                            className="button"
                            onClick={() => openModal2({})}
                        >
                            Add product
                        </button>
                        <button
                            className="button"
                            onClick={() => openModal3({})}
                        >
                            Halved pizza
                        </button>
                    </div>
                </div>
                {/* <SortPizza
                    activeSortType={sortBy.type}
                    items={sortItems}
                    onClickSortType={onSelectSortType}
                /> */}
                <tbody>
                    {loading ? (
                        <ul className="products columns-3">
                            {Array(9)
                                .fill(0)
                                .map((_, index) => (
                                    <li className="addon-product product">
                                        <LoadingBox key={index}></LoadingBox>
                                    </li>
                                ))}
                        </ul>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            <h2 className="h2-header"></h2>
                            <ul className="products columns-3">
                                {products.map((product) => (
                                    <li
                                        key={product._id}
                                        className="addon-product product"
                                    >
                                        <div className="product-outer">
                                            <div className="product-inner">
                                                <div className="product-image-wrapper">
                                                    <Link
                                                        to={{}}
                                                        className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                                                    >
                                                        <img
                                                            src={
                                                                product.imageUrl
                                                            }
                                                            className="attachment-shop_catalog size-shop_catalog wp-post-image"
                                                            alt=""
                                                            title="product-3"
                                                            sizes="(max-width: 300px) 100vw, 300px"
                                                            width="300"
                                                            height="300"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="product-content-wrapper">
                                                    <Link className="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                                                        <h2 className="woocommerce-loop-product__title">
                                                            {product.name}
                                                        </h2>
                                                        <div className="woocommerce-product-details__short-description">
                                                            <p
                                                                id="rmjs-1"
                                                                data-readmore=""
                                                                aria-expanded="false"
                                                            >
                                                                <span className="price">
                                                                    <span className="woocommerce-Price-amount amount">
                                                                        {categoryNames.map(
                                                                            (
                                                                                obj,
                                                                                index
                                                                            ) =>
                                                                                index ===
                                                                                    product.category &&
                                                                                obj.catName
                                                                        )}
                                                                    </span>
                                                                    <br />
                                                                    <span className="woocommerce-Price-amount amount">
                                                                        <span className="woocommerce-Price-currencySymbol">
                                                                            £
                                                                        </span>
                                                                        {
                                                                            product.price
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </Link>
                                                    <div
                                                        className="hover-area"
                                                        to={{
                                                            pathname: '/',
                                                            search: `?product=${product._id}`,
                                                            id: product._id
                                                        }}
                                                    >
                                                        {product.halveedCheckout ===
                                                        false ? (
                                                            product.imageSize
                                                                .length ===
                                                            0 ? (
                                                                <button
                                                                    className="button"
                                                                    onClick={() =>
                                                                        openModal2(
                                                                            product
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="button"
                                                                    onClick={() =>
                                                                        openModal(
                                                                            product
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            )
                                                        ) : (
                                                            <button
                                                                className="button"
                                                                onClick={() =>
                                                                    openModal3(
                                                                        product
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </button>
                                                        )}

                                                        <button
                                                            className="button"
                                                            onClick={() =>
                                                                deleteHandler(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </tbody>
            </table>
            <FooterV />
        </div>
    );
}
