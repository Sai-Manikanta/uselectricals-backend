const express = require('express');
const router = express.Router();

const { assignTask, getAllDailyTasks, getTeamMemberTodayTask, updateTask } = require('../controllers/dailyTask.js');

router.post('/assign-task', assignTask)
router.get('/', getAllDailyTasks)
router.get('/today/:teamMemberId', getTeamMemberTodayTask)
router.patch('/:id', updateTask)

module.exports = router;