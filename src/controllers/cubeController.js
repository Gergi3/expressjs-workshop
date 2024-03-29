const express = require('express');
const router = express.Router();

const cubeServices = require('../services/cubeServices');
const accessoryServices = require('../services/accessoryServices');
const mongooseServices = require('../services/mongooseServices');
const { isAuth } = require('../middlewares/authMiddlewares');

router.get('/details/:cubeId', async (req, res) => {
    const cubeId = req.params.cubeId;
    const userId = req.session?._id
    const cube = await cubeServices.getByIdPopulatedAcessories(cubeId);

    res.render('cube/details', {
        cube: cube.toObject(),
        hasAccessories: cube.accessories.length > 0,
        isOwner: cube.user == userId
    });
});

router.get('/create', isAuth, (req, res) => {
    res.render('cube/create');
});

router.post('/create', isAuth, async     (req, res) => {
    req.body.user = req.session._id;
    const newCube = cubeServices.create(req.body);
    try {
        await newCube.save()
        res.redirect('/');
    } catch {
        res.redirect('/404');
    }
});

router.get('/delete/:cubeId', isAuth, async (req, res) => {
    const cube = await cubeServices.getById(cubeId);

    if (cube.user != req.session?._id) {
        res.redirect('/404')
    }

    res.render('cube/delete', { 
        cube: cube.toObject()
    });
});

router.post('/delete/:cubeId', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeServices.getById(cubeId);
    
    if (cube.user != req.session?._id) {
        res.redirect('/404')
    }

    await cubeServices.delete(cubeId);
    res.redirect('/');
});

router.get('/edit/:cubeId', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeServices.getById(cubeId);

    if (cube.user != req.session?._id) {
        res.redirect('/404')
    }

    res.render('cube/edit', {
        cube: cube.toObject()
    });
});

router.post('/edit/:cubeId', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeServices.getById(cubeId);

    if (cube.user != req.session?._id) {
        res.redirect('/404')
    }
    await cubeServices.updateById(cubeId, req.body);
    res.redirect(`/cube/details/${cubeId}`);
});

router.get('/attach-accessory/:cubeId', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeServices.getById(cubeId);

    if (cube.user != req.session?._id) {
        res.redirect('/404')
    }

    const accessories = await accessoryServices.getAllExcept(cube.accessories);
    
    res.render('accessory/attach', {
        cube: cube.toObject(),
        accessories: mongooseServices.mapToObjects(accessories),
        hasAllAccessories: accessories.length == 0,
    });
});

router.post('/attach-accessory/:cubeId', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeServices.getById(cubeId);
    const accessoryId = req.body.id;

    if (cube.user != req.session?._id) {
        res.redirect('/404')
    }

    await cubeServices.addAccessory(cubeId, accessoryId);

    res.redirect(`/cube/details/${cubeId}`);
});

exports.cubeRouter = router;