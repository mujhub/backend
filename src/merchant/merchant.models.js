const mongoose = require("mongoose");
const schema = mongoose.Schema;

const { ObjectId } = schema;

const ShopItemSchema = new schema({
    itemId: {
        type: ObjectId,
    },
    itemName: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
    },
});

const MerchantShopSchema = new schema({
    _id: {
        type: ObjectId,
    },
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    offers: [
        {
            offer: {
                type: String,
            },
        },
    ],
    timings: {
        from: {
            type: Date,
        },
        to: {
            type: Date,
        },
    },
    items: [ShopItemSchema],
});

const MerchantShop = mongoose.model("MerchantShop", MerchantShopSchema);

export default MerchantShop;
