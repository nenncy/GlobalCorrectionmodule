const express=require('express');
const router = require('express').Router();
const app= express();

const state = require('./Controllers/State');


router.get('/state/getstate/:id', state.GetState);
router.post('/state/addstate',state.AddState);
router.post('/state/updatestate/:id',state.UpdateState);


module.exports = router;

    
    
    
    




