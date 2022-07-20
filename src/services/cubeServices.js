const Cube = require('../models/Cube');

exports.create = (body) => new Cube(body);

exports.getById = (id) => Cube.findById(id);

exports.getByIdPopulatedAcessories = (id) => Cube.findById(id).populate('accessories');

exports.getAll = async (search, from, to) => {
    query = {
        $and: [
            { name: { $regex: search || '', $options: 'i' } },
            { difficultyLevel: { $gte: Number(from) || 1 } },
            { difficultyLevel: { $lte: Number(to) || 6 } }
        ]
    };

    const cubes = await Cube.find(query);
    const cubesArray = cubes.map(cube => cube.toObject());

    return cubesArray;
};

exports.addAccessory = (cubeId, accessoryId) => {
    const query = {
        $push: {
            accessories: accessoryId
        }
    };

    return Cube.findByIdAndUpdate(cubeId, query);
}
