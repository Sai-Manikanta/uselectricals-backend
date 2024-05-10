const express = require('express');
const router = express.Router();

const { createTeamMember, getProjects, deleteProject, editProject } = require('../controllers/project.js');

router.post('/', createTeamMember)
router.get('/', getProjects)
router.delete('/:id', deleteProject)
router.patch('/:id', editProject)

module.exports = router;
