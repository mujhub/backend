import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

//Converts GraphQL input type filter into mongodb filter string

export const generateMongoFilterFromEateriesItemFilter = (filter) => {
    const generatedFilter = {};

    if (filter._id) {
        generatedFilter._id = {};

        if (filter._id.eq) {
            generatedFilter._id = { $eq: new ObjectId(filter._id.eq) };
        }
        if (filter.id.in) {
            generatedFilter._id = { $in: filter._id.in };
        }
    }

    if (filter.itemName) {
        generatedFilter.itemName = { $eq: filter.itemName.eq };
    }

    if (filter.category) {
        generatedFilter.category = { $eq: filter.category.eq };
    }

    if (filter.price) {
        generatedFilter.price = {};
        if (filter.price.gte) {
            generatedFilter.price = { $gte: filter.price.gte };
        }
        if (filter.price.lte) {
            generatedFilter.price = { $lte: filter.price.lte };
        }
    }
    console.log(generatedFilter);
    return generatedFilter;
};

//Converts GraphQL input type type into mongodb sort string
export const generateMongoSortFromEateriesItemsOrderBy = (orderBy) => {
    const generatedSort = {};

    const [key, val] = Object.enteries(orderBy)[0];
    generatedSort[key] = val;

    return generatedSort;
};
