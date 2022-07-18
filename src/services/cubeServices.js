const cubes = require('../db.json');

exports.getAll = () => cubes;

exports.getById = (id) => cubes.filter(x => Number(x.id) == Number(id))[0];

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