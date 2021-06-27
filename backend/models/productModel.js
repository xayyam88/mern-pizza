import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        imageUrl: { type: String, required: false },
        imageSize: { type: Array, required: false },
        types: { type: Array, required: false },
        sizes: { type: Array, required: false },
        descPizz: { type: Array, required: false },
        energyValue: { type: Array, required: false },
        protein: { type: Array, required: false },
        fats: { type: Array, required: false },
        carbohydrates: { type: Array, required: false },
        weight: { type: Array, required: false },
        price: { type: Number, required: true },
        category: { type: Number, default: 0, required: true },
        description: { type: String, required: true },
        productsAdditiveSave: { type: Array, required: false },
        productsListSave: { type: Array, required: false },
        halveedCheckout: { type: Boolean, default: false, required: false },
        rating: { type: Number, required: false }
    },
    {
        timestamps: true
    }
);

productSchema.pre('save', function (next) {
    if (
        (this.isNew && 0 === this.imageSize.length) &
        (this.isNew && 0 === this.types.length) &
        (this.isNew && 0 === this.sizes.length) &
        (this.isNew && 0 === this.descPizz.length) &
        (this.isNew && 0 === this.productsAdditiveSave.length) &
        (this.isNew && 0 === this.energyValue.length) &
        (this.isNew && 0 === this.protein.length) &
        (this.isNew && 0 === this.fats.length) &
        (this.isNew && 0 === this.carbohydrates.length) &
        (this.isNew && 0 === this.weight.length) &
        (this.isNew && 0 === this.productsListSave.length)
    ) {
        this.imageSize = undefined;
        this.types = undefined;
        this.sizes = undefined;
        this.descPizz = undefined;
        this.productsAdditive = undefined;
        this.productsList = undefined;
        this.energyValue = undefined;
        this.protein = undefined;
        this.fats = undefined;
        this.carbohydrates = undefined;
        this.weight = undefined;
    }
    next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
