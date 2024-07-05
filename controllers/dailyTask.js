const DailyTask = require('../models/dailyTask');

const assignTask = async (req, res) => {
  try {
    const newDailyTask = new DailyTask(req.body);
    const savedDailyTask = await newDailyTask.save();
    res.status(201).json({
      message: 'Daily task created successfully',
      dailyTask: savedDailyTask
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getTodayDate = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Set to midnight UTC
  return today;
};

const getAllDailyTasks = async (req, res) => {
  try {
    const today = getTodayDate();
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(today.getUTCDate() + 1); // Set to midnight UTC of the next day

    const dailyTasks = await DailyTask.find({
      date: {
        $gte: today,
        $lt: tomorrow
      }
    })
      .populate({
        path: 'teamMember',
        model: 'User',
        select: '-_id mobileNumber'
      })
      .populate({
        path: 'assignedProjects.project',
        model: 'Project',
        select: '-_id name type address'
      })
      .populate({
        path: 'assignedProjects.assignedWorks.work',
        model: 'Work',
        select: '-_id taskName'
      })
      .populate({
        path: 'assignedProjects.assignedWorks.assignedTools.tool',
        model: 'Tool',
        select: '-_id name'
      })
      .populate({
        path: 'assignedProjects.assignedWorks.assignedMaterials.material',
        model: 'Material',
        select: '-_id name'
      });

    res.status(200).send(dailyTasks);
  } catch (err) {
    res.status(500).send(err);
  }
}


const getTeamMemberTodayTask = async (req, res) => {
  try {
    const { teamMemberId } = req.params;
    const today = getTodayDate();
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(today.getUTCDate() + 1); // Set to midnight UTC of the next day

    console.log("Today:", today);
    console.log("Tomorrow:", tomorrow);
    console.log("teamMemberId", teamMemberId)

    const dailyTasks = await DailyTask.find({
      teamMember: teamMemberId,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    }).populate([
      // { path: 'teamMember', model: 'User' },
      { path: 'assignedProjects.project', model: 'Project', select: '-_id name type address' },
      { path: 'assignedProjects.assignedWorks.work', model: 'Work', select: '-_id taskName' },
      { path: 'assignedProjects.assignedWorks.assignedTools.tool', model: 'Tool', select: '-_id name' },
      { path: 'assignedProjects.assignedWorks.assignedMaterials.material', model: 'Material', select: '-_id name' }
    ]);

    res.status(200).send(dailyTasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
      const updatedDailyTask = await DailyTask.findByIdAndUpdate(id, updates, {
          new: true, 
          runValidators: true,
      });

      if (!updatedDailyTask) {
          return res.status(404).send({ error: 'DailyTask not found' });
      }

      res.status(200).send(updatedDailyTask);
  } catch (error) {
      res.status(400).send({ error: error.message });
  }
}

module.exports = {
  assignTask,
  getAllDailyTasks,
  getTeamMemberTodayTask,
  updateTask
}

