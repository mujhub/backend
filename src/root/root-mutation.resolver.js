import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export default {
    RootMutation: {
        createMessItem: async (_parent, args, { models }) => {
            const _id = new ObjectId();
            const { name, mealTime } = args;
            const timestamp = Math.floor(Date.now() / 1000);

            const newMessItem = new models.MessItem({
                _id,
                name,
                mealTime,
                timestamp
            });

            return newMessItem.save();
        }
    }
}