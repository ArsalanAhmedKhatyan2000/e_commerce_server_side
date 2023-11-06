
const CategoryModel = require('../models/categories_model');


async function addCategory(req, res) {
    try {
        const category = CategoryModel({
            category: req.body.category,
            subCategories: req.body.subCategories
        });
        const response = await CategoryModel.create(category);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function getCategory(req, res) {
    try {
        const category = await CategoryModel.find();
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { addCategory, getCategory };
