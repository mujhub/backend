import mongoose from "mongoose";
const schema = mongoose.Schema;

const { ObjectId } = schema;

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
});

const Eateries = mongoose.model("Eateries", EateriesSchema);

export default Eateries;
