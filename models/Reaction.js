const { Schema, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: createdAtVal => moment(createdAtVal).format('MMM/D/YYYY')
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)

module.exports = ReactionSchema;