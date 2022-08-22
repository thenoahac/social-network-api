const {Thought, User} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .select('thought')
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'Unable to find this thought.' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: "Unable to find a thought with this ID." })
                : Reactions.deleteMany({ _id: { $in: thought.reactions }})
            )
                .then(() => res.json({ message: "Your thought and its reactions have been deleted." }))
                .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'Unable to find a thought with this ID.' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reaction: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ msg: 'Unable to find a reaction with this ID.'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId}}},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ msg: 'Unable to find a reaction with this ID.' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    }
};