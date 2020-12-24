import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

/**
 * Converts input type into mongodb filter string.
 * @param {MessItemFilter} filter GraphQL input type MessItemFilter
 */
export const generateMongoFilterFromMessItemFilter = (filter) => {
  const generatedFilter = {};

  /* eslint-disable no-underscore-dangle */
  if (filter._id) {
    generatedFilter._id = {};
    if (filter._id.eq) generatedFilter._id.$eq = new ObjectId(filter._id.eq);
    if (filter._id.in) {
      generatedFilter._id.$in = filter._id.in;
    }
  }
  if (filter.name) generatedFilter.name = { $eq: filter.name.eq };
  if (filter.mealTime) generatedFilter.mealTime = { $eq: filter.mealTime.eq };
  if (filter.timestamp) {
    generatedFilter.timestamp = {};
    if (filter.timestamp.gte) generatedFilter.timestamp.$gte = filter.timestamp.gte;
    if (filter.timestamp.lte) generatedFilter.timestamp.$lte = filter.timestamp.lte;
  }

  return generatedFilter;
};

/**
 * Converts input type into mongodb sort string.
 * @param {MessItemOrderBy} orderBy GraphQL input type MessItemOrderBy
 */
export const generateMongoSortFromMessItemOrderBy = (orderBy) => {
  const generatedSort = {};

  const [key, val] = Object.entries(orderBy)[0];
  generatedSort[key] = val;

  return generatedSort;
};
