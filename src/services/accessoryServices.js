const Accessory = require('../models/Accessory');

exports.getAllExcept = async (excludedIds) => {
    const excluded = excludedIds.map(x => {
        return { "_id": x };
    });

    const query = excluded.length > 0 ? { $nor: excluded } : {}

    const accessories = await Accessory.find(query);
    const accessoriesArr = accessories.map(x => x.toObject());

    return accessoriesArr;
}

exports.create = (body) => new Accessory(body);
