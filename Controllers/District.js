const router=require('express').Router();
const {config,poolPromise}=require('../Dbconfig/db');
const sql=require('mssql');

var TableUser='tblState';
const sqlstring = require('sqlstring');


const APIErrorLog = require('../Text Log/AddErrorLogIntoText');
 const APIcallLog = require('../Text Log/AddCallLogintoText.js');


 const modelBuilder=require('../helpers/ModelBuilder');
 const ResponseModel=require('../Model/Responsemodel');

 const CurrentDateTime=require('../shared/Currentdate');


 class District{

    async GetDistrict(req,res){
        try{
            const pool = await poolPromise
            const result = await pool.request()
            .input('Operation','Get_District')
            .input('State_ID',req.params.id)
           .execute('sp_District') 
           var successmsg = `Successfully get data`;

            APIcallLog( result.recordset, req.headers, req.body, successmsg, req.method, req.params, req.query, req.url);
            //res.status(200).json({success:statedata});
            res.status(200).send(new modelBuilder().buildModel({ status: 200, successmsg: successmsg, data: result.recordset }, new ResponseModel()));

        }
        catch(err){
            
            var errMessage=`An error occured!`;
            APIErrorLog( err, req.headers, req.body, errMessage, req.method, req.params, req.query, req.url);
            console.log(err);
        }
    }

   //via districtid get data

   async GetDistrictById(req,res){
    try{
        const pool = await poolPromise
        const result = await pool.request()
        .input('Operation','GetdistricyByid')
        .input('District_ID',req.params.id)
      
        .execute('sp_District') 
        var successmsg = `Successfully get data`;

        APIcallLog( result.recordset, req.headers, req.body, successmsg, req.method, req.params, req.query, req.url);
        //res.status(200).json({success:statedata});
        res.status(200).send(new modelBuilder().buildModel({ status: 200, successmsg: successmsg, data: result.recordset }, new ResponseModel()));

    }
    catch(err){
        console.log(err);
        var errMessage=`An error occured!`;
        APIErrorLog( err, req.headers, req.body, errMessage, req.method, req.params, req.query, req.url);

    }
 }

 async AddDistrict(req,res){
     try{
        const pool = await poolPromise
        const result = await pool.request()
        .input('Operation','Insert_District')
        .input('DistrictName',req.body.name)
        .input('State_ID',req.body.stateid)
      
        .execute('sp_District') 

        if (result.rowsAffected<=0){
            res.status(400).json({err: 'Duplicate data not allowed!'})
        }
        else{
            var successmsg = `Successfully inserted data`;
            APIcallLog( result.recordset, req.headers, req.body, successmsg, req.method, req.params, req.query, req.url);
            res.status(200).send(new modelBuilder().buildModel({ status: 200, successmsg: successmsg, data: result.recordset }, new ResponseModel()));
        }

     }
     catch(err){
        console.log(err);
        var errMessage=`An error occured!`;
        APIErrorLog( err, req.headers, req.body, errMessage, req.method, req.params, req.query, req.url);

    }


    

       }
     async UpdateDistrict(req,res){
        try{

         const pool = await poolPromise
         const result = await pool.request()
        .input('Operation','Update_District')
        .input('District_ID',req.params.id)
        .input('DistrictName',req.body.name)
        .input('State_ID',req.body.stateid)
      
        .execute('sp_District') 
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'Duplicate data not allowed!'})
        }
        else{
            var successmsg = `Successfully Updated data`;
            APIcallLog( result.recordset, req.headers, req.body, successmsg, req.method, req.params, req.query, req.url);
            res.status(200).send(new modelBuilder().buildModel({ status: 200, successmsg: successmsg, data: result.recordset }, new ResponseModel()));
        }


            
        }
        catch(err){
            console.log(err);
            var errMessage=`An error occured!`;
            APIErrorLog( err, req.headers, req.body, errMessage, req.method, req.params, req.query, req.url);

        }

    }



 }


 const district=new District();
 module.exports=district;