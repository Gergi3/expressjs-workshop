const cubes = require('../db.json');
const fs = require('fs/promises');
const path = require('path');

exports.getAll = () => cubes;

exports.createObj = (name, description, imageUrl, difficultyLevel) => {
    const cube = {
        id: getNextId(),
        name,
        description,
        imageUrl,
        difficultyLevel
    };

    return cube;
}

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

exports.writeToDb = (cube) => {
    cubes.push(cube);

    const stringData = JSON.stringify(cubes, null, 4);
    const options = { encoding: 'utf-8' };
    const pathToDb = path.resolve('src', 'db.json');

    return fs.writeFile(pathToDb, stringData, options);
}

exports.getById = (id) => cubes.filter(x => Number(x.id) == Number(id))[0];

exports.search = (name, from, to) => {
    let filtered = cubes;
    if (name) {
        filtered = filtered.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }
    if (from) {
        filtered = filtered.filter(x => x.difficultyLevel >= from)
 
    }
    if (to) {
        filtered = filtered.filter(x => x.difficultyLevel <= to)
 
    }

    return filtered;
}

const getNextId = () => cubes[cubes.length - 1].id + 1;