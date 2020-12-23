import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

/**
 * Resolver for the MessItem type.
 */
export default {
  RootQuery: {
    messItems: async (_parent, args, { models }) => {
      const mongoFilter = {};

      if (args.filter) {
        const { filter } = args;

        /* eslint-disable no-underscore-dangle */
        if (filter.idFilter) mongoFilter._id = { $eq: new ObjectId(filter.idFilter.eq) };
        if (filter.nameFilter) mongoFilter.name = { $eq: filter.nameFilter.eq };
        if (filter.mealTimeFilter) mongoFilter.mealTime = { $eq: filter.mealTimeFilter.eq };
        if (filter.timestampFilter) {
          mongoFilter.timestamp = {};
          if (filter.timestampFilter.gte) mongoFilter.timestamp.$gte = filter.timestampFilter.gte;
          if (filter.timestampFilter.lte) mongoFilter.timestamp.$lte = filter.timestampFilter.lte;
        }
      }

      return models.MessItem.find(mongoFilter);
    },
  },
};
