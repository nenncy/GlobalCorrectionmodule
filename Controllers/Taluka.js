const express=require('express');
const router=require('express').Router();
const {config,poolPromise}=require('../Dbconfig/db');
const sql=require('mssql');

const sqlstring = require('sqlstring');


const APIErrorLog = require('../Text Log/AddErrorLogIntoText');
 const APIcallLog = require('../Text Log/AddCallLogintoText.js');


 const modelBuilder=require('../helpers/ModelBuilder');
 const ResponseModel=require('../Model/Responsemodel');



 class Taluka{
      async GetTaluka(req,res){
          try{
            const pool = await poolPromise
            const result = await pool.request()
            .input('Operation','Get_Taluka')
            .input('District_ID',req.params.id)
            .execute('sp_Taluka') 
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

      async GetTalukaById(req,res){

          try{
            const pool = await poolPromise
            const result = await pool.request()
            .input('Operation','GetTalukaById')
            .input('Taluka_ID',req.params.id)
          
            .execute('sp_Taluka') 
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

      async AddTaluka(req,res){
          try{
            const pool = await poolPromise
            const result = await pool.request()
            .input('Operation','Insert_Taluka')
            .input('TalukaName',req.body.name)
            .input('District_ID',req.body.districtid)
          
            .execute('sp_Taluka') 
    
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

      async UpdateTaluka(req,res){
          try{
            const pool = await poolPromise
            const result = await pool.request()
            .input('Operation','Update_Taluka')
            .input('TalukaName',req.body.name)
            .input('District_ID',req.body.districtid)
          
            .execute('sp_Taluka') 
    
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


 }


 const taluka= new Taluka();
 module.exports=taluka;