const Work = require('../models/work');

const createWork = async (req, res) => {
    try {
        const newWork = new Work(req.body);

        const savedWork = await newWork.save();

        res.status(201).json({
            message: 'Created work successfully',
            data: {
                works: savedWork
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteWork = async (req, res) => {
    try {
        const deletedWorkDoc = await Work.findByIdAndDelete(req?.params?.id);

        if (!deletedWorkDoc) {
            return res.status(404).json({ message: 'Work not found' });
        }

        res.status(200).json({ message: 'Deleted work successfully' });
    } catch (error) {
        console.error('Error while deleting work:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getWorks = async (req, res) => {
    try {
        const works = await Work.find();

        res.json({
            message: `Fetched all ${req?.params?.type} works successfully`,
            data: {
                count: works.length,
                works
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createWork,
    getWorks,
    deleteWork
}


// createWork, getWorks