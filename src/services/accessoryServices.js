const Accessory = require('../models/Accessory');

exports.getAllExcept = (excludedIds) => Accessory.find({_id: {$nin: excludedIds}});

exports.create = (body) => new Accessory(body);
