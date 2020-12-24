import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

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
  },
};
