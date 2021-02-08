import mongoose from "mongoose";

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
const AuthUserSchema = new Schema(
  {
    _id: {
      type: ObjectId,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      required: true,
    },
    grants: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

AuthUserSchema.index({ email: 1 });

const AuthUser = mongoose.model("AuthUser", AuthUserSchema);

export default AuthUser;
