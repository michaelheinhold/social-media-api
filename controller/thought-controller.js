const { Thought, User } = require('../models');

const thoughtController = {
  //find all
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //find one by id
  findThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //create thought (push thought id to associated user)
  createThought({ body }, res) {
    Thought.create(body)
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //remove reaction
  removeReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: params.reactionId } },
      { new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }
}

module.exports = thoughtController;