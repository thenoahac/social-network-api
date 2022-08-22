const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends').post(addFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend)

module.exports = router;