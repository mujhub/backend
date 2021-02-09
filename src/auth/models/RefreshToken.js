import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema;

/**
 * Mongoose model for users. Will be stored in collection authusers.
 *
 * @property {String} email  Email of the user.
 * @property {String} password  Password of the user.
 * @property {Boolean} emailVerified  Flag whether email has been verified or not.
 * @property {Number} createdAt Timestamp of user sign up.
 */
const RefreshTokenSchema = new Schema({
  _id: {
    type: ObjectId,
  },
  userId: {
    type: ObjectId,
    ref: 'AuthUser',
  },
  token: {
    type: String,
    required: true,
  },
  exp: {
    type: Number,
    required: true,
  },
  used: {
    type: Boolean,
  },
}, { timestamps: true });

RefreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 45 * 24 * 60 * 60 });
RefreshTokenSchema.index({ userId: 1, exp: 1, used: 1 })

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

export default RefreshToken;
