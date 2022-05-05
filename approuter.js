const express=require('express');
const router = require('express').Router();
const app= express();

const state = require('./Controllers/State');
const district=require('./Controllers/District');


router.get('/state/getstate/:id', state.GetState);
router.post('/state/addstate',state.AddState);
router.post('/state/updatestate/:id',state.UpdateState);
router.get('/district/get/:id',district.GetDistrict);
router.get('/district/Getdistrictbyid/:id',district.GetDistrictById);
router.post('/district/adddistrict',district.AddDistrict);
router.post('/district/updatedistrict/:id',district.UpdateDistrict);


module.exports = router;

    
    
    
    




