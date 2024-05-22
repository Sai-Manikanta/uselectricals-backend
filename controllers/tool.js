const Tool = require('../models/tool');

const createTool = async (req, res) => {
    try {
        const newTool = new Tool(req.body);

        const savedTool = await newTool.save();

        res.status(201).json({
            message: 'Created Tool successfully',
            data: {
                tool: savedTool
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteTool = async (req, res) => {
    try {
        const deletedToolDoc = await Tool.findByIdAndDelete(req?.params?.id);

        if (!deletedToolDoc) {
            return res.status(404).json({ message: 'Tool not found' });
        }

        res.status(200).json({ message: 'Deleted tool successfully' });
    } catch (error) {
        console.error('Error deleting tool:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllTools = async (req, res) => {
    try {
        const tools = await Tool.find();

        res.json({
            message: 'Fetched all tools successfully',
            data: {
                count: tools.length,
                tools
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createTool,
    deleteTool,
    getAllTools
}