const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");

// thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// get total count of friends
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create the User model using the UserSchema
const Thought = model("Thought", thoughtSchema);

// export the User model
module.exports = { Thought };
