const Material = require('../models/material');

const createMaterial = async (req, res) => {
    try {
        const newMaterial = new Material(req.body);

        const savedMaterial = await newMaterial.save();

        res.status(201).json({
            message: 'Created material successfully',
            data: {
                material: savedMaterial
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteMaterial = async (req, res) => {
    try {
        const deletedMaterialDoc = await Material.findByIdAndDelete(req?.params?.id);

        if (!deletedMaterialDoc) {
            return res.status(404).json({ message: 'Material not found' });
        }

        res.status(200).json({ message: 'Deleted material successfully' });
    } catch (error) {
        console.error('Error while deleting material:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.find();

        res.json({
            message: 'Fetched all materials successfully',
            data: {
                count: materials.length,
                materials
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createMaterial,
    deleteMaterial,
    getAllMaterials
}