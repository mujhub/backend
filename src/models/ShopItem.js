const mongoose = require("mongoose");

const schema = mongoose.Schema;

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

export default ShopItemSchema;
