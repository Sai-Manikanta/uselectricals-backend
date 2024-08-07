const express = require('express');
const router = express.Router();

const { createTeamMember, adminLoginController, teamLogin, deleteTeamMember, editTeamMember, getTeamList, getTeamMember, getTeamListWithDailyTasksData } = require('../controllers/user.js');

router.post('/login', adminLoginController)
router.post('/team-login', teamLogin)
router.post('/signup', createTeamMember)
router.delete('/delete-team-member/:id', deleteTeamMember)
router.patch('/edit-team-member/:id', editTeamMember)
router.get('/team-member/:id', getTeamMember)
router.get('/team-list', getTeamList)
router.get('/team-list-with-daily-tasks', getTeamListWithDailyTasksData)

module.exports = router;
