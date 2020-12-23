import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

/**
 * Resolver for the MessItem type.
 */
export default {
  RootQuery: {
    messItems: async (_parent, args, { models }) => {
      const mongoFilter = {};
      const mongoSort = {};
      const { filter, orderBy } = args;

      if (filter) {
        /* eslint-disable no-underscore-dangle */
        if (filter._id) mongoFilter._id = { $eq: new ObjectId(filter._id.eq) };
        if (filter.name) mongoFilter.name = { $eq: filter.name.eq };
        if (filter.mealTime) mongoFilter.mealTime = { $eq: filter.mealTime.eq };
        if (filter.timestamp) {
          mongoFilter.timestamp = {};
          if (filter.timestamp.gte) mongoFilter.timestamp.$gte = filter.timestamp.gte;
          if (filter.timestamp.lte) mongoFilter.timestamp.$lte = filter.timestamp.lte;
        }
      }

      if (orderBy) {
        const [key, val] = Object.entries(orderBy)[0];
        mongoSort[key] = val;
      }

      return models.MessItem.find(mongoFilter).sort(mongoSort);
    },
  },
};
