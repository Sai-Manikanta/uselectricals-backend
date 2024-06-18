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

module.exports = {
    assignTask
}

