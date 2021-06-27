import express from 'express';
import expressAsyncHandler from 'express-async-handler';
// import data from '../data.js';
import Product from '../models/productModel.js';
// import { isAdmin, isAuth } from './../utils.js';

const productRouter = express.Router();

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const category = +req.query.category ? +req.query.category : 0;

        // const order = req.query.order || '';

        // const sortOrder =
        //     order === 'popular'
        //         ? { rating: 1 } && { _id: -1 }
        //         : order === 'price'
        //         ? { price: 1 }
        //         : order === 'name'
        //         ? { name: 1 }
        //         : { price: 1 };
        let sorty = { category: 1, createdAt: 1 };

        const Products = await Product.find(
            category === 0 ? {} : { category }
        ).sort(sorty);
        res.send(Products);
    })
);

// productRouter.get(
//     '/seed',
//     expressAsyncHandler(async (req, res) => {
//         // await User.remove({});
//         const createdProduct = await Product.insertMany(data.products);
//         res.send({ createdProduct });
//     })
// );

productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

productRouter.post(
    '/',
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: req.body.name,
            imageUrl: req.body.imageUrl || './uploads/default/p1.png',
            imageSize: req.body.imageSize,
            types: req.body.types,
            sizes: req.body.sizes,
            descPizz: req.body.descPizz,

            energyValue: req.body.energyValue,
            protein: req.body.protein,
            fats: req.body.fats,
            carbohydrates: req.body.carbohydrates,
            weight: req.body.weight,

            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            productsAdditiveSave: req.body.productsAdditiveSave,
            productsListSave: req.body.productsListSave,
            halveedCheckout: req.body.halveedCheckout,
            rating: req.body.rating
        });
        const newProduct = await product.save();

        if (!req.file) return res.send('Please upload a file');
        if (newProduct) {
            return res.status(201).send({
                message: 'new product created',
                data: newProduct
            });
        }

        return res.status(500).send({ message: 'Error in created' });
    })
);

productRouter.put(
    '/create/:id',
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        console.log(product);

        if (product) {
            product.name = req.body.name;
            product.imageUrl = req.body.imageUrl;
            product.imageSize = req.body.imageSize;
            product.categoryMenu = req.body.categoryMenu;
            product.types = req.body.types;
            product.sizes = req.body.sizes;
            product.descPizz = req.body.descPizz;

            product.energyValue = req.body.energyValue;
            product.protein = req.body.protein;
            product.fats = req.body.fats;
            product.carbohydrates = req.body.carbohydrates;
            product.weight = req.body.weight;

            product.price = req.body.price;
            product.category = req.body.category;
            product.description = req.body.description;
            product.productsAdditiveSave = req.body.productsAdditiveSave;
            product.productsListSave = req.body.productsListSave;
            product.rating = req.body.rating;
            product.halveedCheckout = req.body.halveedCheckout;

            const updateProduct = await product.save();
            if (updateProduct) {
                return res.status(200).send({
                    message: 'Product update',
                    data: updateProduct
                });
            }
        }
        return res.status(500).send({ message: 'Error in created' });
    })
);

productRouter.delete(
    '/delete/:id',
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const deletedProduct = await Product.findById(productId);
        if (deletedProduct) {
            await deletedProduct.remove();
            res.send({ message: 'Product Deleted' });
        } else {
            res.send('Error in Deletion.');
        }
    })
);

export default productRouter;
