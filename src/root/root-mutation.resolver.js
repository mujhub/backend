import mongoose from 'mongoose';
import { generateMongoFilterFromMessItemFilter } from '../mess/mess-item.utils';

const { ObjectId } = mongoose.Types;

/**
 * Resolver for RootMutation type.
 */
export default {
  RootMutation: {
    createMessItem: async (_parent, args, { models }) => {
      /* eslint-disable no-underscore-dangle */
      const _id = new ObjectId();
      const { name, mealTime } = args.input;
      const timestamp = Math.floor(Date.now() / 1000);

      const newMessItem = new models.MessItem({
        _id,
        name,
        mealTime,
        timestamp,
      });

      return { messItem: newMessItem.save() };
    },

    deleteMessItem: async (_parent, args, { models }) => {
      const { filter } = args;

      const mongoFilter = filter ? generateMongoFilterFromMessItemFilter(filter) : {};
      const { n, ok, deletedCount } = await models.MessItem.deleteMany(mongoFilter);

      return {
        found: n,
        success: ok,
        deletedCount,
      };
    },
  },
};
