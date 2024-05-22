const Project = require('../models/project');

const createTeamMember = async (req, res) => {
  try {
    const newProject = new Project(req.body);

    const savedProject = await newProject.save();

    res.status(201).json({
      message: 'Project created successfully',
      data: {
        project: savedProject
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate({
      path: 'customer',
      select: '-_id name mobileNumber'
    }).populate({
      path: 'team',
      select: '-_id name mobileNumber'
    });

    res.json({
      message: 'Team list fetched successfully',
      data: {
        count: projects.length,
        projects
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await Project.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const editProject = async (req, res) => {
  try {
    const id = req?.params?.id;

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', data: { project: updatedProject } });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createTeamMember,
  getProjects,
  deleteProject,
  editProject
}

