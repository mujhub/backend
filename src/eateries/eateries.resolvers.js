import mongoose from "mongoose";
import { Eateries, EateriesItems } from "./eateries.models.js";
import {
    generateMongoFilterFromEateriesItemFilter,
    generateMongoSortFromEateriesItemsOrderBy,
} from "./eateries.utils.js";

const { ObjectId } = mongoose.Types;

export default {
    Query: {
        getEateryItems: async (_parent, args) => {
            const { filter, orderBy } = args;

            const eatery = await Eateries.findById({
                _id: eateryId,
            });

            if (filter._id) {
                if (filter._id.eq) {
                    const index = eatery.items.findIndex(
                        (item) => item._id.toString() === filter._id.eq
                    );

                    const item = eatery.items[index];
                    return item;
                }
            }

            if (filter.itemName) {
                const index = eatery.items.findIndex(
                    (item) => item.itemName === filter.itemName
                );
            }

            // const mongofilter = filter
            //     ? generateMongoFilterFromEateriesItemFilter(filter)
            //     : {};

            // const mongoSort = orderBy
            //     ? generateMongoSortFromEateriesItemsOrderBy(orderBy)
            //     : {};

            // const items = await EateriesItems.findOne(mongofilter).sort(
            //     mongoSort
            // );
            // console.log(items);
            // return items;
        },
        getEateryItemsWithoutFilter: async (_parent, args) => {
            const items = await EateriesItems.find();
        },
    },
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

        createEateriesOffers: async (_parent, args) => {
            const { offer } = args.input;
            const { eateryId } = args;

            const eatery = await Eateries.findByIdAndUpdate(
                {
                    _id: eateryId,
                },
                {
                    $push: {
                        offers: offer,
                    },
                }
            );

            console.log(eatery);
            return eatery;
        },

        updateItem: async (_parent, args) => {
            const { eateryId, itemId, price } = args;

            const eatery = await Eateries.findById({
                _id: eateryId,
            });

            const index = eatery.items.findIndex(
                (item) => item._id.toString() === itemId
            );

            console.log(index, "index");

            eatery.items[index].price = price;

            const updatedEatery = await eatery.save();

            console.log(updatedEatery, "updatedEatery");
            return updatedEatery;
        },
        deleteItem: async (_parent, args) => {
            const { eateryId, itemId } = args;

            const eatery = await Eateries.findById({
                _id: eateryId,
            });

            const index = eatery.items.findIndex(
                (item) => item._id.toString() === itemId
            );

            console.log(index, "index");

            delete eatery.items[index];

            console.log(eatery);
            return eatery;
        },
    },
};
