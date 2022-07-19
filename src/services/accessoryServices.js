const Accessory = require('../models/Accessory');

exports.getById = async (id) => {
    const accessory = await Accessory.findById(id);
    return accessory.toObject();
};

exports.getAll = async (except) => {
    const accessories = await Accessory.find();
    const accessoriesArr = accessories.map(x => x.toObject());

    return accessoriesArr;
}

exports.validate = (accessory) => {
    if (accessory.name < 3 || accessory.name > 30) {
        return false;
    } else if (accessory.description < 5 || accessory.description > 1000) {
        return false;
    }

    return true;
};

exports.create = (body) => new Accessory(body);
