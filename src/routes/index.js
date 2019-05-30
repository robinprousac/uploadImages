const {Router} = require('express');
const router = Router();

router.get('/', (req, res)=>{
    res.send('SOS UN GRAN HUECOOOOOOOOOO');
})

router.get('/image/:id/delete', (req,res)=>{
    res.send('uploando');
})


router.get('/upload', (req, res)=>{
    
    res.render('upload');
})
module.exports = router;