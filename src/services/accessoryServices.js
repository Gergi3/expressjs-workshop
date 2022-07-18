const Accessory = require('../models/Accessory');

exports.getById = async (id) => {
    const accessory = await Accessory.findById(id);
    return accessory.toObject();
};

exports.validate = (accessory) => {
    if (accessory.name < 3 || accessory.name > 30) {
        return false;
    } else if (accessory.description < 5 || accessory.description > 1000) {
        return false;
    }

    return true;
};

exports.create = (body) => new Accessory(body);
