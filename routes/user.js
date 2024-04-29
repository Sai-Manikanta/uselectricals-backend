const express = require('express');
const router = express.Router();

const { createTeamMember, adminLoginController, deleteTeamMember, editTeamMember, getTeamList, getTeamMember } = require('../controllers/user.js');

router.post('/login', adminLoginController)
router.post('/signup', createTeamMember)
router.delete('/delete-team-member/:id', deleteTeamMember)
router.patch('/edit-team-member/:id', editTeamMember)
router.get('/team-member/:id', getTeamMember)
router.get('/team-list', getTeamList)

module.exports = router;
