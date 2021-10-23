// Require express router
const router = require('express').Router();

// Set requirements (from users-controller)
const {
    getAllUsers,
    //getOneUser,
    getUsersById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/user-controller');

// -- Directs to: /api/users <GET, POST>
router.route('/')
.get(getAllUser)
.post(createUser);

// -- Directs to: /api/users/:id <GET, PUT, DELETE>
router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUsers);

// -- Directs to: /api/users/:userId/friends/:friendId <POST, DELETE>
router.route('/:userID/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)



// Module export router
module.exports = router; 