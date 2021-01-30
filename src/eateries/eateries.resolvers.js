import mongoose from "mongoose";
import Eateries from "./eateries.models.js";
import EateriesItems from "./items.models.js";
import {
    generateMongoFilterFromEateriesItemFilter,
    generateMongoSortFromEateriesItemsOrderBy,
} from "./eateries.utils.js";

const { ObjectId } = mongoose.Types;

export default {
    Query: {
        getEateryItems: async (_parent, args) => {
            const { eateryId } = args;

            const data = await EateriesItems.find({
                itemOf: { $eq: eateryId },
            }).populate("itemOf");

            console.log(data);
            return data;
        },
        eateryItems: async (_parent, args) => {
            const { filter, orderBy } = args;

            const mongoFilter = filter
                ? generateMongoFilterFromEateriesItemFilter(filter)
                : {};

            const mongoSort = orderBy
                ? generateMongoSortFromEateriesItemsOrderBy(orderBy)
                : {};

            const eateryItems = await EateriesItems.find(mongoFilter)
                .sort(mongoSort)
                .populate("itemOf");

            console.log(eateryItems);

            return eateryItems;
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

            const { eateryId } = args;
            const { itemName, price, category } = args.input;

            const newItem = new EateriesItems({
                _id,
                itemName,
                price,
                category,
            });

            newItem.itemOf = eateryId;

            const savedItem = await newItem.save();

            console.log(savedItem);
            return savedItem;
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
            const { itemId, input } = args;

            const item = await EateriesItems.findById({
                _id: itemId,
            });

            console.log(item, "item");

            if (input.itemName) {
                item.itemName = input.itemName;
            }

            if (input.price) {
                item.price = input.price;
            }

            if (input.category) {
                item.category = input.category;
            }

            const updatedEatery = await item.save();

            console.log(updatedEatery, "updatedEatery");
            return updatedEatery;
        },
        deleteItems: async (_parent, args) => {
            const { filter } = args;

            const mongoFilter = filter
                ? generateMongoFilterFromEateriesItemFilter(filter)
                : {};

            const { n, ok, deletedCount } = await EateriesItems.deleteMany(
                mongoFilter
            );

            return {
                found: n,
                success: ok,
                deletedCount,
            };
        },
    },
};
