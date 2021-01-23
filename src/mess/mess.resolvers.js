import mongoose from 'mongoose';
import MessItem from "./mess.models";
import { generateMongoFilterFromMessItemFilter, generateMongoSortFromMessItemOrderBy } from './mess.utils';

const { ObjectId } = mongoose.Types;

/**
 * Resolver for the mess module.
 */
export default {
  Query: {
    messItems: async (_parent, args) => {
      const { filter, orderBy } = args;

      const mongoFilter = filter ? generateMongoFilterFromMessItemFilter(filter) : {};
      const mongoSort = orderBy ? generateMongoSortFromMessItemOrderBy(orderBy) : {};

      return MessItem.find(mongoFilter).sort(mongoSort);
    },
  },
  Mutation: {
    createMessItem: async (_parent, args) => {
      /* eslint-disable no-underscore-dangle */
      const _id = new ObjectId();
      const { name, mealTime } = args.input;
      const timestamp = Math.floor(Date.now() / 1000);

      const newMessItem = new MessItem({
        _id,
        name,
        mealTime,
        timestamp,
      });

      return { messItem: newMessItem.save() };
    },

    deleteMessItem: async (_parent, args) => {
      const { filter } = args;

      const mongoFilter = filter ? generateMongoFilterFromMessItemFilter(filter) : {};
      const { n, ok, deletedCount } = await MessItem.deleteMany(mongoFilter);

      return {
        found: n,
        success: ok,
        deletedCount,
      };
    },
  },
};
