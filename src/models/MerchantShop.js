const mongoose = require("mongoose");
const ShopItemSchema = require("./ShopItem");

const schema = mongoose.Schema;

const { ObjectId } = schema;

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
