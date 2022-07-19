const express = require('express');
const accessoryServices = require('../services/accessoryServices');
const cubeServices = require('../services/cubeServices');

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', (req, res) => {
    const newAccessory = accessoryServices.create(req.body);

    const isValid = accessoryServices.validate(newAccessory);
    if (!isValid) {
        res.redirect('/404');
    }

    newAccessory.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(() => {
            res.redirect('/404');
        })
});

router.get('/attach/:cubeId', async (req, res) => {
    try {
        const cubeId = req.params.cubeId;
        const cube = await cubeServices.getById(cubeId);
        const accessories = await accessoryServices.getAllExcept(cube.accessories);
        res.render('attachAccessory', {
            cube: cube.toObject(),
            accessories,
            hasAllAccessories: accessories.length == 0,
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/attach/:cubeId', async (req, res) => {
    try {
        const cubeId = req.params.cubeId;
        const accessoryId = req.body.id;
        await cubeServices.addAccessory(cubeId, accessoryId);

        res.redirect(`/cube/details/${cubeId}`)
    } catch {
        res.redirect('/404');
    }
});


exports.accessoryRouter = router;