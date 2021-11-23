const { Schema, Types } = require('mongoose');

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
      default: moment().format("MMM/D/YYYY")
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