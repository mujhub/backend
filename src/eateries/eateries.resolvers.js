import mongoose from "mongoose";
import Eateries from "./eateries.models.js";

const { ObjectId } = mongoose.Types;

export default {
    Mutation: {
        createEateriesDetails: async (_parent, args) => {
            const _id = new ObjectId();
            const { name, location, openingTime, closingTime } = args.input;

            const newEatery = new Eateries({
                _id,
                name,
                location,
                openingTime,
                closingTime,
            });

            //Saving the eatery details to mongodb
            const savedEatery = await newEatery.save();
            console.log(savedEatery);
            return savedEatery;
        },

        createEateriesItems: async (_parent, args) => {
            const { _id } = new ObjectId();

            const { itemName, price, category } = args.input;

            const eatery = await Eateries.findOneAndUpdate(
                { _id: args.eateryId },
                {
                    $push: {
                        items: {
                            _id,
                            itemName,
                            price,
                            category,
                        },
                    },
                }
            );

            console.log(eatery);
            return eatery;
        },
    },
};
