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
    itemOf: {
        type: ObjectId,
        ref: "Eateries",
    },
});

const EateriesItems = mongoose.model("EateriesItems", EateriesItemSchema);

export default EateriesItems;
