const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id})
            .select('username')
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID'})
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    deleteUser(req, res) {
        Thought.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
            !user
                ? res.status(404).json({ message: "No user with that ID" })
                : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: "User and thoughts deleted!" }))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with this ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
         { _id: req.params.userId },
         { $addToSet: { friends: req.body } },
         { runValidators: true, new: true }
        ) 
        .then((user) =>
             !user
                 ? res.status(404).json({ msg: 'No user with this ID' }) 
                 : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
     },
     deleteFriend(req, res) {
         User.findOneAndUpdate( 
             { _id: req.params.userId },
             { $pull: { friends: { userId: req.params.friendId }}},
             { runValidators: true, new: true }
         )
         .then((user) =>
             !user
                 ? res.status(404).json({ msg: "No friend with this ID" })
                 : res.json(user)
         )
         .catch((err) => res.status(500).json(err))
     }
};