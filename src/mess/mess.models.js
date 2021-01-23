import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema;

/**
 * Mongoose model for mess items. Will be stored in collection messitems.
 *
 * @property {String} name      Name of the dish.
 * @property {String} mealTime      Meal times. Values: "BREAKFAST", "LUNCH", "HITEA", "DINNER".
 * @property {Number} timestamp Epoch representation of datetime at which meal was added.
 */
const MessItemSchema = new Schema({
    _id: {
        type: ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    mealTime: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
});

const MessItem = mongoose.model("MessItem", MessItemSchema);

export default MessItem;
