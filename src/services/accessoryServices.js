const Accessory = require('../models/Accessory');

exports.getById = async (id) => {
    const accessory = await Accessory.findById(id);
    return accessory.toObject();
};

exports.getAll = async () => {
    const accessories = await Accessory.find(query);
    const accessoriesArr = accessories.map(x => x.toObject());

    return accessoriesArr;
}

exports.getAllExcept = async (excludedIds) => {
    const excluded = excludedIds.map(x => {
        return { "_id": x };
    });

    const query = excluded.length > 0 ? { $nor: excluded } : {}

    const accessories = await Accessory.find(query);
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
