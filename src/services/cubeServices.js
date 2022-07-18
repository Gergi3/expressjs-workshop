const Cube = require('../models/Cube');

exports.getAll = async (search, from, to) => {
    let query = {};
    if (search || from || to) {
        query = {
            $and: [
                { name: { $regex: search || '', $options: 'i' } },
                { difficultyLevel: { $gte: Number(from) || 1 } },
                { difficultyLevel: { $lte: Number(to) || 6 } }
            ]
        };
    }

    const cubes = await Cube.find(query);
    const cubesArray = cubes.map(cube => cube.toObject());

    return cubesArray;
};

exports.create = (body) => new Cube(body);

exports.getById = async (id) => {
    const cube = await Cube.findById(id);
    return cube.toObject();
};

exports.validate = (cube) => {
    if (cube.name < 3 || cube.name > 20) {
        return false;
    } else if (cube.description > 1000) {
        return false;
    } else if (cube.difficultyLevel < 1 || cube.difficultyLevel > 6) {
        return false;
    }

    return true;
}
