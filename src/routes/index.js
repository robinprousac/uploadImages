const {Router} = require('express');
const router = Router();
const Image = require('../models/image')
const { unlink } = require('fs-extra');
const path = require('path');

router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index', { images });
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});


router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
});

router.get('/upload', (req, res)=>{
    
    res.render('upload');
})

router.post('/upload', async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/');
});
module.exports = router;