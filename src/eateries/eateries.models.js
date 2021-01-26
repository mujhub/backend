import mongoose from "mongoose";
const schema = mongoose.Schema;

const { ObjectId } = schema;

const EateriesItemSchema = new schema({
    _id: {
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

const EateriesSchema = new schema({
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
            type: String,
        },
    ],
    openingTime: {
        type: String,
    },
    closingTime: {
        type: String,
    },
    items: [EateriesItemSchema],
});

const Eateries = mongoose.model("Eateries", EateriesSchema);

export default Eateries;
